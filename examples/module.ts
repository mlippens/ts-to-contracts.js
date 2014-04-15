/**
 * Created by mello on 4/10/14.
 */
declare module Foo {
    interface Bar {
        foo: string;
    }

    class Foo {
        static bar: string;
        constructor(a: string);
        foo():void;
    }


    var foo : Bar;
    function bar(a: string): void;

}