declare module Foo {
    interface Foo {}

    var bar : Foo;
}

declare module "Foobar" {
    export = Foo;
}