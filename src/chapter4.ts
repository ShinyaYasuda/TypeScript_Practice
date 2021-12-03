export default null 

//3.すぐに出発する旅行を予約する機能が欲しいとします。オーバーロードされたreserve関数（「4.1.9 オーバーロードされた関数の型」を参照）を、
//  3番目の呼び出しシグネチャを作成して書き換えてください。このシグネチャは、目的地（destination）だけを取り、明示的な出発日（from）は取りません。
//  この新しいオーバーロードされたシグネチャをサポートするように、reserveの実装を書き換えてください。

type Reservation = unknown

type Reserve = {
    (from: Date, to: Date, destination: string): Reservation
    (from: Date, destination: string): Reservation
    (destination: string): Reservation
  }
  
let reserve: Reserve = (
    fromOrDestination: Date | string,
    toOrDestination?: Date | string,
    destination?: string
  ) => {
    if (fromOrDestination instanceof Date && toOrDestination instanceof Date && destination !== undefined) {
      // 宿泊旅行を予約する
    } else if (fromOrDestination instanceof Date && typeof toOrDestination === 'string') {
      // 日帰り旅行を予約する
    } else if (typeof fromOrDestination === 'string') {
      // 予約する
    }
  }

//4.［難問］callの実装（「4.2.5.2 制限付きポリモーフィズムを使って、可変長引数をモデル化する」を参照）を、
//   2番目の引数がstringである関数について「だけ」機能するように書き換えてください。そうではない関数を渡すと、コンパイル時にエラーとなるようにします。

function callOriginal<T extends unknown[], R>(
    f: (...args: T) => R,
    ...args: T
  ): R {
    return f(...args)
  }

function call<T extends [unknown, string, ...unknown[]], R>(
    f: (...args: T) => R,
    ...args: T
  ): R {
    return f(...args)
  }

function fill(length:number, value:string): string[]{
    return Array.from({length}, () => value)
}
  
call(fill,1,"a")

//5.型安全なアサーション関数、isを実装してください。型で概略を記述することから始めます。これは、完成したら、次のように使えるものです。

// type Is = <T>(arg1: T, ...arg2:T[]) => boolean
// let is: Is = (
//     arg1,
//     arg2
// ) => (
//     arg1 === arg2
// )

function is<T>(a: T, ...b: [T, ...T[]]): boolean {
    return b.every(_ => _ === a)
  }

is([1,1,2],[1,2])
// function is<T, U, R>(
//     arg1: T,
//     arg2: U
// ): R {
//     return (T === U)
// }
