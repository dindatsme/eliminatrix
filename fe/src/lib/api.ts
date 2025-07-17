export interface SolveMatrixRequest {
  matrix: number[][]
	method: "gauss" | "gauss-jordan"
}

export interface SolveMatrixResponse{
	result: number[][]
	steps: {
		matrix: number[][]
		desc:string
	}[]
}

export async function solveMatrix(input:SolveMatrixRequest): Promise<SolveMatrixResponse> {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/solve`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(input),
	})
	
	if (!response.ok) {
		const errorText = await response.text()
		throw new Error(`Backend error: ${response.status} - ${errorText}`)
	}

	const result = await response.json()
	return result as SolveMatrixResponse
}