import { FormMatrix } from "@/components/ui/form-matrix"
import { CalculationResult } from "@/components/ui/calculation_result"
import { useState } from "react"
import { toast } from "sonner"
//import { Toaster } from "@/components/ui/sonner"

export default function Kalkulator() {
  const [result, setResult] = useState<{
    input: string
    output: string
    steps: { matrix: string; desc: string }[]
  } | null>(null)

  const handleCalculate = async (
    matrix: string[][],
    method: "gauss" | "gauss-jordan"
  ) => {
    try {
      const res = await fetch("/api/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matrix, method }),
      })

      if (!res.ok) {
        const err = await res.json()
        toast.error("Gagal: " + err.detail)
        return
      }

      const data = await res.json()

      const toLatex = (m: string[][]) =>
        "\\begin{bmatrix}" +
        m.map((row) => row.join(" & ")).join(" \\\\ ") +
        "\\end{bmatrix}"

      setResult({
        input: toLatex(matrix),
        output: toLatex(data.result),
        steps: data.steps.map((step: any) => ({
          matrix: toLatex(step.matrix),
          desc: step.desc,
        })),
      })
    } catch (err) {
      console.error("Error:", err)
    }
  }

  return (
    <div className="container py-8 space-y-12">
      <h1 className="text-2xl font-bold text-primary">Kalkulator Eliminatrix</h1>

      <FormMatrix onCalculate={handleCalculate}/>

      {result && (
        <CalculationResult
          input={result.input}
          output={result.output}
          steps={result.steps}
        />
      )}
    </div>
  )
}