require.config({
    paths: {
        //'Qunit': '../examples/qunit'
    }
});

define('contracts-js',[],function(){
   return window['contracts-js'];
});

define("Foo",[], function(){
    var Foo;
    (function (_Foo) {
        var Foo = (function () {
            function Foo(a) {
            }
            Foo.prototype.foo = function () {
            };
            Foo.bar = "hi";
            return Foo;
        })();
        _Foo.Foo = Foo;
        _Foo.foo = { foo: "hi" };
        function bar(a) {
        }
        _Foo.bar = bar;
        return _Foo;
    })(Foo || (Foo = {}));
    return Foo;
});



require(['contracts-js', '../examples/module.js'], function(C, Foo) {
    Foo = C.use(Foo, "mymain");
    new Foo.Foo.Foo(2);
});

/*
require(['contracts-js'],function(__contracts){
    __contracts.autoload();

    var contract, k;

    contract = object({prototype: object({ho: Str}, {})},{});
    k = function() {};
    k.prototype.ho =  function(){ alert("ho")};
    k.prototype = k.prototype;


*/
/*    var foo = function(){};
    foo.prototype = Object.create(k.prototype);*//*


    var New = function() {
        var objProto = Object.create(this.prototype);
        var instance = this.apply(objProto, arguments);
        return (typeof instance === 'object' && instance ) || objProto;
    }

    foo = guard(contract, k);

    //foo.prototype.ho();
    var f = new foo();
    f.ho();

    //var f2 = New.call(foo);
    //f2.ho();


});*/
