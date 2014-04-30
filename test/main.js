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
    Foo = (function () {
        var Foo = function(){
            console.log("hi from constructor");
        };

        Foo.prototype.ho = function(){
            console.log("Foooo!");
        };
        return Foo;
    })();
    return Foo;
});



require(['contracts-js', '../examples/module.js', "Foo"], function(C, Foo, RealFoo) {
    new RealFoo().ho();
    console.log(Foo);
    var f = new Foo.Foo("hi");
    console.log(f);
    f.ho();

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
