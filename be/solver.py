from copy import deepcopy
from typing import List

def is_linear_dependent(row1: List[float], row2: List[float]) -> bool:
    ratios = []
    for a, b in zip(row1, row2):
        if b == 0:
            if a != 0:
                return False
            continue
        ratios.append(a / b)
    
    return all(abs(r - ratios[0]) < 1e-9 for r in ratios)

def validate_unique_rows(matrix: List[List[float]]) -> bool:
    n = len(matrix)
    for i in range(n):
        for j in range(i + 1, n):
            if is_linear_dependent(matrix[i], matrix[j]):
                return False
    return True

def format_matrix(matrix):
    rows = []
    for row in matrix:
        parts = [str(round(cell, 3)) for cell in row]
        left = " & ".join(parts[:-1])
        right = parts[-1]
        rows.append(f"{left} &\\bigm|& {right}")
    return "\\begin{bmatrix}" + " \\\\ ".join(rows) + "\\end{bmatrix}"

def gauss_elimination(matrix):
    mat = deepcopy(matrix)
    n = len(mat)
    steps = []

    for i in range(n):
        if mat[i][i] == 0:
            #ganti baris jika pivot 0
            swapped = False
            for j in range(i+1, n):
                if mat[j][i] != 0:
                    mat[i], mat[j] = mat[j], mat[i]
                    steps.append({
                        "matrix": format_matrix(mat),
                        "desc" : f"R{i+1} <-> R{j+1}"
                    })
                    swapped = True
                    break
            if not swapped:
                raise ValueError(f"Matrix singular di pivot R{i+1}, tidak bisa diselesaikan")
            
        pivot =mat[i][i]
        if pivot == 0:
            raise ValueError(f"Pivot = 0 di R{i+1}, matrix singular")
        
        mat[i] = [0.0 if x == 0 else x / pivot for x in mat[i]]
        steps.append({
            "matrix": format_matrix(mat),
            "desc": f"R{i+1} = R{i+1} / {pivot}"
        })
        
        for j in range(i+1, n):
            factor = mat[j][i]
            sign = '-' if factor > 0 else '+' 
            mat[j] = [0.0 if a== 0 else a - factor * b for a, b in zip(mat[j], mat[i])]
            steps.append({
                "matrix": format_matrix(mat),
                "desc": f"R{j+1} = R{j+1} {sign} {abs(factor)} x R{i+1}"
            })

    return format_matrix(matrix), format_matrix(mat), steps

def gauss_jordan_eliminator(matrix):
    mat = deepcopy(matrix)
    n = len(mat)
    steps = []

    for i in range(n):
        if mat[i][i] == 0:
            #ganti baris jika pivot 0
            swapped = False
            for j in range(i+1, n):
                if mat[j][i] != 0:
                    mat[i], mat[j] = mat[j], mat[i]
                    steps.append({
                        "matrix": format_matrix(mat),
                        "desc" : f"R{i+1} <-> R{j+1}"
                    })
                    swapped = True
                    break
            if not swapped:
                raise ValueError(f"Matrix singular di pivot R{i+1}, tidak bisa diselesaikan")
        
        pivot = mat[i][i]
        if pivot == 0:
            raise ValueError(f"Matrix singular di baris {i+1}")

        if pivot!= 0:
            mat[i] = [0.0 if x == 0 else x / pivot for x in mat[i]]
            steps.append({
                "matrix": format_matrix(mat),
                "desc": f"R{i+1} = R{i+1} / {pivot}"
            })        
        
        for j in range(n):
            if i != j:
                factor = mat[j][i]
                sign = '-' if factor > 0 else '+' 
                mat[j] = [0.0 if a == 0 else a - factor * b for a, b in zip(mat[j], mat[i])]
                steps.append({
                    "matrix": format_matrix(mat),
                    "desc": f"R{j+1} = R{j+1} {sign} {abs(factor)}*R{i+1}"
                })

    return format_matrix(matrix), format_matrix(mat), steps