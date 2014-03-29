require.config({
    paths: {
        'Qunit': '../examples/qunit'
    }
});

define('contracts-js',[],function(){
   return window['contracts-js'];
});

require(['test.js'],function(){
    QUnit.load();
    QUnit.start();
});