define(["require", "exports", "contracts-js", "backbone"], function(require, exports) {
    var C = require("contracts-js");
    var Fun, Arr, RegExp, backbone, Backbone, AddOptions, HistoryOptions, NavigateOptions, RouterOptions, Silenceable, Validable, Waitable, Parseable, PersistenceOptions, ModelSetOptions, ModelFetchOptions, ModelSaveOptions, ModelDestroyOptions, CollectionFetchOptions, Events, ModelBase, OptionalDefaults, Model, Collection, OptionalRoutes, Router, history, History, ViewOptions, OptionalEvents, View, sync, emulateHTTP, emulateJSONBackbone, setDomLibrary, $, _backbone, Events_class, ModelBase_class, Model_class, Collection_class, Router_class, History_class, View_class;
    backbone = require("backbone"); // Type definitions for Backbone 1.0.0
    // Project: http://backbonejs.org/
    // Definitions by: Boris Yankov <https://github.com/borisyankov/>
    // Definitions by: Natan Vivo <https://github.com/nvivo/>
    // Definitions: https://github.com/borisyankov/DefinitelyTyped


    /// <reference path="../jquery/jquery.d.ts" />
    Silenceable = C.object({
        silent: C.opt(C.Bool)
    }, {}, "Silenceable");
    AddOptions = C.extend(C.object({
        at: C.opt(C.Num)
    }, {}, "AddOptions"), Silenceable);
    HistoryOptions = C.extend(C.object({
        pushState: C.opt(C.Bool),
        root: C.opt(C.Str)
    }, {}, "HistoryOptions"), Silenceable);
    NavigateOptions = C.object({
        trigger: C.opt(C.Bool)
    }, {}, "NavigateOptions");
    RouterOptions = C.object({
        routes: C.Any
    }, {}, "RouterOptions");

    Validable = C.object({
        validate: C.opt(C.Bool)
    }, {}, "Validable");
    Waitable = C.object({
        wait: C.opt(C.Bool)
    }, {}, "Waitable");
    Parseable = C.object({
        parse: C.opt(C.Any)
    }, {}, "Parseable");
    PersistenceOptions = C.object({
        url: C.opt(C.Str),
        beforeSend: C.opt(C.fun([C.Any], C.Undefined, {})),
        success: C.opt(C.fun([C.opt(C.Any), C.opt(C.Any), C.opt(C.Any)], C.Undefined, {})),
        error: C.opt(C.fun([C.opt(C.Any), C.opt(C.Any), C.opt(C.Any)], C.Undefined, {}))
    }, {}, "PersistenceOptions");
    ModelSetOptions = C.extend(C.extend(C.object({}, {}, "ModelSetOptions"), Silenceable), Validable);
    ModelFetchOptions = C.extend(C.extend(C.extend(C.object({}, {}, "ModelFetchOptions"), PersistenceOptions), ModelSetOptions), Parseable);
    ModelSaveOptions = C.extend(C.extend(C.extend(C.extend(C.extend(C.object({
        patch: C.opt(C.Bool)
    }, {}, "ModelSaveOptions"), Silenceable), Waitable), Validable), Parseable), PersistenceOptions);
    ModelDestroyOptions = C.extend(C.extend(C.object({}, {}, "ModelDestroyOptions"), Waitable), PersistenceOptions);
    CollectionFetchOptions = C.extend(C.extend(C.object({
        reset: C.opt(C.Bool)
    }, {}, "CollectionFetchOptions"), PersistenceOptions), Parseable);
    OptionalDefaults = C.object({
        defaults: C.opt(C.fun([], C.Any, {}))
    }, {}, "OptionalDefaults");
    OptionalRoutes = C.object({
        routes: C.opt(C.fun([], C.Any, {}))
    }, {}, "OptionalRoutes");

    OptionalEvents = C.object({
        events: C.opt(C.fun([], C.Any, {}))
    }, {}, "OptionalEvents");
    Events = C.object({
        on: C.fun([C.Any, C.opt(C.Fun), C.opt(C.Any)], C.Any, {}),
        off: C.fun([C.opt(C.Str), C.opt(C.Fun), C.opt(C.Any)], C.Any, {}),
        trigger: C.fun([C.Str], C.Any, {
            "rest": C.Any
        }),
        bind: C.fun([C.Str, C.Fun, C.opt(C.Any)], C.Any, {}),
        unbind: C.fun([C.opt(C.Str), C.opt(C.Fun), C.opt(C.Any)], C.Any, {}),
        once: C.fun([C.Str, C.Fun, C.opt(C.Any)], C.Any, {}),
        listenTo: C.fun([C.Any, C.Str, C.Fun], C.Any, {}),
        listenToOnce: C.fun([C.Any, C.Str, C.Fun], C.Any, {}),
        stopListening: C.fun([C.opt(C.Any), C.opt(C.Str), C.opt(C.Fun)], C.Any, {})
    }, {}, "Events");
    Events_class = C.object({}, {
        "class": Events
    });
    ModelBase = C.extend(C.object({
        url: C.Any,
        parse: C.fun([C.Any, C.opt(C.Any)], C.Any, {}),
        toJSON: C.fun([C.opt(C.Any)], C.Any, {}),
        sync: C.fun([], C.Any, {
            "rest": C.Any
        })
    }, {}, "ModelBase"), Events);
    ModelBase_class = C.object({}, {
        "class": ModelBase
    });
    Model = C.extend(C.object({
        attributes: C.Any,
        changed: C.Arr(C.Any),
        cid: C.Str,
        id: C.Any,
        idAttribute: C.Str,
        validationError: C.Any,
        urlRoot: C.Any,
        initialize: C.fun([C.opt(C.Any), C.opt(C.Any)], C.Undefined, {}),
        fetch: C.fun([C.opt(ModelFetchOptions)], C.Any, {}),
        get: C.fun([C.Str], C.Any, {}),
        change: C.fun([], C.Any, {}),
        changedAttributes: C.fun([C.opt(C.Any)], C.Arr(C.Any), {}),
        clear: C.fun([C.opt(Silenceable)], C.Any, {}),
        clone: C.fun([], C.Self, {}),
        destroy: C.fun([C.opt(ModelDestroyOptions)], C.Any, {}),
        escape: C.fun([C.Str], C.Str, {}),
        has: C.fun([C.Str], C.Bool, {}),
        hasChanged: C.fun([C.opt(C.Str)], C.Bool, {}),
        isNew: C.fun([], C.Bool, {}),
        isValid: C.fun([C.opt(C.Any)], C.Bool, {}),
        previous: C.fun([C.Str], C.Any, {}),
        previousAttributes: C.fun([], C.Arr(C.Any), {}),
        save: C.fun([C.opt(C.Any), C.opt(ModelSaveOptions)], C.Any, {}),
        unset: C.fun([C.Str, C.opt(Silenceable)], C.Self, {}),
        validate: C.fun([C.Any, C.opt(C.Any)], C.Any, {}),
        _validate: C.fun([C.Any, C.Any], C.Bool, {}),
        keys: C.fun([], C.Arr(C.Str), {}),
        values: C.fun([], C.Arr(C.Any), {}),
        pairs: C.fun([], C.Arr(C.Any), {}),
        invert: C.fun([], C.Any, {}),
        set: C.overload_fun(C.fun([C.Any, C.opt(ModelSetOptions)], C.Self, {}), C.fun([C.Str, C.Any, C.opt(ModelSetOptions)], C.Self, {})),
        pick: C.overload_fun(C.fun([], C.Any, {
            "rest": C.Str
        }), C.fun([C.Arr(C.Str)], C.Any, {})),
        omit: C.overload_fun(C.fun([], C.Any, {
            "rest": C.Str
        }), C.fun([C.Arr(C.Str)], C.Any, {}))
    }, {}, "Model"), ModelBase);
    Model_class = C.and(C.fun([C.opt(C.Any), C.opt(C.Any)], C.Any, {}), C.object({
        extend: C.fun([C.Any, C.opt(C.Any)], C.Any, {})
    }, {
        "class": Model
    }));
    Collection = C.extend(C.object({
        model: C.Any,
        models: C.Any,
        collection: Model,
        length: C.Num,
        fetch: C.fun([C.opt(CollectionFetchOptions)], C.Any, {}),
        at: C.fun([C.Num], Model, {}),
        get: C.fun([C.Any], Model, {}),
        create: C.fun([C.Any, C.opt(ModelSaveOptions)], Model, {}),
        pluck: C.fun([C.Str], C.Arr(C.Any), {}),
        push: C.fun([Model, C.opt(AddOptions)], Model, {}),
        pop: C.fun([C.opt(Silenceable)], Model, {}),
        shift: C.fun([C.opt(Silenceable)], Model, {}),
        sort: C.fun([C.opt(Silenceable)], C.Self, {}),
        unshift: C.fun([Model, C.opt(AddOptions)], Model, {}),
        where: C.fun([C.Any], C.Arr(Model), {}),
        findWhere: C.fun([C.Any], Model, {}),
        _prepareModel: C.fun([C.opt(C.Any), C.opt(C.Any)], C.Any, {}),
        _removeReference: C.fun([Model], C.Undefined, {}),
        _onModelEvent: C.fun([C.Str, Model, C.Self, C.Any], C.Undefined, {}),
        all: C.fun([C.fun([Model, C.Num], C.Bool, {}), C.opt(C.Any)], C.Bool, {}),
        any: C.fun([C.fun([Model, C.Num], C.Bool, {}), C.opt(C.Any)], C.Bool, {}),
        collect: C.fun([C.fun([Model, C.Num, C.opt(C.Any)], C.Arr(C.Any), {}), C.opt(C.Any)], C.Arr(C.Any), {}),
        chain: C.fun([], C.Any, {}),
        compact: C.fun([], C.Arr(Model), {}),
        contains: C.fun([C.Any], C.Bool, {}),
        detect: C.fun([C.fun([C.Any], C.Bool, {}), C.opt(C.Any)], C.Any, {}),
        difference: C.fun([], C.Arr(Model), {
            "rest": Model
        }),
        each: C.fun([C.fun([Model, C.Num, C.opt(C.Any)], C.Undefined, {}), C.opt(C.Any)], C.Any, {}),
        every: C.fun([C.fun([Model, C.Num], C.Bool, {}), C.opt(C.Any)], C.Bool, {}),
        filter: C.fun([C.fun([Model, C.Num], C.Bool, {}), C.opt(C.Any)], C.Arr(Model), {}),
        find: C.fun([C.fun([Model, C.Num], C.Bool, {}), C.opt(C.Any)], Model, {}),
        flatten: C.fun([C.opt(C.Bool)], C.Arr(Model), {}),
        foldl: C.fun([C.fun([C.Any, Model, C.Num], C.Any, {}), C.Any, C.opt(C.Any)], C.Any, {}),
        forEach: C.fun([C.fun([Model, C.Num, C.opt(C.Any)], C.Undefined, {}), C.opt(C.Any)], C.Any, {}),
        include: C.fun([C.Any], C.Bool, {}),
        indexOf: C.fun([Model, C.opt(C.Bool)], C.Num, {}),
        inject: C.fun([C.fun([C.Any, Model, C.Num], C.Any, {}), C.Any, C.opt(C.Any)], C.Any, {}),
        intersection: C.fun([], C.Arr(Model), {
            "rest": Model
        }),
        isEmpty: C.fun([C.Any], C.Bool, {}),
        invoke: C.fun([C.Str, C.opt(C.Arr(C.Any))], C.Any, {}),
        lastIndexOf: C.fun([Model, C.opt(C.Num)], C.Num, {}),
        map: C.fun([C.fun([Model, C.Num, C.opt(C.Any)], C.Arr(C.Any), {}), C.opt(C.Any)], C.Arr(C.Any), {}),
        max: C.fun([C.opt(C.fun([Model, C.Num], C.Any, {})), C.opt(C.Any)], Model, {}),
        min: C.fun([C.opt(C.fun([Model, C.Num], C.Any, {})), C.opt(C.Any)], Model, {}),
        object: C.fun([], C.Arr(C.Any), {
            "rest": C.Any
        }),
        reduce: C.fun([C.fun([C.Any, Model, C.Num], C.Any, {}), C.Any, C.opt(C.Any)], C.Any, {}),
        select: C.fun([C.Any, C.opt(C.Any)], C.Arr(C.Any), {}),
        size: C.fun([], C.Num, {}),
        shuffle: C.fun([], C.Arr(C.Any), {}),
        some: C.fun([C.fun([Model, C.Num], C.Bool, {}), C.opt(C.Any)], C.Bool, {}),
        sortedIndex: C.fun([Model, C.opt(C.fun([Model, C.Num], C.Num, {}))], C.Num, {}),
        reduceRight: C.fun([C.fun([C.Any, Model, C.Num], C.Any, {}), C.Any, C.opt(C.Any)], C.Arr(C.Any), {}),
        reject: C.fun([C.fun([Model, C.Num], C.Bool, {}), C.opt(C.Any)], C.Arr(Model), {}),
        toArray: C.fun([], C.Arr(C.Any), {}),
        union: C.fun([], C.Arr(Model), {
            "rest": Model
        }),
        uniq: C.fun([C.opt(C.Bool), C.opt(C.fun([Model, C.Num], C.Bool, {}))], C.Arr(Model), {}),
        without: C.fun([], C.Arr(Model), {
            "rest": C.Any
        }),
        zip: C.fun([], C.Arr(Model), {
            "rest": Model
        }),
        comparator: C.overload_fun(C.fun([Model, C.opt(Model)], C.Any, {}), C.fun([Model], C.Any, {})),
        add: C.overload_fun(C.fun([C.Any, C.opt(AddOptions)], C.Self, {}), C.fun([C.Arr(Model), C.opt(AddOptions)], C.Self, {}), C.fun([C.Arr(C.Any), C.opt(AddOptions)], C.Self, {}), C.fun([Model, C.opt(AddOptions)], C.Self, {})),
        remove: C.overload_fun(C.fun([C.Arr(Model), C.opt(Silenceable)], C.Arr(Model), {}), C.fun([Model, C.opt(Silenceable)], Model, {})),
        reset: C.overload_fun(C.fun([C.opt(C.Arr(C.Any)), C.opt(Silenceable)], C.Arr(Model), {}), C.fun([C.opt(C.Arr(Model)), C.opt(Silenceable)], C.Arr(Model), {})),
        countBy: C.overload_fun(C.fun([C.Str], C.Arr(C.Any), {}), C.fun([C.fun([Model, C.Num], C.Any, {})], C.Arr(C.Any), {})),
        drop: C.overload_fun(C.fun([C.Num], C.Arr(Model), {}), C.fun([], Model, {})),
        first: C.overload_fun(C.fun([C.Num], C.Arr(Model), {}), C.fun([], Model, {})),
        initial: C.overload_fun(C.fun([C.Num], C.Arr(Model), {}), C.fun([], Model, {})),
        last: C.overload_fun(C.fun([C.Num], C.Arr(Model), {}), C.fun([], Model, {})),
        sortBy: C.overload_fun(C.fun([C.Str, C.opt(C.Any)], C.Arr(Model), {}), C.fun([C.fun([Model, C.Num], C.Num, {}), C.opt(C.Any)], C.Arr(Model), {})),
        range: C.overload_fun(C.fun([C.Num, C.Num, C.opt(C.Num)], C.Any, {}), C.fun([C.Num, C.opt(C.Num)], C.Any, {})),
        rest: C.overload_fun(C.fun([C.Num], C.Arr(Model), {}), C.fun([], Model, {})),
        tail: C.overload_fun(C.fun([C.Num], C.Arr(Model), {}), C.fun([], Model, {}))
    }, {}, "Collection"), ModelBase);
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
        attributes: C.opt(C.Arr(C.Any))
    }, {}, "ViewOptions");
    Router = C.extend(C.object({
        initialize: C.fun([C.opt(RouterOptions)], C.Undefined, {}),
        route: C.fun([C.Str, C.Str, C.opt(C.Fun)], C.Self, {}),
        _bindRoutes: C.fun([], C.Undefined, {}),
        _routeToRegExp: C.fun([C.Str], C.RegExp, {}),
        _extractParameters: C.fun([C.RegExp, C.Str], C.Arr(C.Str), {}),
        navigate: C.overload_fun(C.fun([C.Str, C.opt(C.Bool)], C.Self, {}), C.fun([C.Str, C.opt(NavigateOptions)], C.Self, {}))
    }, {}, "Router"), Events);
    Router_class = C.and(C.fun([C.opt(RouterOptions)], C.Any, {}), C.object({
        extend: C.fun([C.Any, C.opt(C.Any)], C.Any, {})
    }, {
        "class": Router
    }));
    History = C.extend(C.object({
        handlers: C.Arr(C.Any),
        interval: C.Num,
        start: C.fun([C.opt(HistoryOptions)], C.Bool, {}),
        getHash: C.fun([C.opt(C.Any)], C.Str, {}),
        getFragment: C.fun([C.opt(C.Str), C.opt(C.Bool)], C.Str, {}),
        stop: C.fun([], C.Undefined, {}),
        route: C.fun([C.Str, C.Fun], C.Num, {}),
        checkUrl: C.fun([C.opt(C.Any)], C.Undefined, {}),
        loadUrl: C.fun([C.Str], C.Bool, {}),
        navigate: C.fun([C.Str, C.opt(C.Any)], C.Bool, {}),
        started: C.Bool,
        _updateHash: C.fun([C.Any, C.Str, C.Bool], C.Undefined, {})
    }, {}, "History"), Events);
    History_class = C.object({}, {
        "class": History
    });
    View = C.extend(C.object({
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
        render: C.fun([], C.Self, {}),
        remove: C.fun([], C.Self, {}),
        delegateEvents: C.fun([C.opt(C.Any)], C.Any, {}),
        undelegateEvents: C.fun([], C.Any, {}),
        _ensureElement: C.fun([], C.Undefined, {}),
        setElement: C.overload_fun(C.fun([C.Any, C.opt(C.Bool)], C.Self, {}), C.fun([C.Any], C.Self, {}), C.fun([C.Any, C.opt(C.Bool)], C.Self, {})),
        $: C.overload_fun(C.fun([C.Any], C.Any, {}), C.fun([C.Str], C.Any, {})),
        make: C.overload_fun(C.fun([C.Any, C.opt(C.Any), C.opt(C.Any)], C.Any, {}), C.fun([C.Str, C.opt(C.Any), C.opt(C.Any)], C.Self, {}))
    }, {}, "View"), Events);
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
        "forgiving": true
    }, "Backbone");


    exports = C.guard(Backbone, backbone, "backbone");
    C.setExported(exports, 'backbone');
    return exports;
});