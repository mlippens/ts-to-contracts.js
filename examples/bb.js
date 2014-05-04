define(["require", "exports", "contracts-js", "backbone"], function(require, exports) {
    var C = require("contracts-js");
    var backbone, AddOptions, HistoryOptions, NavigateOptions, RouterOptions, Silenceable, Validable, Waitable, Parseable, PersistenceOptions, ModelSetOptions, ModelFetchOptions, ModelSaveOptions, ModelDestroyOptions, CollectionFetchOptions, OptionalDefaults, OptionalRoutes, ViewOptions, OptionalEvents, Events_class, Events, ModelBase_class, ModelBase, Model_class, Model, Collection_class, Collection, Router_class, Router, History_class, History, View_class, View, Backbone;
    backbone = require("backbone"); // Type definitions for Backbone 1.0.0
    // Project: http://backbonejs.org/
    // Definitions by: Boris Yankov <https://github.com/borisyankov/>
    // Definitions by: Natan Vivo <https://github.com/nvivo/>
    // Definitions: https://github.com/borisyankov/DefinitelyTyped


    /// <reference path="../jquery/jquery.d.ts" />
    Silenceable = C.object({
        silent: C.opt(C.Bool)
    }, {});
    AddOptions = C.extend(C.object({
        at: C.opt(C.Num)
    }, {}), Silenceable);
    HistoryOptions = C.extend(C.object({
        pushState: C.opt(C.Bool),
        root: C.opt(C.Str)
    }, {}), Silenceable);
    NavigateOptions = C.object({
        trigger: C.opt(C.Bool)
    }, {});
    RouterOptions = C.object({
        routes: C.Any
    }, {});

    Validable = C.object({
        validate: C.opt(C.Bool)
    }, {});
    Waitable = C.object({
        wait: C.opt(C.Bool)
    }, {});
    Parseable = C.object({
        parse: C.opt(C.Any)
    }, {});
    PersistenceOptions = C.object({
        url: C.opt(C.Str),
        beforeSend: C.opt(C.fun([C.Any], C.Undefined, {})),
        success: C.opt(C.fun([C.opt(C.Any), C.opt(C.Any), C.opt(C.Any)], C.Undefined, {})),
        error: C.opt(C.fun([C.opt(C.Any), C.opt(C.Any), C.opt(C.Any)], C.Undefined, {}))
    }, {});
    ModelSetOptions = C.extend(C.extend(C.object({}, {}), Silenceable), Validable);
    ModelFetchOptions = C.extend(C.extend(C.extend(C.object({}, {}), PersistenceOptions), ModelSetOptions), Parseable);
    ModelSaveOptions = C.extend(C.extend(C.extend(C.extend(C.extend(C.object({
        patch: C.opt(C.Bool)
    }, {}), Silenceable), Waitable), Validable), Parseable), PersistenceOptions);
    ModelDestroyOptions = C.extend(C.extend(C.object({}, {}), Waitable), PersistenceOptions);
    CollectionFetchOptions = C.extend(C.extend(C.object({
        reset: C.opt(C.Bool)
    }, {}), PersistenceOptions), Parseable);
    OptionalDefaults = C.object({
        defaults: C.opt(C.fun([], C.Any, {}))
    }, {});
    OptionalRoutes = C.object({
        routes: C.opt(C.fun([], C.Any, {}))
    }, {});

    OptionalEvents = C.object({
        events: C.opt(C.fun([], C.Any, {}))
    }, {});
    Events = C.object({
        on: C.fun([C.Any, C.opt(C.check(function(e) {
            return typeof e === 'function'
        }, 'Function')), C.opt(C.Any)], C.Any, {}),
        off: C.fun([C.opt(C.Str), C.opt(C.check(function(e) {
            return typeof e === 'function'
        }, 'Function')), C.opt(C.Any)], C.Any, {}),
        trigger: C.fun([C.Str], C.Any, {
            "rest": C.Any
        }),
        bind: C.fun([C.Str, C.check(function(e) {
            return typeof e === 'function'
        }, 'Function'), C.opt(C.Any)], C.Any, {}),
        unbind: C.fun([C.opt(C.Str), C.opt(C.check(function(e) {
            return typeof e === 'function'
        }, 'Function')), C.opt(C.Any)], C.Any, {}),
        once: C.fun([C.Str, C.check(function(e) {
            return typeof e === 'function'
        }, 'Function'), C.opt(C.Any)], C.Any, {}),
        listenTo: C.fun([C.Any, C.Str, C.check(function(e) {
            return typeof e === 'function'
        }, 'Function')], C.Any, {}),
        listenToOnce: C.fun([C.Any, C.Str, C.check(function(e) {
            return typeof e === 'function'
        }, 'Function')], C.Any, {}),
        stopListening: C.fun([C.opt(C.Any), C.opt(C.Str), C.opt(C.check(function(e) {
            return typeof e === 'function'
        }, 'Function'))], C.Any, {})
    }, {});
    Events_class = C.object({}, {
        "class": Events
    });
    ModelBase = C.object({
        url: C.Any,
        parse: C.fun([C.Any, C.opt(C.Any)], C.Any, {}),
        toJSON: C.fun([C.opt(C.Any)], C.Any, {}),
        sync: C.fun([], C.Any, {
            "rest": C.Any
        })
    }, {});
    ModelBase_class = C.object({}, {
        "class": ModelBase
    });
    Model = C.object({
        attributes: C.Any,
        changed: C.object({}, {}),
        cid: C.Str,
        id: C.Any,
        idAttribute: C.Str,
        validationError: C.Any,
        urlRoot: C.Any,
        initialize: C.fun([C.opt(C.Any), C.opt(C.Any)], C.Undefined, {}),
        fetch: C.fun([C.opt(ModelFetchOptions)], C.Any, {}),
        get: C.fun([C.Str], C.Any, {}),
        change: C.fun([], C.Any, {}),
        changedAttributes: C.fun([C.opt(C.Any)], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        clear: C.fun([C.opt(Silenceable)], C.Any, {}),
        clone: C.fun([], C.Any, {}),
        destroy: C.fun([C.opt(ModelDestroyOptions)], C.Any, {}),
        escape: C.fun([C.Str], C.Str, {}),
        has: C.fun([C.Str], C.Bool, {}),
        hasChanged: C.fun([C.opt(C.Str)], C.Bool, {}),
        isNew: C.fun([], C.Bool, {}),
        isValid: C.fun([C.opt(C.Any)], C.Bool, {}),
        previous: C.fun([C.Str], C.Any, {}),
        previousAttributes: C.fun([], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        save: C.fun([C.opt(C.Any), C.opt(ModelSaveOptions)], C.Any, {}),
        unset: C.fun([C.Str, C.opt(Silenceable)], C.Any, {}),
        validate: C.fun([C.Any, C.opt(C.Any)], C.Any, {}),
        _validate: C.fun([C.Any, C.Any], C.Bool, {}),
        keys: C.fun([], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        values: C.fun([], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        pairs: C.fun([], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        invert: C.fun([], C.Any, {}),
        set: C.overload_fun(C.fun([C.Any, C.opt(ModelSetOptions)], C.Any, {}), C.fun([C.Str, C.Any, C.opt(ModelSetOptions)], C.Any, {})),
        pick: C.overload_fun(C.fun([], C.Any, {
            "rest": C.Str
        }), C.fun([C.check(function(e) {
            return Array.isArray(e);
        }, 'Array')], C.Any, {})),
        omit: C.overload_fun(C.fun([], C.Any, {
            "rest": C.Str
        }), C.fun([C.check(function(e) {
            return Array.isArray(e);
        }, 'Array')], C.Any, {}))
    }, {"silent": true});
    Model_class = C.and(C.fun([C.opt(C.Any), C.opt(C.Any)], C.Any, {}), C.object({
        extend: C.fun([C.Any, C.opt(C.Any)], C.Any, {})
    }, {
        "class": Model
    }));
    Collection = C.object({
        model: C.Any,
        models: C.Any,
        collection: Model,
        length: C.Num,
        fetch: C.fun([C.opt(CollectionFetchOptions)], C.Any, {}),
        at: C.fun([C.Num], Model, {}),
        //changed!
        get: C.fun([C.Any], C.or(Model, C.Undefined), {}),
        create: C.fun([C.Any, C.opt(ModelSaveOptions)], Model, {}),
        pluck: C.fun([C.Str], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        push: C.fun([Model, C.opt(AddOptions)], Model, {}),
        pop: C.fun([C.opt(Silenceable)], Model, {}),
        shift: C.fun([C.opt(Silenceable)], Model, {}),
        sort: C.fun([C.opt(Silenceable)], C.Any, {}),
        unshift: C.fun([Model, C.opt(AddOptions)], Model, {}),
        where: C.fun([C.Any], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        findWhere: C.fun([C.Any], Model, {}),
        _prepareModel: C.fun([C.opt(C.Any), C.opt(C.Any)], C.Any, {}),
        _removeReference: C.fun([Model], C.Undefined, {}),
        _onModelEvent: C.fun([C.Str, Model, C.Any, C.Any], C.Undefined, {}),
        all: C.fun([C.fun([Model, C.Num], C.Bool, {}), C.opt(C.Any)], C.Bool, {}),
        any: C.fun([C.fun([Model, C.Num], C.Bool, {}), C.opt(C.Any)], C.Bool, {}),
        collect: C.fun([C.fun([Model, C.Num, C.opt(C.Any)], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}), C.opt(C.Any)], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        chain: C.fun([], C.Any, {}),
        compact: C.fun([], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        contains: C.fun([C.Any], C.Bool, {}),
        detect: C.fun([C.fun([C.Any], C.Bool, {}), C.opt(C.Any)], C.Any, {}),
        difference: C.fun([], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {
            "rest": Model
        }),
        each: C.fun([C.fun([Model, C.Num, C.opt(C.Any)], C.Undefined, {}), C.opt(C.Any)], C.Any, {}),
        every: C.fun([C.fun([Model, C.Num], C.Bool, {}), C.opt(C.Any)], C.Bool, {}),
        //changed! this delegates to Array::filter, which gives 3 arguments...
        filter: C.fun([C.fun([Model, C.Num, C.opt(C.Any)], C.Bool, {}), C.opt(C.Any)], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        find: C.fun([C.fun([Model, C.Num], C.Bool, {}), C.opt(C.Any)], Model, {}),
        flatten: C.fun([C.opt(C.Bool)], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        foldl: C.fun([C.fun([C.Any, Model, C.Num], C.Any, {}), C.Any, C.opt(C.Any)], C.Any, {}),
        forEach: C.fun([C.fun([Model, C.Num, C.opt(C.Any)], C.Undefined, {}), C.opt(C.Any)], C.Any, {}),
        include: C.fun([C.Any], C.Bool, {}),
        indexOf: C.fun([Model, C.opt(C.Bool)], C.Num, {}),
        inject: C.fun([C.fun([C.Any, Model, C.Num], C.Any, {}), C.Any, C.opt(C.Any)], C.Any, {}),
        intersection: C.fun([], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {
            "rest": Model
        }),
        isEmpty: C.fun([C.Any], C.Bool, {}),
        invoke: C.fun([C.Str, C.opt(C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'))], C.Any, {}),
        lastIndexOf: C.fun([Model, C.opt(C.Num)], C.Num, {}),
        map: C.fun([C.fun([Model, C.Num, C.opt(C.Any)], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}), C.opt(C.Any)], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        max: C.fun([C.opt(C.fun([Model, C.Num], C.Any, {})), C.opt(C.Any)], Model, {}),
        min: C.fun([C.opt(C.fun([Model, C.Num], C.Any, {})), C.opt(C.Any)], Model, {}),
        object: C.fun([], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {
            "rest": C.Any
        }),
        reduce: C.fun([C.fun([C.Any, Model, C.Num], C.Any, {}), C.Any, C.opt(C.Any)], C.Any, {}),
        select: C.fun([C.Any, C.opt(C.Any)], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        size: C.fun([], C.Num, {}),
        shuffle: C.fun([], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        some: C.fun([C.fun([Model, C.Num], C.Bool, {}), C.opt(C.Any)], C.Bool, {}),
        sortedIndex: C.fun([Model, C.opt(C.fun([Model, C.Num], C.Num, {}))], C.Num, {}),
        reduceRight: C.fun([C.fun([C.Any, Model, C.Num], C.Any, {}), C.Any, C.opt(C.Any)], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        reject: C.fun([C.fun([Model, C.Num], C.Bool, {}), C.opt(C.Any)], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        toArray: C.fun([], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        union: C.fun([], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {
            "rest": Model
        }),
        uniq: C.fun([C.opt(C.Bool), C.opt(C.fun([Model, C.Num], C.Bool, {}))], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        without: C.fun([], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {
            "rest": C.Any
        }),
        zip: C.fun([], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {
            "rest": Model
        }),
        comparator: C.overload_fun(C.fun([Model, C.opt(Model)], C.Any, {}), C.fun([Model], C.Any, {})),
        add: C.overload_fun(C.fun([C.Any, C.opt(AddOptions)], C.Any, {}), C.fun([C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), C.opt(AddOptions)], C.Any, {}), C.fun([C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), C.opt(AddOptions)], C.Any, {}), C.fun([Model, C.opt(AddOptions)], C.Any, {})),
        remove: C.overload_fun(C.fun([C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), C.opt(Silenceable)], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}), C.fun([Model, C.opt(Silenceable)], Model, {})),
        reset: C.overload_fun(C.fun([C.opt(C.check(function(e) {
            return Array.isArray(e);
        }, 'Array')), C.opt(Silenceable)], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}), C.fun([C.opt(C.check(function(e) {
            return Array.isArray(e);
        }, 'Array')), C.opt(Silenceable)], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {})),
        countBy: C.overload_fun(C.fun([C.Str], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}), C.fun([C.fun([Model, C.Num], C.Any, {})], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {})),
        drop: C.overload_fun(C.fun([C.Num], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}), C.fun([], Model, {})),
        first: C.overload_fun(C.fun([C.Num], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}), C.fun([], Model, {})),
        initial: C.overload_fun(C.fun([C.Num], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}), C.fun([], Model, {})),
        last: C.overload_fun(C.fun([C.Num], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}), C.fun([], Model, {})),
        sortBy: C.overload_fun(C.fun([C.Str, C.opt(C.Any)], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}), C.fun([C.fun([Model, C.Num], C.Num, {}), C.opt(C.Any)], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {})),
        range: C.overload_fun(C.fun([C.Num, C.Num, C.opt(C.Num)], C.Any, {}), C.fun([C.Num, C.opt(C.Num)], C.Any, {})),
        rest: C.overload_fun(C.fun([C.Num], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}), C.fun([], Model, {})),
        tail: C.overload_fun(C.fun([C.Num], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}), C.fun([], Model, {}))
    }, {"silent": true});
    Collection_class = C.and(C.fun([C.opt(C.Any), C.opt(C.Any)], C.Any, {}), C.object({
        extend: C.fun([C.Any, C.opt(C.Any)], C.Any, {})
    }, {
        "class": Collection
    }));
    ViewOptions = C.object({
        model: C.opt(Model),
        collection: C.opt(Collection),
        el: C.opt(C.Any),
        id: C.opt(C.Str),
        className: C.opt(C.Str),
        tagName: C.opt(C.Str),
        attributes: C.opt(C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'))
    }, {});

    Router = C.object({
        initialize: C.fun([C.opt(RouterOptions)], C.Undefined, {}),
        route: C.fun([C.Str, C.Str, C.opt(C.check(function(e) {
            return typeof e === 'function'
        }, 'Function'))], C.Any, {}),
        _bindRoutes: C.fun([], C.Undefined, {}),
        _routeToRegExp: C.fun([C.Str], C.check(function(e) {
            return e instanceof RegExp
        }, 'RegExp'), {}),
        _extractParameters: C.fun([C.check(function(e) {
            return e instanceof RegExp
        }, 'RegExp'), C.Str], C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'), {}),
        navigate: C.overload_fun(C.fun([C.Str, C.opt(C.Bool)], C.Any, {}), C.fun([C.Str, C.opt(NavigateOptions)], C.Any, {}))
    }, {"silent": true});
    Router_class = C.and(C.fun([C.opt(RouterOptions)], C.Any, {}), C.object({
        extend: C.fun([C.Any, C.opt(C.Any)], C.Any, {})
    }, {
        "class": Router
    }));
    History = C.object({
        handlers: C.check(function(e) {
            return Array.isArray(e);
        }, 'Array'),
        interval: C.Num,
        start: C.fun([C.opt(HistoryOptions)], C.Bool, {}),
        getHash: C.fun([C.opt(C.Any)], C.Str, {}),
        getFragment: C.fun([C.opt(C.Str), C.opt(C.Bool)], C.Str, {}),
        stop: C.fun([], C.Undefined, {}),
        route: C.fun([C.Str, C.check(function(e) {
            return typeof e === 'function'
        }, 'Function')], C.Num, {}),
        checkUrl: C.fun([C.opt(C.Any)], C.Undefined, {}),
        loadUrl: C.fun([C.opt(C.Str)], C.Bool, {}),
        navigate: C.fun([C.Str, C.opt(C.Any)], C.Bool, {}),
        started: C.Bool,
        _updateHash: C.fun([C.Any, C.Str, C.Bool], C.Undefined, {})
    }, {"silent": true});
    History_class = C.object({}, {
        "class": History
    });
    View = C.object({
        model: Model,
        collection: Collection,
        id: C.Str,
        cid: C.Str,
        className: C.Str,
        tagName: C.Str,
        options: C.Any,
        el: C.Any,
        $el: C.Any,
        attributes: C.Any,
        render: C.fun([], C.Any, {}),
        remove: C.fun([], C.Any, {}),
        delegateEvents: C.fun([C.opt(C.Any)], C.Any, {}),
        undelegateEvents: C.fun([], C.Any, {}),
        _ensureElement: C.fun([], C.Undefined, {}),
        setElement: C.overload_fun(C.fun([C.Any, C.opt(C.Bool)], C.Any, {}), C.fun([C.Any], C.Any, {}), C.fun([C.Any, C.opt(C.Bool)], C.Any, {})),
        $: C.overload_fun(C.fun([C.Any], C.Any, {}), C.fun([C.Str], C.Any, {})),
        make: C.overload_fun(C.fun([C.Any, C.opt(C.Any), C.opt(C.Any)], C.Any, {}), C.fun([C.Str, C.opt(C.Any), C.opt(C.Any)], C.Any, {}))
    }, {"silent": true});
    View_class = C.and(C.fun([C.opt(ViewOptions)], C.Any, {}), C.object({
        extend: C.fun([C.Any, C.opt(C.Any)], C.Any, {})
    }, {
        "class": View
    }));
    Backbone = C.object({
        Events: Events_class,
        ModelBase: ModelBase_class,
        Model: Model_class,
        Collection: Collection_class,
        Router: Router_class,
        history: History,
        History: History_class,
        View: View_class,
        sync: C.fun([C.Str, Model, C.opt(C.Any)], C.Any, {}),
        emulateHTTP: C.Bool,
        emulateJSONBackbone: C.Bool,
        setDomLibrary: C.fun([C.Any], C.Any, {}),
        $: C.Any
    }, {
        "silent": true
    });

    exports = C.guard(Backbone, backbone, "backbone");
    C.setExported(Backbone, 'Backbone');
    return exports;
});