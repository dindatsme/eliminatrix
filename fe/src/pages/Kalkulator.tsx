import { FormMatrix } from "@/components/ui/form-matrix"
import { CalculationResult } from "@/components/ui/calculation-result"
import { useState, useRef } from "react"
import { toast } from "sonner"
import { solveMatrix, type SolveMatrixRequest } from "@/lib/api"

export default function Kalkulator() {
  const [result, setResult] = useState<{
    input: string
    output: string
    steps: { matrix: string; desc: string }[]
  } | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const handleCalculate = async (
    Input: SolveMatrixRequest
  ) => {
    
    console.log("REQUEST SENT TO BACKEND", Input)

    try {
      const data = await solveMatrix(Input)

      setResult({
        input: data.input,
        output: data.result,
        steps: data.steps.map((step: any) => ({
          matrix: step.matrix,
          desc: step.desc,
        })),
      })
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } catch (err: any) {
      toast.error("Gagal", {description: err.message})
      console.error("Error:", err)
    }
  }

  return (
    <div className="container md:min-h-[calc(100vh-250px)] pb-6 space-y-12 bg-main-background">
      <div className="space-y-3">
        <h1 className="text-2xl font-libre-franklin font-medium text-main-foreground">Kalkulator Eliminatrix</h1>
        <p className="text-xs font-orienta text-main-foreground">Sebuah Kalkulator untuk menyelesaikan SPL dengan metode eliminasi Gauss maupun Gauss-Jordan. Membantu Anda memperoleh solusi step-by-step secara cepat, edukatif, dan ringkas.</p>
      </div>
      
      <FormMatrix onCalculate={handleCalculate}/>

      {result && (
        <div ref={resultRef}>
            <CalculationResult
            input={result.input}
            output={result.output}
            steps={result.steps}
          />
        </div>
      )}
    </div>
  )
}