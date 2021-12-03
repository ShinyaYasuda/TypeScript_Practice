// export default null 

// 汎用的なpromisify関数を実装してください。promisifyは、1つの引数と1つのコールバックを取る任意の関数をパラメーターとして取り、
// それを、プロミスを返す関数の中にラップします。完成したら、次のようにpromisifyを使えるようにしたいのです
import { readFile } from "fs";
import { type } from "os";

function promisify<T, A>(
    f: (arg: A, f: (error: unknown, result: T | null) => void) => void
): (arg: A) => Promise<T>
 {
     return (arg: A) =>
     new Promise<T>((resolve, reject) =>
        f(arg, (error, result) => {
            if (error) {
                return reject(error)
            }
            if (result === null) {
                return reject(null)
            }
            resolve(result)
        }))
 }
let readFilePromise = promisify(readFile)
readFilePromise('./myfile.ts')
    .then(result => console.log('success reading file', result.toString()))
    .catch(error => console.error('error reading file', error))

    // function promisify<F, R>(
    //     callback: F
    //     // callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void
    //     ) :R {return}

// 8.6.1.1 型安全なプロトコル」では、型安全な行列演算のためのプロトコルの半分を作成しました。
// これをメインスレッドで実行すると仮定して、Web Workerスレッドで実行する残りの半分を実装してください。

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

function createProtocol<P extends Protocol>(script: string) {
    return <K extends keyof P>(command: K) => 
        (...args: P[K]['in']) =>
        new Promise<P[K]['out']>((resolve, reject) => {
            let worker = new Worker(script)
            worker.onerror = reject
            worker.onmessage = event => resolve(event.data)
            worker.postMessage({command, args})
        })
    
}

let runWithMatrixProtocol = createProtocol<MatrixProtocol>(
    'chapter8MatrixWorkerScript.js'
)
let parallelDeterminant = runWithMatrixProtocol('determinant')

parallelDeterminant([[1,2],[3,4]])
    .then(determinant => console.log(determinant))

// （「8.6.1 Web Worker（ブラウザー）」のように）マップ型を使って、
// Node.jsのchild_process用の型安全なメッセージパッシングプロトコルを実装してください。
