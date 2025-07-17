from copy import deepcopy

def format_matrix(matrix):
    return [[str(round(cell, 2)) for cell in row] for row in matrix]

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
                        "matrix": [row[:] for row in mat],
                        "desc" : f"R{i+1} <-> R{j+1}"
                    })
                    swapped = True
                    break
            if not swapped:
                raise ValueError(f"Matrix singular di pivot R{i+1}, tidak bisa diselesaikan")
            
        pivot =mat[i][i]
        if pivot == 0:
            raise ValueError(f"Pivot = 0 di R{i+1}, matrix singular")
        
        mat[i] = [x / pivot for x in mat[i]]
        steps.append({
            "matrix": [row[:] for row in mat],
            "desc": f"R{i+1} = R{i+1}/{pivot}"
        })
        
        for j in range(i+1, n):
            factor = mat[j][i]
            mat[j] = [a-factor*b for a, b in zip(mat[j], mat[i])]
            steps.append({
                "matrix": [row[:] for row in mat],
                "desc": f"R{j+1} = R{j+1} - {factor} x R{i+1}"
            })

    return mat, steps

def gauss_jordan_eliminator(matrix):
    mat = deepcopy(matrix)
    n = len(mat)
    m = len(mat[0])
    steps = []

    for i in range(n):
        pivot = mat[i][i]
        if pivot == 0:
            raise ValueError(f"Matrix singular di baris {i+1}")

        if pivot!= 0:
            mat[i] = [x/pivot for x in mat[i]]
            steps.append({
                "matrix": [row[:] for row in mat],
                "desc": f"R{i+1} = R{i+1}/{pivot}"
            })        
        
        for j in range(n):
            if i != j:
                factor = mat[j][i]
                mat[j] = [a-factor*b for a, b in zip(mat[j], mat[i])]
                steps.append({
                    "matrix": [row[:] for row in mat],
                    "desc": f"R{j+1} = R{j+1}-{factor}*R{i+1}"
                })

    return mat, steps