from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Literal
from fastapi.middleware.cors import CORSMiddleware
from solver import gauss_elimination, gauss_jordan_eliminator, validate_unique_rows

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class MatrixRequest(BaseModel):
    matrix: list[list[float]]
    method: Literal["gauss", "gauss-jordan"]

@app.post("/api/solve")
def solve_matrix(request: MatrixRequest):
    raw_matrix = request.matrix
    method = request.method

    if not raw_matrix or not all(isinstance(row, list) for row in raw_matrix):
        raise HTTPException(status_code=400, detail="Matrix tidak boleh kosong")

    try:
        # Konversi semua elemen matrix ke float
        matrix = [[float(cell) for cell in row] for row in raw_matrix]
    except ValueError:
        raise HTTPException(status_code=400, detail="Semua nilai dalam matrix harus berupa angka")

    row_len = len(matrix[0])
    if not all(len(row) == row_len for row in matrix):
        raise HTTPException(status_code=400, detail="Semua baris harus punya panjang yang sama")

    if len(matrix) + 1 != row_len:
        raise HTTPException(
            status_code=400,
            detail="Matrix harus dalam bentuk augmented (kolom = baris + 1)"
        )
    
    if not validate_unique_rows(matrix):
        raise HTTPException(status_code=400, detail="Matrix memiliki duplikat atau baris yang linear dependen.")
    
    try:
        if method == "gauss":
            input, result, steps = gauss_elimination(matrix)
        else:
            input, result, steps = gauss_jordan_eliminator(matrix)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {
        "input": input,
        "result": result,
        "steps": steps
    }