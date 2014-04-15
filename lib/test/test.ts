/// <reference path="external.ts"/>
import url = require("url");

interface Route {
    foo();
}

class Router implements Route {
    constructor(p: string, n: string) {};
    foo();
}

var f : Route = new Router("foo","bar");