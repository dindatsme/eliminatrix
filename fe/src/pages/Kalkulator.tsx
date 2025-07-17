import { FormMatrix } from "@/components/ui/form-matrix"
import { CalculationResult } from "@/components/ui/calculation-result"
import { useState } from "react"
import { toast } from "sonner"
import { solveMatrix, type SolveMatrixRequest } from "@/lib/api"
import { Separator } from "@/components/ui/separator"

export default function Kalkulator() {
  const [result, setResult] = useState<{
    input: string
    output: string
    steps: { matrix: string; desc: string }[]
  } | null>(null)

  const handleCalculate = async (
    Input: SolveMatrixRequest
  ) => {
    
    console.log("REQUEST SENT TO BACKEND", Input)

    try {
      const data = await solveMatrix(Input)

      const toLatex = (m: number[][]) =>
        "\\begin{bmatrix}" +
        m.map((row) => {
          const parts = [...row]
          const last = parts.pop()!
          return parts.join(" & ") + " &\\bigm| & " + last
        }).join(" \\\\ ") +
        "\\end{bmatrix}"

      setResult({
        input: toLatex(Input.matrix),
        output: toLatex(data.result),
        steps: data.steps.map((step: any) => ({
          matrix: toLatex(step.matrix),
          desc: step.desc,
        })),
      })
    } catch (err: any) {
      const detail = err?.response?.data?.detail || "Terjadi kesalahan"
      toast.error("Gagal: " + detail)
      console.error("Error:", err)
    }
  }

  return (
    <div className="container py-8 space-y-12">
      <h1 className="text-2xl font-bold text-primary">Kalkulator Eliminatrix</h1>

      <FormMatrix onCalculate={handleCalculate}/>

      {result && (<Separator/>) && (
        <CalculationResult
          input={result.input}
          output={result.output}
          steps={result.steps}
        />
      )}
    </div>
  )
}