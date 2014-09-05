declare module "foo" {

    class Bar {
        constructor(a: string);
        constructor(b: number);

        foo(a: number[]): any[];
    }

    class Foo extends Bar{}
}

interface Foo {

    (): any;
    (a: string): number;
}

interface Foobar {
    new(a: string): any;
    new(a: number): any;
}