// Type definitions for Backbone 1.0.0
// Project: http://backbonejs.org/
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// Definitions by: Natan Vivo <https://github.com/nvivo/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


/// <reference path="../jquery/jquery.d.ts" />

declare module Backbone {

    class Foo {
        hi(): void;
    }

    class Bar {
        ho(): void;
    }
}

declare module "backbone" {
export = Backbone;
}