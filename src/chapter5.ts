export default null 

type Color = 'Black' | 'White'
type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8


// チェスのゲーム
class Game {
    private pieces = Game.makePieces()

    private static makePieces() {
        return [
            new King('White', 'E', 1),
            new King('Black', 'E', 8),
            // new Queen('White', 'D', 1),
            // new Queen('Black', 'D', 8),
            // new Bishop('White', 'C', 1),
            // new Bishop('White', 'F', 1),
            // new Bishop('Black', 'C', 8),
            // new Bishop('Black', 'F', 8)
        ]
    }
}

// チェスの駒
abstract class Piece {
    protected position: Position
    constructor(
        private readonly color: Color,
        file: File,
        rank: Rank
    ){
        this.position = new Position(file, rank)
    } 
    moveTo(position: Position) {
        this.position = position
    }
    abstract canMoveTo(position: Position): Boolean
}

// 駒の位置
class Position {
    constructor(
        private file: File,
        private rank: Rank
    ){}
    distanceFrom(position: Position) {
        return {
            rank: Math.abs(position.rank - this.rank),
            file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
        }
    }
}

class King extends Piece {
    canMoveTo(position: Position){
        let distance = this.position.distanceFrom(position)
        return distance.rank < 2 && distance.file < 2
    }
}
// class Queen extends Piece {}
// class Bishop extends Piece {}
// class Knight extends Piece {}
// class Rook extends Piece {}
// class Pawn extends Piece {}

class SetA {
    has(value:number): boolean{
        return true
    }
    add(value: number): this {
        return this
    }
}
class MutableSet extends SetA {
    delete(value: number): boolean {
        return true
    }
}

class Hoge {
    private messages: string[]
    protected constructor(protected argMessages: string[]){
        this.messages = argMessages
    }
    Test() {
        console.log(this.messages)
    }
}

// class Foo {
//     constructor() {
//         let Bbb = new Hoge(["a","b"])
//     }
// }

// 3 ファクトリーパターン」で作成した実装を拡張して、抽象化を多少犠牲にしてでも、より安全にしてください。
//   つまり、Shoe.create('boot')を呼び出すとBootが返され、Shoe.create('balletFlat')を呼び出すとBalletFlatが返されることを
//  （どちらもShoeが返されるのではなく）、利用者がコンパイル時にわかるように、実装を書き換えてください。
//   ヒント：「4.1.9 オーバーロードされた関数の型」を思い出してください。
// Original
// type Shoe = {
//     purpose: string
// }

// class BalletFlat implements Shoe {
//     purpose = 'dancing'
// }

// class Boot implements Shoe {
//     purpose = 'woodcutting'
// }

// class Sneaker implements Shoe {
//     purpose = 'walking'
// }

// let Shoe = {
//     create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe {
//         switch (type) {
//             case 'balletFlat': return new BalletFlat
//             case 'boot': return new Boot
//             case 'sneaker': return new Sneaker
//         }
//     }
// }

type Shoe = {
    purpose: string
}

class BalletFlat implements Shoe {
    purpose = 'dancing'
}

class Boot implements Shoe {
    purpose = 'woodcutting'
}

class Sneaker implements Shoe {
    purpose = 'walking'
}

type ShoeCreator = {
    create(type: 'balletFlat'): BalletFlat
    create(type: 'boot'): Boot
    create(type: 'sneaker'): Sneaker
}

let Shoe: ShoeCreator = {
    create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe {
        switch (type) {
            case 'balletFlat': return new BalletFlat()
            case 'boot': return new Boot()
            case 'sneaker': return new Sneaker()
        }
    }
}

Shoe.create('boot')
Shoe.create('balletFlat')
Shoe.create('sneaker')

// 4.［難問］練習として、型安全なビルダーパターンをどうしたら設計できるか考えてみてください。
//    次のことを実現できるように、「5.11.2 ビルダーパターン」のビルダーパターンを拡張します。
//      a.少なくともURLとメソッドの設定が終わるまでは.sendを呼び出せないことをコンパイル時に保証します。
//        メソッドを特定の順序で呼び出すことをユーザーに強制したら、これを保証することは容易になるでしょうか？
//        （ヒント：thisの代わりに何を返せるでしょうか？）
//      b.［より難問］ユーザーがメソッドを任意の順序で呼び出せるようにしたまま、これを保証したいとしたら、設計をどのように変更すればよいでしょうか？
//        （ヒント：それぞれのメソッド呼び出しの後で、それぞれのメソッドの戻り値の型をthisに「追加する」には、
//          TypeScriptのどのような機能を使えばよいでしょうか？）

type This = {
        
}

class RequestBuilder {

    protected data: object | null = null
    protected method: 'get' | 'post' | null = null
    protected url: string | null = null
  
    setMethod(method: 'get' | 'post'): RequestBuilderWithMethod {
        return new RequestBuilderWithMethod().setMethod(method).setData(this.data)
    }
    setData(data: object | null): this {
        this.data = data
        return this
    }
  
}

class RequestBuilderWithMethod extends RequestBuilder {
    setMethod(method: 'get' | 'post' | null): this{
        this.method = method
        return this
    }

    setURL(url: string): RequestBuilderWithMethodAndUrl {
        return new RequestBuilderWithMethod().setMethod(this.method).setURL(url).setData(this.data)
    }
}

class RequestBuilderWithMethodAndUrl extends RequestBuilderWithMethod {

    setURL(url: string): this {
        this.url = url
        return this
    }

    send() {
        // ...
        
    }
}

// new RequestBuilder()
//   .send()

new RequestBuilder()
.setMethod('get')
.setURL('/users')
.setData({firstName: 'Anna'})
.send()

interface BuildableRequest {
    data?: object
    method: 'get' | 'post'
    url: string
}

class RequestBuilder2 {
    data?: object
    method?: 'get' | 'post'
    url?: string

    setData(data: object): this & Pick<BuildableRequest, 'data'>{
        return Object.assign(this, {data})
    }

    setMethod(method: 'get' | 'post'): this & Pick<BuildableRequest, 'method'>{
        return Object.assign(this, {method})
    }

    setUrl(url: string): this & Pick<BuildableRequest, 'url'>{
        return Object.assign(this, {url})
    }

    build(this: BuildableRequest){
        return this
    }
}
new RequestBuilder2()
.setMethod('get')
.setUrl('/users')
.setData({firstName: 'Anna'})
.build()
