// import { Currency } from "./chapter10Currency"

export default null 

// 値と型の代わりに名前空間とインターフェースを使って、（「6.3.4 コンパニオンオブジェクトパターン」の）コンパニオンオブジェクトを実装し直してください。
interface Currency {
    unit: 'EUR' | 'GBP' | 'JPY'| 'USD'
    value: number
}

namespace Currency {
    export let DEFAULT: Currency['unit'] = 'GBP'
    export function from(value: number, unit = Currency.DEFAULT): Currency {
        return {unit, value}
    }
}

let amountDue: Currency = {
    unit: 'JPY',
    value: 83733.10
}

let otherAmountDue = Currency.from(330, 'GBP')

// 列挙型に静的メソッドを追加してください。
enum Color {
    RED = '#ff0000',
    GREEN = '#00ff00',
    BLUE = '#0000ff'
}

namespace Color {
    export function getClosest(to: string) {
        
    }
}

Color.getClosest('#994302')