import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { Separator } from "@/components/ui/separator";

interface Step {
  desc: string;
  matrix: string;
}

interface Props {
  input: string;
  output: string;
  steps: Step[];
}

export function CalculationResult({ input, output, steps }: Props) {
  return (
    <div className="max-w-4xl md:max-w-screen mx-auto space-y-6 text-main-foreground">
      <Separator className="bg-input-border mb-8" />
      <div className="text-center">
        <h2 className="font-semibold mb-2">Matrix Input</h2>
        <BlockMath math={input} />
      </div>

      <div className="text-center">
        <h2 className="font-semibold mb-2 mt-6">Matrix Hasil</h2>
        <BlockMath math={output} />
      </div>

      <div className="text-center">
        <h2 className="font-semibold mb-2 mt-6">Langkah-Langkah</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <BlockMath math={input} />
          </div>
          {steps.map((step, i) => {
            const arrowCount = Math.max(4, Math.ceil(step.desc.length / 2));
            const line = "—".repeat(arrowCount);
            return (
              <div
                key={i}
                className="flex flex-wrap items-center justify-center gap-2"
              >
                <div className="relative inline-block">
                  <div className="text-xs text-muted-col text-center">
                    {step.desc}
                  </div>
                  <div className="text-muted-col text-xs">
                    {line}
                    {">"}
                  </div>
                </div>
                <BlockMath math={step.matrix} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
