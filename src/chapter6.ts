type Without<T, U> = T extends U ? never : T

type A = Without<
    boolean | number | string,
    boolean
    >

type SecondArg<F> = F extends (a: any, b: infer B) => any ? B : never
type F = typeof Array['prototype']['slice']
type B = SecondArg<F>


a: true //ok
b: false //ok
c: true //ok
d: false //ok
e: true //ok
f: false //ok
g: true //ok
h: true //ok
i: true //ok
j: false //ok
k: false //ng
l: true //ng

type O = {a: {b: {c: string}}}
type P = keyof O
type Q = keyof O['a']['b']

// KCTかUのどちらかに含まれる（ただし両方には含まれない）型を計算するExclusive<T, U>型を記述してください。
// たとえば、Exclusive<1 | 2 | 3, 2 | 3 | 4>は、1 | 4になります。
// Exclusive<1 | 2, 2 | 4>を型チェッカーがどのように評価するかを、ステップごとに書き出してください。

// type Exclusive<T, U> = (T extends U ? never : T) | (U extends T ? never : U)
type Exclusive<T, U> = Exclude<T, U> | Exclude<U, T>

type aaa =  Exclusive<1 | 2 | 3 , 2 | 3 | 4>

// 明確な割り当てアサーションを使わないように、（「6.6.3 明確な割り当てアサーション」の）例を書き直してください。
// class globalCache {
//     static get(str : string): string {
//         return str
//     }
// }
// let userId: string = ""
// fetchUser()

// userId.toUpperCase() // OK

// function fetchUser() {
//   userId = globalCache.get('userId')
// }

let globalCache = {
    get(key: string) {
      return 'user'
    }
  }
  
  let userId = fetchUser()
  userId.toUpperCase()
  
  function fetchUser() {
    return globalCache.get('userId')
  }