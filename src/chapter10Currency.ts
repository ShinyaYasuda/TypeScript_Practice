// import { type } from "os"

// export {Currency}

// 値と型の代わりに名前空間とインターフェースを使って、（「6.3.4 コンパニオンオブジェクトパターン」の）コンパニオンオブジェクトを実装し直してください。
// type Unit = 'EUR' | 'GBP' | 'JPY' | 'USD'

// type Currency = {
//   unit: Unit
//   value: number
// }

// let Currency = {
//   from(value: number, unit: Unit): Currency {
//     return {
//       unit: unit,
//       value
//     }
//   }
// }
// type Unit = 'EUR' | 'GBP' | 'JPY' | 'USD'
// export interface Currency {
//   unit: Unit
//   value: number
//   // from(value: number, unit: Unit): Currency
  
// }

// export class Currency implements Currency {
//   public unit: Unit
//   public value: number
//   from(value: number, unit: Unit): Currency {
//     return {
//       unit: unit,
//       value
//     }
//   }
// }

// export namespace Currency {
// }

// export type Currency = {
//     unit: Unit
//     value: number
// }

