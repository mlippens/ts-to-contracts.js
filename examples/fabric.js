define(["require", "exports", "contracts-js", "fabric"], function(require, exports) {
    var C = require("contracts-js");
    var Fun, Arr, RegExp, fabric, _fabric, createCanvasForNode, getCSSRules, getGradientDefs, loadSVGFromString, loadSVGFromURL, log, parseAttributes, parseElements, parsePointsAttribute, parseStyleAttribute, parseSVGDocument, parseTransformAttribute, warn, isLikelyNode, isTouchSupported, IObservable, IFilter, IEventList, IObjectOptions, ITextOptions, ICircleOptions, IPoint, IRect, IText, ITriangle, IEllipse, IGradient, IColor, IElement, IObject, IGroup, ILine, IIntersection, IImage, ICircle, IPath, IPolygon, IPolyline, IPathGroup, IStaticCanvas, ICanvas, IBrightnessFilter, IInvertFilter, IRemoveWhiteFilter, IGrayscaleFilter, ISepiaFilter, ISepia2Filter, INoiseFilter, IGradientTransparencyFilter, IPixelateFilter, IConvoluteFilter, ICanvasOptions, IRectOptions, ITriangleOptions, Rect, Triangle, Canvas, StaticCanvas, Circle, Group, Line, Intersection, Path, PathGroup, Point, Object, Polygon, Polyline, Text, Image, util, __fabric;
    fabric = require("fabric"); // Type definitions for FabricJS
    // Project: http://fabricjs.com/
    // Definitions by: Oliver Klemencic <https://github.com/oklemencic/>
    // DefinitelyTyped: https://github.com/borisyankov/DefinitelyTyped

    /* 
 USAGE
 ///<reference path="fabricjs.d.ts"/>
 */
    var Dummy = C.check(function() {return true}, "Dummy");
    ICanvas = Dummy;

    IEventList = C.object({}, {}, "IEventList");
    IObservable = C.object({
        fire: C.fun([C.Str], C.Any, {}),
        stopObserving: C.fun([C.Str, C.fun([], C.Any, {})], C.Any, {}),
        off: C.fun([], C.Any, {}),
        observe: C.overload_fun(C.fun([C.Str, C.fun([], C.Any, {})], C.Any, {}), C.fun([IEventList], C.Any, {})),
        on: C.overload_fun(C.fun([C.Str, C.fun([], C.Any, {})], C.Any, {}), C.fun([IEventList], C.Any, {}))
    }, {}, "IObservable");
    IFilter = C.overload_fun(C.fun([], C.Self, {}), C.fun([C.Any], C.Self, {}));

    IObjectOptions = C.object({
        angle: C.opt(C.Num),
        borderColor: C.opt(C.Str),
        borderOpacityWhenMoving: C.opt(C.Num),
        borderScaleFactor: C.opt(C.Num),
        cornerColor: C.opt(C.Str),
        cornersize: C.opt(C.Num),
        fill: C.opt(C.Str),
        fillRule: C.opt(C.Str),
        flipX: C.opt(C.Bool),
        flipY: C.opt(C.Bool),
        hasBorders: C.opt(C.Bool),
        hasControls: C.opt(C.Bool),
        hasRotatingPoint: C.opt(C.Bool),
        height: C.opt(C.Num),
        includeDefaultValues: C.opt(C.Bool),
        left: C.opt(C.Num),
        lockMovementX: C.opt(C.Bool),
        lockMovementY: C.opt(C.Bool),
        lockScalingX: C.opt(C.Bool),
        lockScalingY: C.opt(C.Bool),
        lockUniScaling: C.opt(C.Bool),
        lockRotation: C.opt(C.Bool),
        opacity: C.opt(C.Num),
        originX: C.opt(C.Str),
        originY: C.opt(C.Str),
        overlayFill: C.opt(C.Str),
        padding: C.opt(C.Num),
        perPixelTargetFind: C.opt(C.Bool),
        rotatingPointOffset: C.opt(C.Num),
        scaleX: C.opt(C.Num),
        scaleY: C.opt(C.Num),
        selectable: C.opt(C.Bool),
        stateProperties: C.opt(C.Arr(C.Any)),
        stroke: C.opt(C.Str),
        strokeDashArray: C.opt(C.Arr(C.Any)),
        strokeWidth: C.opt(C.Num),
        top: C.opt(C.Num),
        transformMatrix: C.opt(C.Arr(C.Any)),
        transparentCorners: C.opt(C.Bool),
        type: C.opt(C.Str),
        width: C.opt(C.Num)
    }, {}, "IObjectOptions");
    ITextOptions = C.extend(C.object({
        fontSize: C.opt(C.Num),
        fontWeight: C.opt(C.Any),
        fontFamily: C.opt(C.Str),
        textDecoration: C.opt(C.Str),
        textShadow: C.opt(C.Str),
        textAlign: C.opt(C.Str),
        fontStyle: C.opt(C.Str),
        lineHeight: C.opt(C.Num),
        strokeStyle: C.opt(C.Str),
        strokeWidth: C.opt(C.Num),
        backgroundColor: C.opt(C.Str),
        textBackgroundColor: C.opt(C.Str),
        path: C.opt(C.Str),
        type: C.opt(C.Str),
        useNative: C.opt(C.Bool)
    }, {}, "ITextOptions"), IObjectOptions);
    ICircleOptions = C.extend(C.object({
        radius: C.opt(C.Num)
    }, {}, "ICircleOptions"), IObjectOptions);
    IPoint = C.object({
        add: C.fun([C.Self], C.Self, {}),
        addEquals: C.fun([C.Self], C.Self, {}),
        distanceFrom: C.fun([C.Self], C.Any, {}),
        divide: C.fun([C.Num], C.Any, {}),
        divideEquals: C.fun([C.Num], C.Any, {}),
        eq: C.fun([C.Self], C.Any, {}),
        gt: C.fun([C.Self], C.Any, {}),
        gte: C.fun([C.Self], C.Any, {}),
        init: C.fun([], C.Any, {}),
        lerp: C.fun([C.Self], C.Any, {}),
        lt: C.fun([C.Self], C.Any, {}),
        lte: C.fun([C.Self], C.Any, {}),
        max: C.fun([C.Self], C.Any, {}),
        min: C.fun([C.Self], C.Any, {}),
        multiply: C.fun([], C.Any, {}),
        multiplyEquals: C.fun([], C.Any, {}),
        scalarAdd: C.fun([], C.Self, {}),
        scalarAddEquals: C.fun([C.Num, C.Self], C.Any, {}),
        scalarSubtract: C.fun([C.Num], C.Any, {}),
        scalarSubtractEquals: C.fun([], C.Any, {}),
        setFromPoint: C.fun([C.Self], C.Any, {}),
        setXY: C.fun([], C.Any, {}),
        subtract: C.fun([C.Self], C.Self, {}),
        subtractEquals: C.fun([C.Self], C.Self, {}),
        swap: C.fun([C.Self], C.Any, {}),
        tostring: C.fun([], C.Str, {})
    }, {}, "IPoint");
    IObject = C.extend(C.object({
        lockMovementX: C.Bool,
        lockMovementY: C.Bool,
        lockScalingX: C.Bool,
        lockScalingY: C.Bool,
        lockScaling: C.Bool,
        lockUniScaling: C.Bool,
        lockRotation: C.Bool,
        getCurrentWidth: C.fun([], C.Num, {}),
        getCurrentHeight: C.fun([], C.Num, {}),
        originX: C.Str,
        originY: C.Str,
        angle: C.Num,
        getAngle: C.fun([], C.Num, {}),
        setAngle: C.fun([C.Num], C.Self, {}),
        borderColor: C.Str,
        getBorderColor: C.fun([], C.Str, {}),
        setBorderColor: C.fun([C.Str], C.Self, {}),
        borderOpacityWhenMoving: C.Num,
        borderScaleFactor: C.Num,
        getBorderScaleFactor: C.fun([], C.Num, {}),
        cornerColor: C.Str,
        cornersize: C.Num,
        getCornersize: C.fun([], C.Num, {}),
        setCornersize: C.fun([C.Num], C.Self, {}),
        fill: C.Str,
        getFill: C.fun([], C.Str, {}),
        setFill: C.fun([C.Str], C.Self, {}),
        fillRule: C.Str,
        getFillRule: C.fun([], C.Str, {}),
        setFillRule: C.fun([C.Str], C.Self, {}),
        flipX: C.Bool,
        getFlipX: C.fun([], C.Bool, {}),
        setFlipX: C.fun([C.Bool], C.Self, {}),
        flipY: C.Bool,
        getFlipY: C.fun([], C.Bool, {}),
        setFlipY: C.fun([C.Bool], C.Self, {}),
        hasBorders: C.Bool,
        hasControls: C.Bool,
        hasRotatingPoint: C.Bool,
        height: C.Num,
        getHeight: C.fun([], C.Num, {}),
        setHeight: C.fun([C.Num], C.Self, {}),
        includeDefaultValues: C.Bool,
        left: C.Num,
        getLeft: C.fun([], C.Num, {}),
        setLeft: C.fun([C.Num], C.Self, {}),
        opacity: C.Num,
        getOpacity: C.fun([], C.Num, {}),
        setOpacity: C.fun([C.Num], C.Self, {}),
        overlayFill: C.Str,
        getOverlayFill: C.fun([], C.Str, {}),
        setOverlayFill: C.fun([C.Str], C.Self, {}),
        padding: C.Num,
        perPixelTargetFind: C.Bool,
        rotatingPointOffset: C.Num,
        scaleX: C.Num,
        getScaleX: C.fun([], C.Num, {}),
        setScaleX: C.fun([C.Num], C.Self, {}),
        scaleY: C.Num,
        getScaleY: C.fun([], C.Num, {}),
        setScaleY: C.fun([C.Num], C.Self, {}),
        selectable: C.Bool,
        stateProperties: C.Arr(C.Any),
        stroke: C.Str,
        strokeDashArray: C.Arr(C.Any),
        strokeWidth: C.Num,
        top: C.Num,
        getTop: C.fun([], C.Num, {}),
        setTop: C.fun([C.Num], C.Self, {}),
        transformMatrix: C.Arr(C.Any),
        transparentCorners: C.Bool,
        type: C.Str,
        width: C.Num,
        getWidth: C.fun([], C.Num, {}),
        setWidth: C.fun([C.Num], C.Self, {}),
        bringForward: C.fun([], C.Self, {}),
        bringToFront: C.fun([], C.Self, {}),
        center: C.fun([], C.Self, {}),
        centerH: C.fun([], C.Self, {}),
        centerV: C.fun([], C.Self, {}),
        clone: C.fun([C.opt(C.Any), C.opt(C.Any)], C.Self, {}),
        cloneAsImage: C.fun([], C.Self, {}),
        complexity: C.fun([], C.Num, {}),
        drawBorders: C.fun([C.Any], C.Self, {}),
        drawCorners: C.fun([C.Any], C.Self, {}),
        get: C.fun([C.Str], C.Any, {}),
        getBoundingRectHeight: C.fun([], C.Num, {}),
        getBoundingRectWidth: C.fun([], C.Num, {}),
        getSvgStyles: C.fun([], C.Str, {}),
        getSvgTransform: C.fun([], C.Str, {}),
        hasStateChanged: C.fun([], C.Bool, {}),
        initialize: C.fun([C.Any], C.Any, {}),
        intersectsWithObject: C.fun([C.Self], C.Bool, {}),
        intersectsWithRect: C.fun([C.Any, C.Any], C.Bool, {}),
        isActive: C.fun([], C.Bool, {}),
        isContainedWithinObject: C.fun([C.Self], C.Bool, {}),
        isContainedWithinRect: C.fun([C.Any, C.Any], C.Bool, {}),
        isType: C.fun([C.Str], C.Bool, {}),
        remove: C.fun([], C.Self, {}),
        render: C.fun([C.Any, C.Bool], C.Any, {}),
        rotate: C.fun([C.Num], C.Self, {}),
        saveState: C.fun([], C.Self, {}),
        scale: C.fun([C.Num], C.Self, {}),
        scaleToHeight: C.fun([C.Num], C.Self, {}),
        scaleToWidth: C.fun([C.Num], C.Self, {}),
        sendBackwards: C.fun([], C.Self, {}),
        sendToBack: C.fun([], C.Self, {}),
        setActive: C.fun([C.Bool], C.Self, {}),
        setCoords: C.fun([], C.Any, {}),
        setGradientFill: C.fun([], C.Any, {}),
        setOptions: C.fun([C.Any], C.Any, {}),
        setSourcePath: C.fun([C.Str], C.Self, {}),
        toDatalessObject: C.fun([], C.Any, {}),
        toDataURL: C.fun([], C.Str, {}),
        toggle: C.fun([], C.Self, {}),
        toGrayscale: C.fun([], C.Self, {}),
        toJSON: C.fun([], C.Str, {}),
        toObject: C.fun([], C.Any, {}),
        tostring: C.fun([], C.Str, {}),
        transform: C.fun([C.Any], C.Any, {}),
        set: C.overload_fun(C.fun([C.Str, C.Any], C.Self, {}), C.fun([IObjectOptions], C.Self, {}))
    }, {}, "IObject"), IObservable);
    IRect = C.extend(C.object({
        x: C.Num,
        y: C.Num,
        rx: C.Num,
        ry: C.Num,
        complexity: C.fun([], C.Num, {}),
        toObject: C.fun([C.Arr(C.Any)], C.Any, {}),
        toSVG: C.fun([], C.Str, {}),
        initialize: C.overload_fun(C.fun([C.Arr(C.Num), C.Any], C.Self, {}), C.fun([C.Any], C.Any, {}))
    }, {}, "IRect"), IObject);
    IText = C.extend(C.object({
        fontSize: C.Num,
        fontWeight: C.Any,
        fontFamily: C.Str,
        text: C.Str,
        textDecoration: C.Str,
        textShadow: C.opt(C.Str),
        textAlign: C.Str,
        fontStyle: C.Str,
        lineHeight: C.Num,
        strokeStyle: C.Str,
        strokeWidth: C.Num,
        backgroundColor: C.Str,
        textBackgroundColor: C.Str,
        path: C.opt(C.Str),
        type: C.Str,
        useNative: C.Bool,
        toString: C.fun([], C.Str, {}),
        render: C.fun([C.Any, C.Bool], C.Any, {}),
        toObject: C.fun([C.Arr(C.Any)], IObject, {}),
        toSVG: C.fun([], C.Str, {}),
        setColor: C.fun([C.Str], C.Self, {}),
        setFontsize: C.fun([C.Num], C.Self, {}),
        getText: C.fun([], C.Str, {}),
        setText: C.fun([C.Str], C.Self, {}),
        initialize: C.overload_fun(C.fun([C.Str, C.Any], C.Self, {}), C.fun([C.Any], C.Any, {}))
    }, {}, "IText"), IObject);
    ITriangle = C.extend(C.object({
        complexity: C.fun([], C.Num, {}),
        initialize: C.fun([C.Any], C.Self, {}),
        toSVG: C.fun([], C.Str, {})
    }, {}, "ITriangle"), IObject);
    IEllipse = C.object({
        initialize: C.fun([C.Any], C.Any, {}),
        toObject: C.fun([C.Arr(C.Any)], C.Any, {}),
        toSVG: C.fun([], C.Str, {}),
        render: C.fun([C.Any, C.Bool], C.Any, {}),
        complexity: C.fun([], C.Num, {})
    }, {}, "IEllipse");
    IGradient = C.object({
        initialize: C.fun([], C.Any, {}),
        toObject: C.fun([], C.Any, {}),
        toLiveGradient: C.fun([C.Any], C.Any, {})
    }, {}, "IGradient");
    IColor = C.object({
        getSource: C.fun([], C.Arr(C.Any), {}),
        setSource: C.fun([C.Arr(C.Any)], C.Any, {}),
        toRgb: C.fun([], C.Str, {}),
        toRgba: C.fun([], C.Str, {}),
        toHex: C.fun([], C.Str, {}),
        getAlpha: C.fun([], C.Num, {}),
        setAlpha: C.fun([C.Num], C.Self, {}),
        toGrayscale: C.fun([], C.Self, {}),
        toBlackWhite: C.fun([], C.Self, {}),
        overlayWith: C.overload_fun(C.fun([C.Self], C.Self, {}), C.fun([C.Str], C.Self, {}))
    }, {}, "IColor");
    IElement = C.object({}, {}, "IElement");


    IGroup = C.extend(C.object({
        type: C.Str,
        activateAllObjects: C.fun([], C.Self, {}),
        add: C.fun([], C.Self, {}),
        addWithUpdate: C.fun([], C.Self, {}),
        complexity: C.fun([], C.Num, {}),
        contains: C.fun([], C.Bool, {}),
        containsPoint: C.fun([], C.Bool, {}),
        destroy: C.fun([], C.Self, {}),
        getObjects: C.fun([], C.Arr(IObject), {}),
        hasMoved: C.fun([], C.Bool, {}),
        item: C.fun([], IObject, {}),
        remove: C.fun([C.opt(C.Any)], C.Self, {}),
        removeWithUpdate: C.fun([], C.Self, {}),
        render: C.fun([], C.Undefined, {}),
        saveCoords: C.fun([], C.Self, {}),
        setObjectsCoords: C.fun([], C.Self, {}),
        size: C.fun([], C.Num, {}),
        toGrayscale: C.fun([], C.Self, {}),
        toObject: C.fun([C.Arr(C.Any)], C.Any, {}),
        tostring: C.fun([], C.Str, {}),
        toSVG: C.fun([], C.Str, {}),
        initialize: C.overload_fun(C.fun([], C.Any, {}), C.fun([C.Any], C.Any, {}))
    }, {}, "IGroup"), IObject);
    ILine = C.extend(C.object({
        x1: C.Num,
        x2: C.Num,
        y1: C.Num,
        y2: C.Num,
        complexity: C.fun([], C.Num, {}),
        toObject: C.fun([C.Arr(C.Any)], C.Any, {}),
        toSVG: C.fun([], C.Str, {}),
        initialize: C.overload_fun(C.fun([C.Arr(C.Num), C.Any], C.Self, {}), C.fun([C.Any], C.Any, {}))
    }, {}, "ILine"), IObject);
    IIntersection = C.object({
        appendPoint: C.fun([C.Str], C.Any, {}),
        appendPoints: C.fun([C.Str], C.Any, {}),
        init: C.fun([C.Str], C.Any, {})
    }, {}, "IIntersection");
    IImage = C.extend(C.object({
        filters: C.Any,
        applyFilters: C.fun([], C.Any, {}),
        complexity: C.fun([], C.Num, {}),
        getElement: C.fun([], C.Any, {}),
        getOriginalSize: C.fun([], C.Any, {}),
        getSrc: C.fun([], C.Str, {}),
        render: C.fun([C.Any, C.Bool], C.Any, {}),
        setElement: C.fun([], C.Self, {}),
        toObject: C.fun([], C.Any, {}),
        tostring: C.fun([], C.Str, {}),
        toSVG: C.fun([], C.Str, {}),
        clone: C.overload_fun(C.fun([], C.Any, {}), C.fun([C.opt(C.Any), C.opt(C.Any)], IObject, {})),
        initialize: C.overload_fun(C.fun([C.Str, C.Any], C.Any, {}), C.fun([C.Any, C.Any], C.Any, {}), C.fun([C.Any], C.Any, {}))
    }, {}, "IImage"), IObject);
    ICircle = C.extend(C.object({
        complexity: C.fun([], C.Num, {}),
        getRadiusX: C.fun([], C.Num, {}),
        getRadiusY: C.fun([], C.Num, {}),
        initialize: C.fun([ICircleOptions], C.Self, {}),
        setRadius: C.fun([C.Num], C.Num, {}),
        toObject: C.fun([], C.Any, {}),
        toSVG: C.fun([], C.Str, {})
    }, {}, "ICircle"), IObject);
    IPath = C.extend(C.object({
        complexity: C.fun([], C.Num, {}),
        render: C.fun([C.Any, C.Bool], C.Any, {}),
        toDatalessObject: C.fun([], C.Any, {}),
        toObject: C.fun([], C.Any, {}),
        tostring: C.fun([], C.Str, {}),
        toSVG: C.fun([], C.Str, {}),
        initialize: C.overload_fun(C.fun([], C.Any, {}), C.fun([C.Any], C.Any, {}))
    }, {}, "IPath"), IObject);
    IPolygon = C.extend(C.object({
        complexity: C.fun([], C.Num, {}),
        toObject: C.fun([], C.Any, {}),
        toSVG: C.fun([], C.Str, {}),
        initialize: C.overload_fun(C.fun([], C.Any, {}), C.fun([C.Any], C.Any, {}))
    }, {}, "IPolygon"), IObject);
    IPolyline = C.extend(C.object({
        complexity: C.fun([], C.Num, {}),
        toObject: C.fun([], C.Any, {}),
        toSVG: C.fun([], C.Str, {}),
        initialize: C.overload_fun(C.fun([], C.Any, {}), C.fun([C.Any], C.Any, {}))
    }, {}, "IPolyline"), IObject);
    IPathGroup = C.extend(C.object({
        complexity: C.fun([], C.Num, {}),
        isSameColor: C.fun([], C.Bool, {}),
        render: C.fun([C.Any], C.Any, {}),
        toDatalessObject: C.fun([], C.Any, {}),
        toGrayscale: C.fun([], C.Self, {}),
        toObject: C.fun([], C.Any, {}),
        tostring: C.fun([], C.Str, {}),
        toSVG: C.fun([], C.Str, {}),
        initialize: C.overload_fun(C.fun([], C.Any, {}), C.fun([C.Any], C.Any, {}))
    }, {}, "IPathGroup"), IObject);
    IStaticCanvas = C.extend(C.object({
        backgroundColor: C.Str,
        backgroundImage: C.Str,
        backgroundImageOpacity: C.Num,
        backgroundImageStretch: C.Num,
        clipTo: C.fun([C.fun([C.Any], C.Undefined, {})], C.Any, {}),
        controlsAboveOverlay: C.Bool,
        includeDefaultValues: C.Bool,
        overlayImage: C.Str,
        overlayImageLeft: C.Num,
        overlayImageTop: C.Num,
        renderOnAddition: C.Bool,
        stateful: C.Bool,
        EMPTY_JSON: C.Str,
        supports: C.fun([C.Str], C.Bool, {}),
        add: C.fun([], ICanvas, {
            "rest": IObject
        }),
        bringForward: C.fun([IObject], ICanvas, {}),
        calcOffset: C.fun([], ICanvas, {}),
        centerObject: C.fun([IObject], ICanvas, {}),
        centerObjectH: C.fun([IObject], ICanvas, {}),
        centerObjectV: C.fun([IObject], ICanvas, {}),
        clear: C.fun([], ICanvas, {}),
        clearContext: C.fun([C.Any], ICanvas, {}),
        complexity: C.fun([], C.Num, {}),
        dispose: C.fun([], ICanvas, {}),
        drawControls: C.fun([], C.Any, {}),
        forEachObject: C.fun([C.fun([IObject], C.Undefined, {}), C.opt(C.Any)], ICanvas, {}),
        getActiveGroup: C.fun([], IGroup, {}),
        getActiveObject: C.fun([], IObject, {}),
        getCenter: C.fun([], IObject, {}),
        getContext: C.fun([], C.Any, {}),
        getElement: C.fun([], C.Any, {}),
        getHeight: C.fun([], C.Num, {}),
        getObjects: C.fun([], C.Arr(IObject), {}),
        getWidth: C.fun([], C.Num, {}),
        insertAt: C.fun([IObject, C.Num, C.Bool], ICanvas, {}),
        isEmpty: C.fun([], C.Bool, {}),
        item: C.fun([C.Num], IObject, {}),
        onBeforeScaleRotate: C.fun([IObject], C.Any, {}),
        remove: C.fun([IObject], IObject, {}),
        renderAll: C.fun([C.opt(C.Bool)], ICanvas, {}),
        renderTop: C.fun([], ICanvas, {}),
        sendBackwards: C.fun([IObject], ICanvas, {}),
        sendToBack: C.fun([IObject], ICanvas, {}),
        setBackgroundImage: C.fun([IObject], ICanvas, {}),
        setDimensions: C.fun([C.object({
            width: C.Num,
            height: C.Num
        }, {})], ICanvas, {}),
        setHeight: C.fun([C.Num], ICanvas, {}),
        setOverlayImage: C.fun([C.Str, C.fun([], C.Any, {})], ICanvas, {}),
        setWidth: C.fun([C.Num], ICanvas, {}),
        toDatalessJSON: C.fun([C.opt(C.Arr(C.Any))], C.Str, {}),
        toDatalessObject: C.fun([C.opt(C.Arr(C.Any))], C.Str, {}),
        toDataURL: C.fun([C.Str, C.opt(C.Num)], C.Str, {}),
        toDataURLWithMultiplier: C.fun([C.Arr(C.Any)], C.Str, {}),
        toGrayscale: C.fun([C.Arr(C.Any)], C.Str, {}),
        toJSON: C.fun([C.Arr(C.Any)], C.Str, {}),
        toObject: C.fun([C.Arr(C.Any)], C.Str, {}),
        tostring: C.fun([], C.Str, {}),
        toSVG: C.fun([], C.Str, {})
    }, {}, "IStaticCanvas"), IObservable);



    ICanvas = C.extend(C.object({
        _objects: C.Arr(IObject),
        containerClass: C.Str,
        defaultCursor: C.Str,
        freeDrawingColor: C.Str,
        freeDrawingLineWidth: C.Num,
        hoverCursor: C.Str,
        interactive: C.Bool,
        moveCursor: C.Str,
        perPixelTargetFind: C.Bool,
        rotationCursor: C.Str,
        selection: C.Bool,
        selectionBorderColor: C.Str,
        selectionColor: C.Str,
        selectionDashArray: C.Arr(C.Num),
        selectionLineWidth: C.Num,
        targetFindTolerance: C.Num,
        containsPoint: C.fun([C.Any, IObject], C.Bool, {}),
        deactivateAll: C.fun([], C.Self, {}),
        deactivateAllWithDispatch: C.fun([], C.Self, {}),
        discardActiveGroup: C.fun([], C.Self, {}),
        discardActiveObject: C.fun([], C.Self, {}),
        drawDashedLine: C.fun([C.Any, C.Num, C.Num, C.Num, C.Num, C.Arr(C.Num)], C.Self, {}),
        findTarget: C.fun([C.Any, C.Bool], C.Self, {}),
        getActiveGroup: C.fun([], IGroup, {}),
        getActiveObject: C.fun([], IObject, {}),
        getPointer: C.fun([], C.Any, {}),
        getSelectionContext: C.fun([], C.Any, {}),
        getSelectionElement: C.fun([], C.Any, {}),
        setActiveGroup: C.fun([IGroup], C.Self, {}),
        setActiveObject: C.fun([IObject, C.opt(C.Any)], C.Self, {}),
        loadFromJSON: C.fun([C.fun([], C.Undefined, {})], C.Undefined, {}),
        loadFromDatalessJSON: C.fun([C.fun([], C.Undefined, {})], C.Undefined, {})
    }, {}, "ICanvas"), IStaticCanvas);

    IBrightnessFilter = C.object({}, {}, "IBrightnessFilter");
    IInvertFilter = C.object({}, {}, "IInvertFilter");
    IRemoveWhiteFilter = C.object({}, {}, "IRemoveWhiteFilter");
    IGrayscaleFilter = C.object({}, {}, "IGrayscaleFilter");
    ISepiaFilter = C.object({}, {}, "ISepiaFilter");
    ISepia2Filter = C.object({}, {}, "ISepia2Filter");
    INoiseFilter = C.object({}, {}, "INoiseFilter");
    IGradientTransparencyFilter = C.object({}, {}, "IGradientTransparencyFilter");
    IPixelateFilter = C.object({}, {}, "IPixelateFilter");
    IConvoluteFilter = C.object({}, {}, "IConvoluteFilter");
    ICanvasOptions = C.object({
        containerClass: C.opt(C.Str),
        defaultCursor: C.opt(C.Str),
        freeDrawingColor: C.opt(C.Str),
        freeDrawingLineWidth: C.opt(C.Num),
        hoverCursor: C.opt(C.Str),
        interactive: C.opt(C.Bool),
        moveCursor: C.opt(C.Str),
        perPixelTargetFind: C.opt(C.Bool),
        rotationCursor: C.opt(C.Str),
        selection: C.opt(C.Bool),
        selectionBorderColor: C.opt(C.Str),
        selectionColor: C.opt(C.Str),
        selectionDashArray: C.opt(C.Arr(C.Num)),
        selectionLineWidth: C.opt(C.Num),
        targetFindTolerance: C.opt(C.Num),
        backgroundColor: C.opt(C.Str),
        backgroundImage: C.opt(C.Str),
        backgroundImageOpacity: C.opt(C.Num),
        backgroundImageStretch: C.opt(C.Num),
        controlsAboveOverlay: C.opt(C.Bool),
        includeDefaultValues: C.opt(C.Bool),
        overlayImage: C.opt(C.Str),
        overlayImageLeft: C.opt(C.Num),
        overlayImageTop: C.opt(C.Num),
        renderOnAddition: C.opt(C.Bool),
        stateful: C.opt(C.Bool)
    }, {}, "ICanvasOptions");
    IRectOptions = C.extend(C.object({
        x: C.opt(C.Num),
        y: C.opt(C.Num),
        rx: C.opt(C.Num),
        ry: C.opt(C.Num)
    }, {}, "IRectOptions"), IObjectOptions);
    ITriangleOptions = C.extend(C.object({}, {}, "ITriangleOptions"), IObjectOptions);
    __fabric = C.object({
        createCanvasForNode: C.fun([C.Num, C.Num], ICanvas, {}),
        getCSSRules: C.fun([C.Any], C.Any, {}),
        getGradientDefs: C.fun([C.Any], C.Any, {}),
        loadSVGFromString: C.fun([C.Str, C.fun([C.Arr(IObject)], C.Undefined, {}), C.opt(C.fun([], C.Undefined, {}))], C.Any, {}),
        loadSVGFromURL: C.fun([C.fun([C.Arr(IObject)], C.Undefined, {}), C.opt(C.fun([], C.Undefined, {}))], C.Any, {}),
        log: C.fun([], C.Any, {}),
        parseAttributes: C.fun([C.Arr(C.Any)], C.Any, {}),
        parseElements: C.fun([C.Arr(C.Any)], C.Any, {}),
        parsePointsAttribute: C.fun([C.Str], C.Arr(C.Any), {}),
        parseStyleAttribute: C.fun([C.Any], C.Any, {}),
        parseSVGDocument: C.fun([C.Any, C.fun([], C.Undefined, {}), C.opt(C.fun([], C.Undefined, {}))], C.Any, {}),
        parseTransformAttribute: C.fun([C.Str], C.Any, {}),
        warn: C.fun([], C.Any, {}),
        isLikelyNode: C.Bool,
        isTouchSupported: C.Bool,
        Rect: C.object({
            fromElement: C.fun([C.Any, IRectOptions], IRect, {}),
            fromObject: C.fun([], IRect, {}),
            prototype: C.Any
        }, {}),
        Triangle: C.fun([C.opt(ITriangleOptions)], ITriangle, {}),
        Canvas: C.object({
            EMPTY_JSON: C.Str,
            supports: C.fun([C.Str], C.Bool, {}),
            prototype: C.Any
        }, {}),
        StaticCanvas: C.object({
            EMPTY_JSON: C.Str,
            supports: C.fun([C.Str], C.Bool, {}),
            prototype: C.Any
        }, {}),
        Circle: C.object({
            ATTRIBUTE_NAMES: C.Arr(C.Str),
            fromElement: C.fun([C.Any, ICircleOptions], ICircle, {}),
            fromObject: C.fun([], ICircle, {}),
            prototype: C.Any
        }, {}),
        Group: C.fun([C.opt(C.Arr(C.Any)), C.opt(IObjectOptions)], IGroup, {}),
        Line: C.object({
            ATTRIBUTE_NAMES: C.Arr(C.Str),
            fromElement: C.fun([C.Any], ILine, {}),
            fromObject: C.fun([], ILine, {}),
            prototype: C.Any
        }, {}),
        Intersection: C.object({
            intersectLineLine: C.fun([], C.Any, {}),
            intersectLinePolygon: C.fun([], C.Any, {}),
            intersectPolygonPolygon: C.fun([], C.Any, {}),
            intersectPolygonRectangle: C.fun([], C.Any, {})
        }, {}),
        Path: C.object({
            fromElement: C.fun([C.Any], IPath, {}),
            fromObject: C.fun([], IPath, {})
        }, {}),
        PathGroup: C.object({
            fromObject: C.fun([], IPathGroup, {}),
            prototype: C.Any
        }, {}),
        Point: C.object({
            prototype: C.Any
        }, {}),
        Object: C.object({
            prototype: C.Any
        }, {}),
        Polygon: C.object({
            fromObject: C.fun([], IPolygon, {}),
            fromElement: C.fun([C.Any], IPolygon, {}),
            prototype: C.Any
        }, {}),
        Polyline: C.object({
            fromObject: C.fun([], IPolyline, {}),
            fromElement: C.fun([C.Any], IPolyline, {}),
            prototype: C.Any
        }, {}),
        Text: C.fun([C.Str, C.opt(ITextOptions)], IText, {}),
        Image: C.object({
            prototype: C.Any,
            filters: C.object({
                Grayscale: C.fun([], IGrayscaleFilter, {}),
                Brightness: C.fun([C.opt(C.object({
                    brightness: C.Num
                }, {}))], IBrightnessFilter, {}),
                RemoveWhite: C.object({}, {}),
                Invert: C.fun([], IInvertFilter, {}),
                Sepia: C.fun([], ISepiaFilter, {}),
                Sepia2: C.fun([], ISepia2Filter, {}),
                Noise: C.fun([C.opt(C.object({
                    noise: C.opt(C.Num)
                }, {}))], INoiseFilter, {}),
                GradientTransparency: C.fun([C.opt(C.object({
                    threshold: C.opt(C.Num)
                }, {}))], IGradientTransparencyFilter, {}),
                Pixelate: C.fun([C.opt(C.object({
                    color: C.opt(C.Any)
                }, {}))], IPixelateFilter, {}),
                Convolute: C.fun([C.opt(C.object({
                    matrix: C.Any
                }, {}))], IConvoluteFilter, {})
            }, {}),
            fromURL: C.overload_fun(C.fun([C.Str, C.fun([IImage], C.Any, {})], IImage, {}), C.fun([C.Str, C.fun([IImage], C.Any, {}), IObjectOptions], IImage, {}), C.fun([C.Str], IImage, {}))
        }, {}),
        util: C.object({
            addClass: C.fun([C.Any, C.Str], C.Any, {}),
            addListener: C.fun([C.Str], C.Any, {}),
            animate: C.fun([C.object({
                onChange: C.opt(C.fun([C.Num], C.Undefined, {})),
                onComplete: C.opt(C.fun([], C.Undefined, {})),
                startValue: C.opt(C.Num),
                endValue: C.opt(C.Num),
                byValue: C.opt(C.Num),
                easing: C.opt(C.fun([], C.Num, {})),
                duration: C.opt(C.Num)
            }, {})], C.Any, {}),
            createClass: C.fun([], C.Any, {}),
            degreesToRadians: C.fun([C.Num], C.Num, {}),
            falseFunction: C.fun([], C.Bool, {}),
            getElementOffset: C.fun([], C.Any, {}),
            getPointer: C.fun([C.Any], C.Any, {}),
            getRandomInt: C.fun([C.Num, C.Num], C.Any, {}),
            getScript: C.fun([C.Str], C.Any, {}),
            groupSVGElements: C.fun([C.Arr(C.Any), C.opt(C.Str)], C.Any, {}),
            loadImage: C.fun([], C.Any, {}),
            makeElement: C.fun([C.Str], C.Any, {}),
            makeElementSelectable: C.fun([C.Any], C.Any, {}),
            makeElementUnselectable: C.fun([C.Any], C.Any, {}),
            populateWithProperties: C.fun([], C.Arr(C.Any), {}),
            radiansToDegrees: C.fun([C.Num], C.Num, {}),
            removeFromArray: C.fun([C.Arr(C.Any)], C.Any, {}),
            removeListener: C.fun([C.Any], C.Any, {}),
            request: C.fun([], C.Any, {}),
            requestAnimFrame: C.fun([], C.Any, {}),
            setStyle: C.fun([C.Any], C.Any, {}),
            toArray: C.fun([], C.Arr(C.Any), {}),
            toFixed: C.fun([], C.Any, {}),
            wrapElement: C.fun([C.Any], C.Any, {}),
            getById: C.overload_fun(C.fun([C.Str], C.Any, {}), C.fun([C.Any], C.Any, {}))
        }, {})
    }, {
        "forgiving": true
    }, "fabric");

    exports = C.guard(__fabric, fabric, "fabric");
    C.setExported(exports, 'fabric');
    return exports;
});