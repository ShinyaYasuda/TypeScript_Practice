type Matrix = number[][]

type MatrixProtocol = {
  determinant: {
    in: [Matrix]
    out: number
  }
  'dot-product': {
    in: [Matrix, Matrix]
    out: Matrix
  }
  invert: {
    in: [Matrix]
    out: Matrix
  }
}

type Protocol = {
  [command: string]: {
    in: unknown[]
    out: unknown
  }
}

type Data<
    P extends Protocol,
    C extends keyof P = keyof P
> = C extends C
    ? {command: C; args:P[C]['in']}
    : never

function handle(
    data: Data<MatrixProtocol>
): MatrixProtocol[typeof data.command]['out']{
    switch (data.command) {
        case 'determinant':
            return determinant(...data.args)
        case 'dot-product':
            return dotProduct(...data.args)
        case 'invert':
            return invert(...data.args)
    }
}

onmessage = ({data}) => postMessage(handle(data))

declare function determinant(matrix: Matrix): number
declare function dotProduct(matrixA: Matrix, matrixB: Matrix): Matrix
declare function invert(matrix: Matrix): Matrix
