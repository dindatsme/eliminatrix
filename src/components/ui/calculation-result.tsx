import "katex/dist/katex.min.css"
import { BlockMath, InlineMath } from "react-katex"

interface Step {
	desc: string
	matrix: string
}

interface Props {
	input: string
	output: string
	steps: Step[]
}

export function CalculationResult({ input, output, steps }: Props) {
	return (
		<div className="max-w-4xl mx-auto space-y-6">
			<div>
				<h3 className="font-semibold mb-2">Matrix Input</h3>
				<BlockMath math={input} />
			</div>

			<div>
				<h3 className="font-semibold mb-2">Matrix Hasil</h3>
				<BlockMath math={output} />
			</div>

			<div>
				<h3>Langkah-Langkah</h3>
				{steps.map((step, i) => (
					<div key={i} className="flex items-center gap-4 flex-wrap my-4">
						<BlockMath math={step.matrix} />
						<div className="text-sm text-muted-foreground">
							⟶ {<InlineMath math={step.desc} />}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}