interface IA {
    bar(): void
}
interface IB {
    bar(): void;
    foo(): void;
}
//IB implicitly extends interface IA due to Typescript's structural typing

function fn(passedFn: (a: IA) => void) {
    var a:IA = {bar: function(){}};
    passedFn(a);
}

//TypeError: b.foo is not a functionfn
(function(b: IB){
    b.foo();
});