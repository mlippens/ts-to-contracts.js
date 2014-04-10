require.config({
    paths: {
        //'Qunit': '../examples/qunit'
    }
});

define('contracts-js',[],function(){
   return window['contracts-js'];
});

window.Foo = function() {}
window.Foo.foo = 42;
window.Foo.prototype.bar = function(){ return "hi";}

require(['../examples/class.js'], function(Class) {
   var f = new Class.Foo("hi");
   Class.Foo.foo;
   f.bar();
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
