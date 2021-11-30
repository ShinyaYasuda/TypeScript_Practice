type Without<T, U> = T extends U ? never : T

type A = Without<
    boolean | number | string,
    boolean
    >

type SecondArg<F> = F extends (a: any, b: infer B) => any ? B : never
type F = typeof Array['prototype']['slice']
type B = SecondArg<F>