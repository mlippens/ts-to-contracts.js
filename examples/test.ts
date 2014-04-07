interface Foo {
    ():void;
    new(a: string): void;
}

var f : Foo = function(){};
new f();
