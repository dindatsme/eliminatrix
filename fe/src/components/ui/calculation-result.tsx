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
				<h3 className="font-semibold text-lg mb-2">Langkah-Langkah</h3>
				<div className="flex flex-wrap gap-4">
					<div className="flex flex-wrap items-center gap-2">
						<BlockMath math={input} />
					</div>
					{steps.map((step, i) => {
						const arrowCount = Math.max(4, Math.ceil(step.desc.length/2))
						const line = "—".repeat(arrowCount)
						return (
						<div key={i} className="flex flex-wrap items-center gap-2">
							<div className="relative inline-block">
								<div className="text-sm text-muted-foreground text-center">
									{step.desc}
								</div>
								<div className="text-primary">{line}{">"}</div>
							</div>
							<BlockMath math={step.matrix} />
						</div>
					)})}
				</div>
			</div>
		</div>
	)
}