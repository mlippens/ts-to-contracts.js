(function(root) {
    var C = window["contracts-js"];
    var Fun, Arr, RegExp, kineticjs, Kinetic, Node, INode, Container, IContainer, Stage, IStage, Layer, ILayer, ICanvas, Shape, IShape, Rect, IRect, Circle, ICircle, Ellipse, IEllipse, Group, IGroup, Collection, ICollection, Image, IImage, Line, ILine, Path, IPath, Polygon, IPolygon, RegularPolygon, IRegularPolygon, Sprite, ISprite, Star, IStar, Text, IText, TextPath, ITextPath, Transition, ITransition, Animation, IAnimation, CropConfig, StageConfig, LayerConfig, RectConfig, CircleConfig, ImageConfig, SpriteConfig, TextConfig, LineConfig, PolygonConfig, RegularPolygonConfig, PathConfig, StarConfig, CustomConfig, DrawOptionsConfig, Vector2d, ObjectOptionsConfig, ISize;
    kineticjs = window["kineticjs"];
    // Type definitions for KineticJS
    // Project: http://kineticjs.com/
    // Definitions by: Basarat Ali Syed <http://www.github.com/basarat>, Ralph de Ruijter <http://www.superdopey.nl/techblog/>
    // Definitions: https://github.com/borisyankov/DefinitelyTyped
    var Dummy = check(function(e) {return true}, "Dummy");
    IStage = Dummy;
    IContainer = Dummy;
    Vector2d = C.object({
        x: C.Num,
        y: C.Num
    }, {}, "Vector2d");
    ISize = C.object({
        width: C.Num,
        height: C.Num
    }, {}, "ISize");


    INode = C.object({
        cache: C.fun([C.opt(C.Any)], C.Self, {}),
        clone: C.fun([C.Any], C.Self, {}),
        destroy: C.fun([], C.Undefined, {}),
        draw: C.fun([], C.Self, {}),
        drawBuffer: C.fun([], C.Any, {}),
        drawScene: C.fun([], C.Any, {}),
        getAbsoluteOpacity: C.fun([], C.Num, {}),
        getAbsolutePosition: C.fun([], Vector2d, {}),
        getAbsoluteTransform: C.fun([], C.Any, {}),
        getAbsoluteZIndex: C.fun([], C.Num, {}),
        getAttrs: C.fun([], C.Any, {}),
        getDragBounds: C.fun([], C.Any, {}),
        getDragConstraint: C.fun([], C.Any, {}),
        getDraggable: C.fun([], C.Bool, {}),
        getLayer: C.fun([], C.Any, {}),
        getLevel: C.fun([], C.Num, {}),
        getListening: C.fun([], C.Any, {}),
        getName: C.fun([], C.Str, {}),
        getOffset: C.fun([], Vector2d, {}),
        getOpacity: C.fun([], C.Num, {}),
        getParent: C.fun([], C.Any, {}),
        getPosition: C.fun([], Vector2d, {}),
        getRotation: C.fun([], C.Num, {}),
        getRotationDeg: C.fun([], C.Num, {}),
        getScale: C.fun([], Vector2d, {}),
        getScaleX: C.fun([], C.Num, {}),
        getScaleY: C.fun([], C.Num, {}),
        getSize: C.fun([], ISize, {}),
        getStage: C.fun([], IStage, {}),
        getTransform: C.fun([], C.Any, {}),
        getZIndex: C.fun([], C.Num, {}),
        hide: C.fun([], C.Undefined, {}),
        isDraggable: C.fun([], C.Bool, {}),
        isDragging: C.fun([], C.Bool, {}),
        isListening: C.fun([], C.Bool, {}),
        move: C.fun([C.object({
            x: C.Num,
            y: C.Num
        }, {})], C.Undefined, {}),
        moveDown: C.fun([], C.Undefined, {}),
        moveTo: C.fun([IContainer], C.Undefined, {}),
        moveToBottom: C.fun([], C.Undefined, {}),
        moveToTop: C.fun([], C.Undefined, {}),
        moveUp: C.fun([], C.Undefined, {}),
        remove: C.fun([], C.Any, {}),
        rotate: C.fun([C.Num], C.Undefined, {}),
        rotateDeg: C.fun([C.Num], C.Undefined, {}),
        on: C.fun([C.Str, C.fun([C.Any], C.Any, {})], C.Undefined, {}),
        off: C.fun([C.Str], C.Undefined, {}),
        fire: C.fun([C.Str, C.opt(C.Any), C.opt(C.Bool)], C.Any, {}),
        setAbsolutePosition: C.fun([Vector2d], C.Undefined, {}),
        setAttrs: C.fun([C.Any], C.Undefined, {}),
        setDefaultAttrs: C.fun([C.Any], C.Undefined, {}),
        setDragBounds: C.fun([C.Any], C.Undefined, {}),
        setDragConstraint: C.fun([C.Str], C.Undefined, {}),
        setDraggable: C.fun([C.Bool], C.Undefined, {}),
        setListening: C.fun([C.Bool], C.Undefined, {}),
        setOffset: C.fun([Vector2d], C.Any, {}),
        setOpacity: C.fun([C.Any], C.Undefined, {}),
        setPosition: C.fun([Vector2d], C.Undefined, {}),
        setRotation: C.fun([C.Num], C.Undefined, {}),
        setRotationDeg: C.fun([C.Num], C.Undefined, {}),
        setScale: C.fun([Vector2d], C.Undefined, {}),
        setScaleX: C.fun([C.Num], C.Undefined, {}),
        setScaleY: C.fun([C.Num], C.Undefined, {}),
        setSize: C.fun([ISize], C.Any, {}),
        setZIndex: C.fun([C.Num], C.Undefined, {}),
        show: C.fun([], C.Undefined, {}),
        simulate: C.fun([C.Str], C.Undefined, {}),
        toDataURL: C.fun([C.Any], C.Undefined, {}),
        transitionTo: C.fun([C.Any], C.Undefined, {}),
        getWidth: C.fun([], C.Any, {}),
        setWidth: C.fun([C.Num], C.Undefined, {}),
        getHeight: C.fun([], C.Any, {}),
        setHeight: C.fun([C.Num], C.Any, {}),
        getId: C.fun([], C.Str, {}),
        setId: C.fun([C.Str], C.Undefined, {}),
        getX: C.fun([], C.Num, {}),
        setX: C.fun([C.Num], C.Undefined, {}),
        getY: C.fun([], C.Num, {}),
        setY: C.fun([C.Num], C.Undefined, {}),
        name: C.overload_fun(C.fun([C.Str], C.Undefined, {}), C.fun([], C.Str, {})),
        width: C.overload_fun(C.fun([C.Num], C.Undefined, {}), C.fun([], C.Num, {})),
        height: C.overload_fun(C.fun([C.Num], C.Undefined, {}), C.fun([], C.Num, {})),
        id: C.overload_fun(C.fun([C.Str], C.Undefined, {}), C.fun([], C.Str, {})),
        x: C.overload_fun(C.fun([C.Num], C.Undefined, {}), C.fun([], C.Num, {})),
        y: C.overload_fun(C.fun([C.Num], C.Undefined, {}), C.fun([], C.Num, {}))
    }, {}, "INode");
    ICanvas = C.object({
        _canvas: C.Any,
        getPixelRatio: C.fun([], C.Num, {}),
        height: C.Num,
        setPixelRatio: C.fun([C.Num], C.Any, {}),
        width: C.Num
    }, {}, "ICanvas");

    IContainer = C.extend(C.object({
        add: C.fun([INode], C.Any, {}),
        clone: C.fun([C.Any], C.Self, {}),
        destroyChildren: C.fun([], C.Self, {}),
        find: C.fun([C.Str], C.Any, {}),
        get: C.fun([C.Any], C.Any, {}),
        getChildren: C.fun([], C.Arr(INode), {}),
        getIntersections: C.fun([C.Any], C.Any, {}),
        isAncestorOf: C.fun([C.Any], C.Any, {}),
        removeChildren: C.fun([], C.Any, {})
    }, {}, "IContainer"), INode);
    ILayer = C.extend(C.object({
        afterDraw: C.fun([C.fun([], C.Any, {})], C.Any, {}),
        beforeDraw: C.fun([C.fun([], C.Any, {})], C.Any, {}),
        clear: C.fun([], C.Any, {}),
        getCanvas: C.fun([], ICanvas, {}),
        getClearBeforeDraw: C.fun([], C.Any, {}),
        getContext: C.fun([], C.Any, {}),
        remove: C.fun([], C.Any, {}),
        setClearBeforeDraw: C.fun([C.Bool], C.Any, {}),
        toDataURL: C.fun([C.Any], C.Any, {})
    }, {}, "ILayer"), IContainer);
    IStage = C.extend(C.object({
        add: C.fun([ILayer], C.Any, {}),
        clear: C.fun([], C.Any, {}),
        getContainer: C.fun([], C.Any, {}),
        getContent: C.fun([], C.Any, {}),
        getDOM: C.fun([], C.Any, {}),
        getHeight: C.fun([], C.Num, {}),
        getIntersection: C.fun([C.Any], C.Any, {}),
        getMousePosition: C.fun([C.opt(C.Any)], C.Any, {}),
        getPointerPosition: C.fun([], Vector2d, {}),
        getStage: C.fun([], C.Self, {}),
        getTouchPosition: C.fun([C.opt(C.Any)], C.Any, {}),
        getUserPosition: C.fun([C.opt(C.Any)], C.Any, {}),
        getWidth: C.fun([], C.Num, {}),
        load: C.fun([C.Any], C.Any, {}),
        reset: C.fun([], C.Any, {}),
        setHeight: C.fun([C.Num], C.Any, {}),
        setWidth: C.fun([C.Num], C.Any, {}),
        toDataURL: C.fun([C.Any], C.Any, {}),
        toImage: C.fun([C.Any, C.fun([], C.Any, {})], C.Any, {}),
        toJSON: C.fun([], C.Any, {})
    }, {}, "IStage"), IContainer);

    CropConfig = C.object({
        x: C.Num,
        y: C.Num,
        width: C.Num,
        height: C.Num
    }, {}, "CropConfig");


    IShape = C.extend(C.object({
        applyLineJoin: C.fun([], C.Undefined, {}),
        drawImage: C.fun([], C.Undefined, {}),
        fill: C.fun([], C.Undefined, {}),
        fillText: C.fun([C.Str], C.Undefined, {}),
        getCanvas: C.fun([], ICanvas, {}),
        getContext: C.fun([], C.Any, {}),
        getDrawFunc: C.fun([], C.Any, {}),
        getFill: C.fun([], C.Str, {}),
        getLineJoin: C.fun([], C.Any, {}),
        getShadow: C.fun([], C.Any, {}),
        getStroke: C.fun([], C.Any, {}),
        getStrokeWidth: C.fun([], C.Num, {}),
        intersects: C.fun([C.Any], C.Bool, {}),
        setDrawFunc: C.fun([C.fun([], C.Any, {})], C.Any, {}),
        setFill: C.fun([C.Str], C.Any, {}),
        setLineJoin: C.fun([], C.Any, {}),
        setShadow: C.fun([C.Any], C.Any, {}),
        setSize: C.fun([ISize], C.Any, {}),
        setStroke: C.fun([C.Str], C.Any, {}),
        setStrokeWidth: C.fun([C.Num], C.Any, {}),
        stroke: C.fun([], C.Any, {}),
        strokeText: C.fun([C.Str], C.Any, {})
    }, {}, "IShape"), INode);
    IRect = C.extend(C.object({
        getCornerRadius: C.fun([], C.Num, {}),
        getHeight: C.fun([], C.Num, {}),
        getWidth: C.fun([], C.Num, {}),
        setCornerRadius: C.fun([C.Num], C.Any, {}),
        setHeight: C.fun([C.Num], C.Any, {}),
        setWidth: C.fun([C.Num], C.Any, {})
    }, {}, "IRect"), IShape);
    ICircle = C.extend(C.object({
        getRadius: C.fun([], C.Num, {}),
        setRadius: C.fun([C.Num], C.Any, {})
    }, {}, "ICircle"), IShape);
    IEllipse = C.extend(C.object({
        getRadius: C.fun([], C.Num, {}),
        setRadius: C.fun([C.Num], C.Any, {})
    }, {}, "IEllipse"), IShape);
    IGroup = C.extend(C.object({}, {}, "IGroup"), IContainer);
    ICollection = C.object({
        apply: C.fun([C.Fun, C.Any], C.Any, {}),
        each: C.fun([C.fun([], C.Any, {})], C.Any, {})
    }, {}, "ICollection");
    IImage = C.extend(C.object({
        applyFilter: C.fun([C.Any], C.Any, {}),
        clearImageBuffer: C.fun([], C.Any, {}),
        createImageBuffer: C.fun([C.fun([], C.Any, {})], C.Any, {}),
        getCrop: C.fun([], C.Any, {}),
        getFilter: C.fun([], C.Any, {}),
        getHeight: C.fun([], C.Num, {}),
        getImage: C.fun([], C.Self, {}),
        getWidth: C.fun([], C.Num, {}),
        setCrop: C.fun([CropConfig], C.Any, {}),
        setFilter: C.fun([C.Any], C.Any, {}),
        setHeight: C.fun([C.Num], C.Any, {}),
        setImage: C.fun([C.Self], C.Any, {}),
        setWidth: C.fun([C.Num], C.Any, {})
    }, {}, "IImage"), IShape);
    ILine = C.extend(C.object({
        getDashArray: C.fun([], C.Any, {}),
        getLineCap: C.fun([], C.Any, {}),
        getPoints: C.fun([], C.Any, {}),
        setDashArray: C.fun([C.Any], C.Any, {}),
        setLineCap: C.fun([C.Str], C.Any, {}),
        setPoints: C.fun([C.Arr(C.Any)], C.Any, {})
    }, {}, "ILine"), IShape);
    IPath = C.extend(C.object({
        getData: C.fun([], C.Str, {}),
        setData: C.fun([C.Str], C.Any, {})
    }, {}, "IPath"), IShape);
    IPolygon = C.extend(C.object({
        getPoints: C.fun([], C.Any, {}),
        setPoints: C.fun([C.Any], C.Any, {})
    }, {}, "IPolygon"), IShape);
    IRegularPolygon = C.extend(C.object({
        getRadius: C.fun([], C.Num, {}),
        getSides: C.fun([], C.Num, {}),
        setRadius: C.fun([C.Num], C.Any, {}),
        setSides: C.fun([C.Num], C.Any, {})
    }, {}, "IRegularPolygon"), IShape);
    ISprite = C.extend(C.object({
        afterFrame: C.fun([C.Num, C.fun([], C.Any, {})], C.Any, {}),
        getAnimation: C.fun([], C.Str, {}),
        getAnimations: C.fun([], C.Any, {}),
        getIndex: C.fun([], C.Num, {}),
        setAnimation: C.fun([C.Str], C.Any, {}),
        setAnimations: C.fun([C.Any], C.Any, {}),
        setIndex: C.fun([C.Num], C.Any, {}),
        start: C.fun([], C.Any, {}),
        stop: C.fun([], C.Any, {})
    }, {}, "ISprite"), IShape);
    IStar = C.extend(C.object({
        getInnerRadius: C.fun([], C.Num, {}),
        getNumPoints: C.fun([], C.Num, {}),
        getOuterRadius: C.fun([], C.Num, {}),
        setInnerRadius: C.fun([C.Num], C.Any, {}),
        setNumPoints: C.fun([C.Num], C.Any, {}),
        setOuterRadius: C.fun([C.Num], C.Any, {})
    }, {}, "IStar"), IShape);
    IText = C.extend(C.object({
        getAlign: C.fun([], C.Str, {}),
        getBoxHeight: C.fun([], C.Num, {}),
        getBoxWidth: C.fun([], C.Num, {}),
        getFontFamily: C.fun([], C.Str, {}),
        getFontSize: C.fun([], C.Num, {}),
        getFontStyle: C.fun([], C.Str, {}),
        getHeight: C.fun([], C.Num, {}),
        getLineHeight: C.fun([], C.Num, {}),
        getPadding: C.fun([], C.Num, {}),
        getShadow: C.fun([], C.Any, {}),
        getText: C.fun([], C.Str, {}),
        getTextFill: C.fun([], C.Any, {}),
        getTextHeight: C.fun([], C.Num, {}),
        getTextStroke: C.fun([], C.Any, {}),
        getTextStrokeWidth: C.fun([], C.Num, {}),
        getTextWidth: C.fun([], C.Num, {}),
        getWidth: C.fun([], C.Num, {}),
        setAlign: C.fun([C.Str], C.Any, {}),
        setFontFamily: C.fun([C.Str], C.Any, {}),
        setFontSize: C.fun([C.Num], C.Any, {}),
        setFontStroke: C.fun([C.Any], C.Any, {}),
        setFontStyle: C.fun([C.Str], C.Any, {}),
        setHeight: C.fun([C.Num], C.Any, {}),
        setLineHeight: C.fun([C.Num], C.Any, {}),
        setPadding: C.fun([C.Num], C.Any, {}),
        setShadow: C.fun([C.Any], C.Any, {}),
        setText: C.fun([C.Str], C.Any, {}),
        setTextFill: C.fun([C.Any], C.Any, {}),
        setTextStrokeWidth: C.fun([C.Num], C.Any, {}),
        setWidth: C.fun([C.Num], C.Any, {})
    }, {}, "IText"), IShape);
    ITextPath = C.extend(C.object({
        getFontFamily: C.fun([], C.Str, {}),
        getFontSize: C.fun([], C.Num, {}),
        getFontStyle: C.fun([], C.Str, {}),
        getText: C.fun([], C.Str, {}),
        getTextFill: C.fun([], C.Any, {}),
        getTextHeight: C.fun([], C.Num, {}),
        getTextStroke: C.fun([], C.Any, {}),
        getTextStrokeWidth: C.fun([], C.Num, {}),
        getTextWidth: C.fun([], C.Num, {}),
        setFontFamily: C.fun([C.Str], C.Any, {}),
        setFontSize: C.fun([C.Num], C.Any, {}),
        setFontStroke: C.fun([C.Any], C.Any, {}),
        setFontStyle: C.fun([C.Str], C.Any, {}),
        setText: C.fun([C.Str], C.Any, {}),
        setTextFill: C.fun([C.Any], C.Any, {}),
        setTextStrokeWidth: C.fun([C.Num], C.Any, {})
    }, {}, "ITextPath"), IShape);
    ITransition = C.object({
        start: C.fun([], C.Any, {}),
        stop: C.fun([], C.Any, {})
    }, {}, "ITransition");
    IAnimation = C.extend(C.object({
        start: C.fun([], C.Any, {}),
        stop: C.fun([], C.Any, {})
    }, {}, "IAnimation"), IContainer);

    DrawOptionsConfig = C.object({
        fill: C.opt(C.Str),
        stroke: C.opt(C.Str),
        strokeWidth: C.opt(C.Num),
        lineJoin: C.opt(C.Str),
        shadow: C.opt(C.Any)
    }, {}, "DrawOptionsConfig");
    ObjectOptionsConfig = C.object({
        x: C.opt(C.Num),
        y: C.opt(C.Num),
        visible: C.opt(C.Bool),
        listening: C.opt(C.Bool),
        id: C.opt(C.Str),
        name: C.opt(C.Str),
        opacity: C.opt(C.Any),
        scale: C.opt(Vector2d),
        rotation: C.opt(C.Num),
        rotationDeg: C.opt(C.Num),
        offset: C.opt(Vector2d),
        draggable: C.opt(C.Bool),
        dragConstraint: C.opt(C.Str),
        dragBounds: C.opt(C.Any),
        dragBoundFunc: C.opt(C.fun([Vector2d], Vector2d, {})),
        width: C.opt(C.Num),
        height: C.opt(C.Num)
    }, {}, "ObjectOptionsConfig");

    StageConfig = C.extend(C.object({
        container: C.Str,
        width: C.Num,
        height: C.Num
    }, {}, "StageConfig"), ObjectOptionsConfig);
    LayerConfig = C.extend(C.object({
        clearBeforeDraw: C.opt(C.Bool)
    }, {}, "LayerConfig"), ObjectOptionsConfig);
    RectConfig = C.extend(C.extend(C.object({
        width: C.opt(C.Num),
        height: C.opt(C.Num),
        cornerRadius: C.opt(C.Num)
    }, {}, "RectConfig"), DrawOptionsConfig), ObjectOptionsConfig);
    CircleConfig = C.extend(C.extend(C.object({
        radius: C.Num
    }, {}, "CircleConfig"), DrawOptionsConfig), ObjectOptionsConfig);
    ImageConfig = C.extend(C.extend(C.object({
        image: C.Any,
        width: C.opt(C.Num),
        height: C.opt(C.Num),
        crop: C.opt(C.Any)
    }, {}, "ImageConfig"), DrawOptionsConfig), ObjectOptionsConfig);
    SpriteConfig = C.extend(C.extend(C.object({
        image: C.Any,
        animations: C.opt(C.Any),
        animation: C.opt(C.Any),
        frameRate: C.opt(C.Num)
    }, {}, "SpriteConfig"), DrawOptionsConfig), ObjectOptionsConfig);
    TextConfig = C.extend(C.extend(C.object({
        text: C.Str,
        fontSize: C.opt(C.Num),
        fontFamily: C.opt(C.Str),
        fontStyle: C.opt(C.Str),
        textFill: C.opt(C.Any),
        textStroke: C.opt(C.Any),
        textStrokeWidth: C.opt(C.Num),
        align: C.opt(C.Str),
        padding: C.opt(C.Str),
        width: C.opt(C.Num),
        height: C.opt(C.Num),
        lineHeight: C.opt(C.Num),
        cornerRadius: C.opt(C.Num)
    }, {}, "TextConfig"), DrawOptionsConfig), ObjectOptionsConfig);
    LineConfig = C.extend(C.extend(C.object({
        points: C.Any,
        lineCap: C.opt(C.Str),
        dash: C.opt(C.Arr(C.Num))
    }, {}, "LineConfig"), DrawOptionsConfig), ObjectOptionsConfig);
    PolygonConfig = C.extend(C.extend(C.object({
        points: C.Any
    }, {}, "PolygonConfig"), DrawOptionsConfig), ObjectOptionsConfig);
    RegularPolygonConfig = C.extend(C.extend(C.object({
        sides: C.Num,
        radius: C.Num
    }, {}, "RegularPolygonConfig"), DrawOptionsConfig), ObjectOptionsConfig);
    PathConfig = C.extend(C.extend(C.object({
        data: C.Str
    }, {}, "PathConfig"), DrawOptionsConfig), ObjectOptionsConfig);
    StarConfig = C.extend(C.extend(C.object({
        numPoints: C.Num,
        outerRadius: C.Num,
        innerRadius: C.Num
    }, {}, "StarConfig"), DrawOptionsConfig), ObjectOptionsConfig);
    CustomConfig = C.extend(C.extend(C.object({
        drawFunc: C.fun([], C.Any, {})
    }, {}, "CustomConfig"), DrawOptionsConfig), ObjectOptionsConfig);


    Node = C.fun([ObjectOptionsConfig], INode, {});
    Container = C.fun([C.Any], IContainer, {});
    Stage = C.fun([StageConfig], IStage, {});
    Layer = C.fun([C.opt(LayerConfig)], ILayer, {});
    Shape = C.fun([C.Any], IShape, {});
    Rect = C.fun([RectConfig], IRect, {});
    Circle = C.fun([CircleConfig], ICircle, {});
    Ellipse = C.fun([CircleConfig], IEllipse, {});
    Group = C.fun([C.opt(ObjectOptionsConfig)], IGroup, {});
    Collection = C.fun([], ICollection, {});
    Image = C.fun([C.opt(ImageConfig)], IImage, {});
    Line = C.fun([LineConfig], ILine, {});
    Path = C.fun([PathConfig], IPath, {});
    Polygon = C.fun([PolygonConfig], IPolygon, {});
    RegularPolygon = C.fun([RegularPolygonConfig], IRegularPolygon, {});
    Sprite = C.fun([SpriteConfig], ISprite, {});
    Star = C.fun([StarConfig], IStar, {});
    Text = C.fun([TextConfig], IText, {});
    TextPath = C.fun([C.Any], ITextPath, {});
    Transition = C.fun([Node, C.Any], ITransition, {});
    Animation = C.fun([], IAnimation, {
        "rest": C.Any
    });

    Kinetic = C.object({
        Node: Node,
        Container: Container,
        Stage: Stage,
        Layer: Layer,
        Shape: Shape,
        Rect: Rect,
        Circle: Circle,
        Ellipse: Ellipse,
        Group: Group,
        Collection: Collection,
        Image: Image,
        Line: Line,
        Path: Path,
        Polygon: Polygon,
        RegularPolygon: RegularPolygon,
        Sprite: Sprite,
        Star: Star,
        Text: Text,
        TextPath: TextPath,
        Transition: Transition,
        Animation: Animation
    }, {
        "silent": true
    }, "Kinetic");
    var exports = C.guard(Kinetic, kineticjs, "Kineticjs");
    C.setExported(exports, "Kineticjs");
    root["proxy_kinetic"] = exports;
})(this);