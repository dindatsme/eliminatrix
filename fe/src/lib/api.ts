export interface SolveMatrixRequest {
  matrix: number[][];
  method: "gauss" | "gauss-jordan";
}

export interface SolveMatrixResponse {
  input: string;
  result: string;
  steps: {
    matrix: string;
    desc: string;
  }[];
}

export async function solveMatrix(
  input: SolveMatrixRequest
): Promise<SolveMatrixResponse> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/solve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const errorText = await response.json();
    throw new Error(errorText.detail || "Terjadi kesalahan");
  }

  const result = await response.json();
  return result as SolveMatrixResponse;
}
