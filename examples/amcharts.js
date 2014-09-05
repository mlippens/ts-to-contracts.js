define(["require", "exports", "contracts-js", "amcharts"], function(require, exports) {
    var C = require("contracts-js");
    var Fun, Arr, RegExp, amcharts, AmCharts, baseHref, dayNames, monthNames, shortDayNames, shortMonthNames, useUTC, clear, AmPieChart, AmRadarChart, AmXYChart, Guide, ImagesSettings, AreasSettings, Slice, AmStockChart, ValueAxesSettings, AmLegend, StockLegend, StockPanel, AmChart, AmCoordinateChart, GraphDataItem, SerialDataItem, CategoryAxis, ChartScrollbar, AmRectangularChart, TrendLine, ChartCursor, AmSerialChart, PeriodSelector, PanelsSettings, DataSet, StockGraph, StockEvent, LegendSettings, DataSetSelector, AmBalloon, CategoryAxesSettings, ChartCursorSettings, ChartScrollbarSettings, AmGraph, AxisBase, ValueAxis, AmPieChart_class, AmRadarChart_class, AmXYChart_class, Guide_class, ImagesSettings_class, AreasSettings_class, Slice_class, AmStockChart_class, ValueAxesSettings_class, AmLegend_class, StockLegend_class, StockPanel_class, AmChart_class, AmCoordinateChart_class, GraphDataItem_class, SerialDataItem_class, CategoryAxis_class, ChartScrollbar_class, AmRectangularChart_class, TrendLine_class, ChartCursor_class, AmSerialChart_class, PeriodSelector_class, PanelsSettings_class, DataSet_class, StockGraph_class, StockEvent_class, LegendSettings_class, DataSetSelector_class, AmBalloon_class, CategoryAxesSettings_class, ChartCursorSettings_class, ChartScrollbarSettings_class, AmGraph_class, AxisBase_class, ValueAxis_class;
    amcharts = require("amcharts"); // Type definitions for amCharts
    // Project: http://www.amcharts.com/
    // Definitions by: aleksey-bykov <https://github.com/aleksey-bykov>
    // Definitions: https://github.com/borisyankov/DefinitelyTyped

    /// AmCharts object (it's not a class) is create automatically when amcharts.js or amstock.js file is included in a web page.
    AmPieChart = C.object({
        alphaField: C.Str,
        angle: C.Num,
        balloonText: C.Str,
        chartData: C.Arr(C.Any),
        colorField: C.Str,
        colors: C.Arr(C.Any),
        depth3D: C.Num,
        descriptionField: C.Str,
        gradientRatio: C.Arr(C.Num),
        groupedAlpha: C.Num,
        groupedColor: C.Str,
        groupedDescription: C.Str,
        groupedPulled: C.Bool,
        groupedTitle: C.Str,
        groupPercent: C.Num,
        hideLabelsPercent: C.Num,
        hoverAlpha: C.Num,
        innerRadius: C.Any,
        labelRadius: C.Num,
        labelRadiusField: C.Str,
        labelsEnabled: C.Bool,
        labelText: C.Str,
        labelTickAlpha: C.Num,
        labelTickColor: C.Str,
        marginBottom: C.Num,
        marginLeft: C.Num,
        marginRight: C.Num,
        marginTop: C.Num,
        minRadius: C.Num,
        outlineAlpha: C.Num,
        outlineColor: C.Str,
        outlineThickness: C.Num,
        pieAlpha: C.Num,
        pieBaseColor: C.Str,
        pieBrightnessStep: C.Num,
        pieX: C.Any,
        pieY: C.Any,
        pulledField: C.Str,
        pullOutDuration: C.Num,
        pullOutEffect: C.Str,
        pullOutOnlyOne: C.Bool,
        pullOutRadius: C.Any,
        radius: C.Any,
        sequencedAnimation: C.Bool,
        startAlpha: C.Num,
        startAngle: C.Num,
        startDuration: C.Num,
        startEffect: C.Str,
        startRadius: C.Any,
        titleField: C.Str,
        urlField: C.Str,
        urlTarget: C.Str,
        valueField: C.Str,
        visibleInLegendField: C.Str,
        animateAgain: C.fun([], C.Any, {}),
        clickSlice: C.fun([], C.Any, {}),
        hideSlice: C.fun([], C.Any, {}),
        rollOutSlice: C.fun([], C.Any, {}),
        rollOverSlice: C.fun([], C.Any, {}),
        showSlice: C.fun([], C.Any, {}),
        addListener: C.fun([C.Str, C.fun([C.object({
            type: C.Str,
            dataItem: Slice
        }, {})], C.Undefined, {})], C.Any, {})
    }, {}, "AmPieChart");
    AmPieChart_class = C.object({}, {
        "class": AmPieChart
    });
    AmRadarChart = C.extend(C.object({
        marginBottom: C.Num,
        marginLeft: C.Num,
        marginRight: C.Num,
        marginTop: C.Num,
        radius: C.Any
    }, {}, "AmRadarChart"), AmCoordinateChart);
    AmRadarChart_class = C.object({}, {
        "class": AmRadarChart
    });
    AmXYChart = C.extend(C.object({
        hideXScrollbar: C.Bool,
        hideYScrollbar: C.Bool,
        maxZoomFactor: C.Num,
        zoomOut: C.fun([], C.Any, {})
    }, {}, "AmXYChart"), AmRectangularChart);
    AmXYChart_class = C.object({}, {
        "class": AmXYChart
    });
    Guide = C.object({
        angle: C.Num,
        balloonColor: C.Str,
        balloonText: C.Str,
        category: C.Str,
        dashLength: C.Num,
        date: C.Any,
        fillAlpha: C.Num,
        fillColor: C.Str,
        inside: C.Bool,
        label: C.Str,
        labelRotation: C.Num,
        lineAlpha: C.Num,
        lineColor: C.Str,
        lineThickness: C.Num,
        tickLength: C.Num,
        toAngle: C.Num,
        toCategory: C.Str,
        toDate: C.Any,
        toValue: C.Num,
        value: C.Num
    }, {}, "Guide");
    Guide_class = C.object({}, {
        "class": Guide
    });
    ImagesSettings = C.object({
        alpha: C.Num,
        balloonText: C.Str,
        centered: C.Bool,
        color: C.Str,
        descriptionWindowHeight: C.Num,
        descriptionWindowWidth: C.Num,
        descriptionWindowX: C.Num,
        descriptionWindowY: C.Num,
        labelColor: C.Str,
        labelFontSize: C.Num,
        labelPosition: C.Str,
        labelRollOverColor: C.Str,
        outlineAlpha: C.Num,
        outlineColor: C.Str,
        outlineThickness: C.Num,
        rollOverColor: C.Str,
        rollOverScale: C.Num,
        selectedScale: C.Num
    }, {}, "ImagesSettings");
    ImagesSettings_class = C.object({}, {
        "class": ImagesSettings
    });
    AreasSettings = C.object({
        alpha: C.Num,
        autoZoom: C.Bool,
        balloonText: C.Str,
        color: C.Str,
        colorSolid: C.Str,
        descriptionWindowHeight: C.Num,
        descriptionWindowWidth: C.Num,
        descriptionWindowX: C.Num,
        descriptionWindowY: C.Num,
        outlineAlpha: C.Num,
        outlineColor: C.Str,
        outlineThickness: C.Num,
        rollOverColor: C.Str,
        rollOverOutlineColor: C.Str,
        selectedColor: C.Str,
        unlistedAreasAlpha: C.Num,
        unlistedAreasColor: C.Str,
        unlistedAreasOutlineAlpha: C.Num,
        unlistedAreasOutlineColor: C.Str
    }, {}, "AreasSettings");
    AreasSettings_class = C.object({}, {
        "class": AreasSettings
    });
    Slice = C.object({
        alpha: C.Num,
        color: C.Str,
        dataContext: C.object({}, {}, "Object"),
        description: C.Str,
        hidden: C.Bool,
        percents: C.Num,
        pulled: C.Bool,
        title: C.Str,
        url: C.Str,
        value: C.Num,
        visibleInLegend: C.Bool
    }, {}, "Slice");
    Slice_class = C.object({}, {
        "class": Slice
    });
    AmStockChart = C.object({
        animationPlayed: C.Bool,
        balloon: AmBalloon,
        categoryAxesSettings: CategoryAxesSettings,
        chartCreated: C.Bool,
        chartCursorSettings: ChartCursorSettings,
        chartScrollbarSettings: ChartScrollbarSettings,
        colors: C.Arr(C.Any),
        comparedDataSets: C.Arr(C.Any),
        dataSets: C.Arr(C.Any),
        dataSetSelector: DataSetSelector,
        endDate: C.Any,
        firstDayOfWeek: C.Num,
        glueToTheEnd: C.Bool,
        legendSettings: LegendSettings,
        mainDataSet: DataSet,
        panels: C.Arr(C.Any),
        panelsSettings: PanelsSettings,
        periodSelector: PeriodSelector,
        scrollbarChart: AmSerialChart,
        startDate: C.Any,
        stockEventsSettings: C.Any,
        valueAxesSettings: ValueAxesSettings,
        version: C.Str,
        zoomOutOnDataSetChange: C.Bool,
        addPanel: C.fun([StockPanel], C.Any, {}),
        addPanelAt: C.fun([StockPanel, C.Num], C.Any, {}),
        clear: C.fun([], C.Any, {}),
        hideStockEvents: C.fun([], C.Any, {}),
        removePanel: C.fun([StockPanel], C.Any, {}),
        showStockEvents: C.fun([], C.Any, {}),
        validateData: C.fun([], C.Any, {}),
        validateNow: C.fun([], C.Any, {}),
        zoom: C.fun([], C.Any, {}),
        zoomOut: C.fun([], C.Any, {}),
        addListener: C.overload_fun(C.fun([C.Str, C.fun([C.object({
            type: C.Str,
            eventObject: C.Any,
            graph: AmGraph,
            date: C.Any,
            chart: C.Self
        }, {})], C.Undefined, {})], C.Any, {}), C.fun([C.Str, C.fun([C.object({
            type: C.Str,
            startDate: C.Any,
            endDate: C.Any,
            period: C.Str,
            chart: C.Self
        }, {})], C.Undefined, {})], C.Any, {}), C.fun([C.Str, C.fun([C.object({
            type: C.Str,
            panel: StockPanel,
            chart: C.Self
        }, {})], C.Undefined, {})], C.Any, {}), C.fun([C.Str, C.fun([C.object({
            type: C.Str,
            chart: C.Self
        }, {})], C.Undefined, {})], C.Any, {})),
        removeListener: C.overload_fun(C.fun([AmChart, C.Str, C.Any], C.Any, {}), C.fun([], C.Any, {}))
    }, {}, "AmStockChart");
    AmStockChart_class = C.object({}, {
        "class": AmStockChart
    });
    ValueAxesSettings = C.object({
        autoGridCount: C.Bool,
        axisAlpha: C.Num,
        axisColor: C.Str,
        axisThickness: C.Num,
        color: C.Str,
        dashLength: C.Num,
        fillAlpha: C.Num,
        fillColor: C.Str,
        gridAlpha: C.Num,
        gridColor: C.Str,
        gridCount: C.Num,
        gridThickness: C.Num,
        includeGuidesInMinMax: C.Bool,
        includeHidden: C.Bool,
        inside: C.Bool,
        integersOnly: C.Bool,
        labelFrequency: C.Num,
        labelsEnabled: C.Bool,
        logarithmic: C.Bool,
        offset: C.Num,
        position: C.Str,
        reversed: C.Bool,
        showFirstLabel: C.Bool,
        showLastLabel: C.Bool,
        stackType: C.Str,
        tickLength: C.Num,
        unit: C.Str,
        unitPosition: C.Str
    }, {}, "ValueAxesSettings");
    ValueAxesSettings_class = C.object({}, {
        "class": ValueAxesSettings
    });
    AmLegend = C.object({
        align: C.Str,
        autoMargins: C.Bool,
        backgroundAlpha: C.Num,
        backgroundColor: C.Str,
        borderAlpha: C.Num,
        borderColor: C.Str,
        bottom: C.Num,
        color: C.Str,
        data: C.Arr(C.Any),
        equalWidths: C.Bool,
        fontSize: C.Num,
        horizontalGap: C.Num,
        labelText: C.Str,
        left: C.Num,
        marginBottom: C.Num,
        marginLeft: C.Num,
        marginRight: C.Num,
        marginTop: C.Num,
        markerBorderAlpha: C.Num,
        markerBorderColor: C.Str,
        markerBorderThickness: C.Num,
        markerDisabledColor: C.Str,
        markerLabelGap: C.Num,
        markerSize: C.Num,
        markerType: C.Str,
        maxColumns: C.Num,
        position: C.Str,
        reversedOrder: C.Bool,
        right: C.Num,
        rollOverColor: C.Str,
        rollOverGraphAlpha: C.Num,
        showEntries: C.Bool,
        spacing: C.Num,
        switchable: C.Bool,
        switchColor: C.Str,
        switchType: C.Str,
        textClickEnabled: C.Bool,
        top: C.Num,
        useMarkerColorForLabels: C.Bool,
        valueAlign: C.Str,
        valueText: C.Str,
        valueWidth: C.Num,
        verticalGap: C.Num,
        addListener: C.fun([C.Str, C.fun([C.object({
            type: C.Str,
            dataItem: C.object({}, {}, "Object"),
            chart: AmChart
        }, {})], C.Undefined, {})], C.Any, {}),
        removeListener: C.fun([AmChart, C.Str, C.Any], C.Any, {})
    }, {}, "AmLegend");
    AmLegend_class = C.object({}, {
        "class": AmLegend
    });
    StockLegend = C.extend(C.object({
        valueTextComparing: C.Str,
        valueTextRegular: C.Str
    }, {}, "StockLegend"), AmLegend);
    StockLegend_class = C.object({}, {
        "class": StockLegend
    });
    StockPanel = C.extend(C.object({
        allowTurningOff: C.Bool,
        drawingIconsEnabled: C.Bool,
        drawOnAxis: ValueAxis,
        eraseAll: C.Bool,
        iconSize: C.Num,
        percentHeight: C.Num,
        recalculateToPercents: C.Str,
        showCategoryAxis: C.Bool,
        stockGraphs: C.Arr(StockGraph),
        stockLegend: StockLegend,
        title: C.Str,
        trendLineAlpha: C.Num,
        trendLineColor: C.Str,
        trendLineDashLength: C.Num,
        trendLineThickness: C.Num,
        addStockGraph: C.fun([StockGraph], C.Any, {}),
        removeStockGraph: C.fun([StockGraph], C.Any, {})
    }, {}, "StockPanel"), AmSerialChart);
    StockPanel_class = C.object({}, {
        "class": StockPanel
    });
    AmChart = C.object({
        backgroundColor: C.Str,
        balloon: AmBalloon,
        borderAlpha: C.Num,
        borderColor: C.Str,
        color: C.Str,
        dataProvider: C.Arr(C.Any),
        fontFamily: C.Str,
        fontSize: C.Num,
        height: C.Any,
        legendDiv: C.Any,
        numberFormatter: C.object({}, {}, "Object"),
        panEventsEnabled: C.Bool,
        percentFormatter: C.object({}, {}, "Object"),
        prefixesOfBigNumbers: C.Arr(C.Any),
        prefixesOfSmallNumbers: C.Arr(C.Any),
        usePrefixes: C.Bool,
        version: C.Str,
        addLabel: C.fun([C.Num, C.Num, C.Str, C.Str, C.Str, C.Num, C.Bool, C.Str], C.Any, {}),
        addTitle: C.fun([], C.Any, {}),
        clear: C.fun([], C.Any, {}),
        clearLabels: C.fun([], C.Any, {}),
        invalidateSize: C.fun([], C.Any, {}),
        removeLegend: C.fun([], C.Any, {}),
        validateData: C.fun([], C.Any, {}),
        validateNow: C.fun([], C.Any, {}),
        addListener: C.fun([C.Str, C.fun([C.object({
            type: C.Str,
            chart: C.Self
        }, {})], C.Undefined, {})], C.Any, {}),
        removeListener: C.fun([C.Self, C.Str, C.Any], C.Any, {}),
        addLegend: C.overload_fun(C.fun([AmLegend, C.Any], C.Any, {}), C.fun([AmLegend, C.opt(C.Str)], C.Any, {})),
        write: C.overload_fun(C.fun([C.Str], C.Undefined, {}), C.fun([C.Any], C.Undefined, {}))
    }, {}, "AmChart");
    AmChart_class = C.and(C.fun([C.Any], C.Any, {}), C.object({}, {
        "class": AmChart
    }));
    AmCoordinateChart = C.extend(C.object({
        colors: C.Arr(C.Any),
        graphs: C.Arr(C.Any),
        plotAreaBorderAlpha: C.Num,
        plotAreaBorderColor: C.Str,
        plotAreaFillAlphas: C.Num,
        plotAreaFillColors: C.Any,
        sequencedAnimation: C.Bool,
        startAlpha: C.Num,
        startDuration: C.Num,
        startEffect: C.Str,
        urlTarget: C.Any,
        valueAxes: C.Arr(C.Any),
        addGraph: C.fun([AmGraph], C.Any, {}),
        addValueAxis: C.fun([ValueAxis], C.Any, {}),
        animateAgain: C.fun([], C.Any, {}),
        getGraphById: C.fun([C.Str], AmGraph, {}),
        getValueAxisById: C.fun([C.Str], ValueAxis, {}),
        hideGraph: C.fun([AmGraph], C.Any, {}),
        hideGraphsBalloon: C.fun([AmGraph], C.Any, {}),
        highlightGraph: C.fun([AmGraph], C.Any, {}),
        removeGraph: C.fun([AmGraph], C.Any, {}),
        removeValueAxis: C.fun([ValueAxis], C.Any, {}),
        showGraph: C.fun([AmGraph], C.Any, {}),
        showGraphsBalloon: C.fun([AmGraph], C.Any, {}),
        unhighlightGraph: C.fun([AmGraph], C.Any, {}),
        addListener: C.fun([C.Str, C.fun([C.object({
            type: C.Str,
            graph: AmGraph,
            item: GraphDataItem,
            index: C.Num,
            chart: AmChart
        }, {})], C.Undefined, {})], C.Any, {})
    }, {}, "AmCoordinateChart"), AmChart);
    AmCoordinateChart_class = C.object({}, {
        "class": AmCoordinateChart
    });
    GraphDataItem = C.object({
        alpha: C.Num,
        bullet: C.Str,
        bulletSize: C.Num,
        category: C.Str,
        color: C.Str,
        customBullet: C.Str,
        dataContext: C.object({}, {}, "Object"),
        description: C.Str,
        fillColors: C.Arr(C.Any),
        percents: C.object({}, {}, "Object"),
        serialDataItem: SerialDataItem,
        url: C.Str,
        values: C.object({}, {}, "Object"),
        x: C.Num,
        y: C.Num
    }, {}, "GraphDataItem");
    GraphDataItem_class = C.object({}, {
        "class": GraphDataItem
    });
    SerialDataItem = C.object({
        axes: C.object({}, {}, "Object"),
        category: C.Any,
        time: C.Num,
        x: C.Num
    }, {}, "SerialDataItem");
    SerialDataItem_class = C.object({}, {
        "class": SerialDataItem
    });
    CategoryAxis = C.extend(C.object({
        boldPeriodBeginning: C.Bool,
        dateFormats: C.Arr(C.Any),
        equalSpacing: C.Bool,
        forceShowField: C.Str,
        gridPosition: C.Str,
        minPeriod: C.Str,
        parseDates: C.Bool,
        startOnAxis: C.Bool,
        categoryToCoordinate: C.fun([], C.Any, {}),
        coordinateToDate: C.fun([], C.Any, {}),
        dateToCoordinate: C.fun([], C.Any, {}),
        xToIndex: C.fun([], C.Any, {})
    }, {}, "CategoryAxis"), AxisBase);
    CategoryAxis_class = C.object({}, {
        "class": CategoryAxis
    });
    ChartScrollbar = C.object({
        autoGridCount: C.Bool,
        backgroundAlpha: C.Num,
        backgroundColor: C.Str,
        categoryAxis: CategoryAxis,
        color: C.Str,
        graph: AmGraph,
        graphFillAlpha: C.Num,
        graphFillColor: C.Str,
        graphLineAlpha: C.Num,
        graphLineColor: C.Str,
        graphType: C.Str,
        gridAlpha: C.Num,
        gridColor: C.Str,
        gridCount: C.Num,
        hideResizeGrips: C.Bool,
        resizeEnabled: C.Bool,
        scrollbarHeight: C.Num,
        scrollDuration: C.Num,
        selectedBackgroundAlpha: C.Num,
        selectedBackgroundColor: C.Str,
        selectedGraphFillAlpha: C.Num,
        selectedGraphFillColor: C.Str,
        selectedGraphLineAlpha: C.Num,
        selectedGraphLineColor: C.Str,
        updateOnReleaseOnly: C.Bool
    }, {}, "ChartScrollbar");
    ChartScrollbar_class = C.object({}, {
        "class": ChartScrollbar
    });
    AmRectangularChart = C.extend(C.object({
        angle: C.Num,
        autoMarginOffset: C.Num,
        autoMargins: C.Bool,
        chartCursor: ChartCursor,
        chartScrollbar: ChartScrollbar,
        depth3D: C.Num,
        marginBottom: C.Num,
        marginLeft: C.Num,
        marginRight: C.Num,
        marginsUpdated: C.Bool,
        marginTop: C.Num,
        trendLines: C.Arr(C.Any),
        zoomOutButton: C.object({}, {}, "Object"),
        zoomOutText: C.Str,
        addTrendLine: C.fun([TrendLine], C.Any, {}),
        removeChartCursor: C.fun([], C.Any, {}),
        removeChartScrollbar: C.fun([], C.Any, {})
    }, {}, "AmRectangularChart"), AmCoordinateChart);
    AmRectangularChart_class = C.object({}, {
        "class": AmRectangularChart
    });
    TrendLine = C.object({}, {}, "TrendLine");
    TrendLine_class = C.object({}, {
        "class": TrendLine
    });
    ChartCursor = C.object({
        bulletsEnabled: C.Bool,
        bulletSize: C.Num,
        categoryBalloonAlpha: C.Num,
        categoryBalloonColor: C.Str,
        categoryBalloonDateFormat: C.Str,
        categoryBalloonEnabled: C.Bool,
        color: C.Str,
        cursorAlpha: C.Num,
        cursorColor: C.Str,
        cursorPosition: C.Str,
        enabled: C.Bool,
        oneBalloonOnly: C.Bool,
        pan: C.Bool,
        selectionAlpha: C.Num,
        selectWithoutZooming: C.Bool,
        valueBalloonsEnabled: C.Bool,
        zoomable: C.Bool,
        zooming: C.Bool,
        hideCursor: C.fun([], C.Any, {}),
        showCursorAt: C.fun([], C.Any, {}),
        removeListener: C.fun([AmChart, C.Str, C.Any], C.Any, {}),
        addListener: C.overload_fun(C.fun([C.Str, C.fun([C.object({
            type: C.Str,
            chart: AmChart
        }, {})], C.Undefined, {})], C.Any, {}), C.fun([C.Str, C.fun([C.object({
            type: C.Str,
            index: C.Num,
            zooming: C.Bool,
            chart: AmChart
        }, {})], C.Undefined, {})], C.Any, {}), C.fun([C.Str, C.fun([C.object({
            type: C.Str,
            index: C.Num,
            zooming: C.Bool,
            mostCloseGraph: AmGraph,
            chart: AmChart
        }, {})], C.Undefined, {})], C.Any, {}))
    }, {}, "ChartCursor");
    ChartCursor_class = C.object({}, {
        "class": ChartCursor
    });
    AmSerialChart = C.extend(C.object({
        categoryAxis: CategoryAxis,
        categoryField: C.Str,
        chartData: C.Arr(C.Any),
        columnSpacing: C.Num,
        columnWidth: C.Num,
        dataProvider: C.Arr(C.Any),
        endDate: C.Any,
        endIndex: C.Num,
        maxSelectedSeries: C.Num,
        maxSelectedTime: C.Num,
        minSelectedTime: C.Num,
        rotate: C.Bool,
        startDate: C.Any,
        startIndex: C.Num,
        zoomOutOnDataUpdate: C.Bool,
        getCategoryIndexByValue: C.fun([], C.Any, {}),
        zoomOut: C.fun([], C.Any, {}),
        zoomToCategoryValues: C.fun([], C.Any, {}),
        zoomToDates: C.fun([], C.Any, {}),
        zoomToIndexes: C.fun([], C.Any, {})
    }, {}, "AmSerialChart"), AmRectangularChart);
    AmSerialChart_class = C.object({}, {
        "class": AmSerialChart
    });
    PeriodSelector = C.object({
        dateFormat: C.Str,
        fromText: C.Str,
        hideOutOfScopePeriods: C.Bool,
        inputFieldsEnabled: C.Bool,
        inputFieldWidth: C.Num,
        periods: C.Arr(C.Any),
        periodsText: C.Str,
        position: C.Str,
        selectFromStart: C.Bool,
        toText: C.Str,
        width: C.Num,
        addListener: C.fun([C.fun([C.object({
            type: C.Str,
            startDate: C.Any,
            endDate: C.Any,
            predefinedPeriod: C.Str,
            count: C.Num
        }, {})], C.Undefined, {})], C.Any, {}),
        removeListener: C.fun([AmChart, C.Str, C.Any], C.Any, {})
    }, {}, "PeriodSelector");
    PeriodSelector_class = C.object({}, {
        "class": PeriodSelector
    });
    PanelsSettings = C.object({
        angle: C.Num,
        backgroundAlpha: C.Num,
        backgroundColor: C.Str,
        columnSpacing: C.Num,
        columnWidth: C.Num,
        depth3D: C.Num,
        fontFamily: C.Str,
        fontSize: C.Str,
        marginBottom: C.Num,
        marginLeft: C.Num,
        marginRight: C.Num,
        marginTop: C.Num,
        panelSpacing: C.Num,
        panEventsEnabled: C.Bool,
        plotAreaBorderAlpha: C.Num,
        plotAreaBorderColor: C.Str,
        plotAreaFillAlphas: C.Num,
        plotAreaFillColors: C.Any,
        prefixesOfBigNumbers: C.Arr(C.Any),
        prefixesOfSmallNumbers: C.Arr(C.Any),
        sequencedAnimation: C.Bool,
        startAlpha: C.Num,
        startDuration: C.Num,
        startEffect: C.Str,
        usePrefixes: C.Bool
    }, {}, "PanelsSettings");
    PanelsSettings_class = C.object({}, {
        "class": PanelsSettings
    });
    DataSet = C.object({
        categoryField: C.Str,
        color: C.Str,
        compared: C.Bool,
        dataProvider: C.Arr(C.Any),
        fieldMappings: C.Arr(C.Any),
        showInCompare: C.Bool,
        showInSelect: C.Bool,
        stockEvents: C.Arr(StockEvent),
        title: C.Str
    }, {}, "DataSet");
    DataSet_class = C.object({}, {
        "class": DataSet
    });
    StockGraph = C.extend(C.object({
        comparable: C.Bool,
        compareField: C.Str,
        compareGraphBalloonColor: C.Str,
        compareGraphBalloonText: C.Str,
        compareGraphBullet: C.Str,
        compareGraphBulletSize: C.Num,
        compareGraphCornerRadiusTop: C.Num,
        compareGraphDashLength: C.Num,
        compareGraphFillAlphas: C.Num,
        compareGraphFillColors: C.Str,
        compareGraphLineAlpha: C.Num,
        compareGraphLineThickness: C.Num,
        compareGraphType: C.Str,
        compareGraphVisibleInLegend: C.Bool,
        periodValue: C.Str,
        useDataSetColors: C.Bool
    }, {}, "StockGraph"), AmGraph);
    StockGraph_class = C.object({}, {
        "class": StockGraph
    });
    StockEvent = C.object({
        backgroundAlpha: C.Num,
        backgroundColor: C.Str,
        borderAlpha: C.Num,
        borderColor: C.Str,
        color: C.Str,
        date: C.Any,
        graph: StockGraph,
        rollOverColor: C.Str,
        showOnAxis: C.Bool,
        text: C.Str,
        type: C.Str,
        url: C.Str,
        urlTarget: C.Str
    }, {}, "StockEvent");
    StockEvent_class = C.object({}, {
        "class": StockEvent
    });
    LegendSettings = C.object({
        align: C.Str,
        equalWidths: C.Bool,
        horizontalGap: C.Num,
        labelText: C.Str,
        marginBottom: C.Num,
        marginTop: C.Num,
        markerBorderAlpha: C.Num,
        markerBorderColor: C.Str,
        markerBorderThickness: C.Num,
        markerDisabledColor: C.Str,
        markerLabelGap: C.Num,
        markerSize: C.Num,
        markerType: C.Str,
        reversedOrder: C.Bool,
        rollOverColor: C.Str,
        rollOverGraphAlpha: C.Num,
        switchable: C.Bool,
        switchColor: C.Str,
        switchType: C.Str,
        textClickEnabled: C.Bool,
        useMarkerColorForLabels: C.Bool,
        valueTextComparing: C.Str,
        valueTextRegular: C.Str,
        valueWidth: C.Num,
        verticalGap: C.Num
    }, {}, "LegendSettings");
    LegendSettings_class = C.object({}, {
        "class": LegendSettings
    });
    DataSetSelector = C.object({
        comboBoxSelectText: C.Str,
        compareText: C.Str,
        listHeight: C.Num,
        position: C.Str,
        selectText: C.Str,
        width: C.Num
    }, {}, "DataSetSelector");
    DataSetSelector_class = C.object({}, {
        "class": DataSetSelector
    });
    AmBalloon = C.object({
        adjustBorderColor: C.Bool,
        borderAlpha: C.Num,
        borderColor: C.Str,
        borderThickness: C.Num,
        color: C.Str,
        cornerRadius: C.Num,
        fillAlpha: C.Num,
        fillColor: C.Str,
        fontSize: C.Num,
        horizontalPadding: C.Num,
        pointerWidth: C.Num,
        showBullet: C.Bool,
        textAlign: C.Str,
        textShadowColor: C.Str,
        verticalPadding: C.Num,
        hide: C.fun([], C.Any, {}),
        setBounds: C.fun([C.Num, C.Num, C.Num, C.Num], C.Any, {}),
        setPosition: C.fun([C.Num, C.Num], C.Any, {}),
        show: C.fun([C.Str], C.Any, {})
    }, {}, "AmBalloon");
    AmBalloon_class = C.object({}, {
        "class": AmBalloon
    });
    CategoryAxesSettings = C.object({
        autoGridCount: C.Bool,
        axisAlpha: C.Num,
        axisColor: C.Str,
        axisHeight: C.Num,
        axisThickness: C.Num,
        color: C.Str,
        dashLength: C.Num,
        dateFormats: C.Arr(C.Any),
        equalSpacing: C.Bool,
        fillAlpha: C.Num,
        fillColor: C.Str,
        fontSize: C.Num,
        gridAlpha: C.Num,
        gridColor: C.Str,
        gridCount: C.Num,
        gridThickness: C.Num,
        groupToPeriods: C.Arr(C.Any),
        inside: C.Bool,
        labelRotation: C.Num,
        maxSeries: C.Num,
        minPeriod: C.Str,
        position: C.Str,
        startOnAxis: C.Bool,
        tickLength: C.Num
    }, {}, "CategoryAxesSettings");
    CategoryAxesSettings_class = C.object({}, {
        "class": CategoryAxesSettings
    });
    ChartCursorSettings = C.object({
        bulletsEnabled: C.Bool,
        bulletSize: C.Num,
        categoryBalloonAlpha: C.Num,
        categoryBalloonColor: C.Str,
        categoryBalloonDateFormats: C.Arr(C.Any),
        categoryBalloonEnabled: C.Bool,
        cursorAlpha: C.Num,
        cursorColor: C.Str,
        cursorPosition: C.Str,
        enabled: C.Bool,
        pan: C.Bool,
        valueBalloonsEnabled: C.Bool,
        zoomable: C.Bool
    }, {}, "ChartCursorSettings");
    ChartCursorSettings_class = C.object({}, {
        "class": ChartCursorSettings
    });
    ChartScrollbarSettings = C.object({
        autoGridCount: C.Bool,
        backgroundAlpha: C.Num,
        backgroundColor: C.Str,
        color: C.Str,
        enabled: C.Bool,
        fontSize: C.Num,
        graph: AmGraph,
        graphFillAlpha: C.Num,
        graphFillColor: C.Str,
        graphLineAlpha: C.Num,
        graphLineColor: C.Str,
        graphType: C.Str,
        gridAlpha: C.Num,
        gridColor: C.Str,
        gridCount: C.Num,
        height: C.Num,
        hideResizeGrips: C.Bool,
        scrollDuration: C.Num,
        selectedBackgroundAlpha: C.Num,
        selectedBackgroundColor: C.Str,
        selectedGraphFillAlpha: C.Num,
        selectedGraphFillColor: C.Str,
        selectedGraphLineAlpha: C.Num,
        selectedGraphLineColor: C.Str,
        updateOnReleaseOnly: C.Bool
    }, {}, "ChartScrollbarSettings");
    ChartScrollbarSettings_class = C.object({}, {
        "class": ChartScrollbarSettings
    });
    AmGraph = C.object({
        alphaField: C.Str,
        balloonColor: C.Str,
        balloonText: C.Str,
        behindColumns: C.Bool,
        bullet: C.Str,
        bulletAlpha: C.Num,
        bulletBorderAlpha: C.Num,
        bulletBorderColor: C.Str,
        bulletBorderThickness: C.Num,
        bulletColor: C.Str,
        bulletField: C.Str,
        bulletOffset: C.Num,
        bulletSize: C.Num,
        bulletSizeField: C.Str,
        closeField: C.Str,
        color: C.Str,
        colorField: C.Str,
        connect: C.Bool,
        cornerRadiusTop: C.Num,
        cursorBulletAlpha: C.Num,
        customBullet: C.Str,
        customBulletField: C.Str,
        dashLength: C.Num,
        descriptionField: C.Str,
        fillAlphas: C.Num,
        fillColors: C.Any,
        fillColorsField: C.Str,
        fillToGraph: C.Self,
        fontSize: C.Num,
        gradientOrientation: C.Str,
        hidden: C.Bool,
        hideBulletsCount: C.Num,
        highField: C.Str,
        includeInMinMax: C.Bool,
        labelColorField: C.Str,
        labelPosition: C.Str,
        labelText: C.Str,
        legendAlpha: C.Num,
        legendColor: C.Str,
        legendValueText: C.Str,
        lineAlpha: C.Num,
        lineColor: C.Str,
        lineColorField: C.Str,
        lineThickness: C.Num,
        lowField: C.Str,
        markerType: C.Str,
        maxBulletSize: C.Num,
        minBulletSize: C.Num,
        negativeBase: C.Num,
        negativeFillAlphas: C.Num,
        negativeFillColors: C.Any,
        negativeLineColor: C.Str,
        numberFormatter: C.object({}, {}, "Object"),
        openField: C.Str,
        pointPosition: C.Str,
        showAllValueLabels: C.Bool,
        showBalloon: C.Bool,
        showBalloonAt: C.Str,
        stackable: C.Bool,
        title: C.Str,
        type: C.Str,
        urlField: C.Str,
        urlTarget: C.Str,
        valueAxis: ValueAxis,
        valueField: C.Str,
        visibleInLegend: C.Bool,
        xAxis: ValueAxis,
        xField: C.Str,
        yAxis: ValueAxis,
        yField: C.Str
    }, {}, "AmGraph");
    AmGraph_class = C.object({}, {
        "class": AmGraph
    });
    AxisBase = C.object({
        autoGridCount: C.Bool,
        axisAlpha: C.Num,
        axisColor: C.Str,
        axisThickness: C.Num,
        color: C.Str,
        dashLength: C.Num,
        fillAlpha: C.Num,
        fillColor: C.Str,
        fontSize: C.Num,
        gridAlpha: C.Num,
        gridColor: C.Str,
        gridCount: C.Num,
        gridThickness: C.Num,
        guides: C.Arr(C.Any),
        ignoreAxisWidth: C.Bool,
        inside: C.Bool,
        labelFrequency: C.Num,
        labelRotation: C.Num,
        labelsEnabled: C.Bool,
        offset: C.Num,
        position: C.Str,
        showFirstLabel: C.Bool,
        showLastLabel: C.Bool,
        tickLength: C.Num,
        title: C.Str,
        titleBold: C.Bool,
        titleColor: C.Str,
        titleFontSize: C.Num,
        addGuide: C.fun([Guide], C.Any, {}),
        removeGuide: C.fun([Guide], C.Any, {})
    }, {}, "AxisBase");
    AxisBase_class = C.object({}, {
        "class": AxisBase
    });
    ValueAxis = C.extend(C.object({
        axisTitleOffset: C.Num,
        baseCoord: C.Num,
        baseValue: C.Num,
        duration: C.Str,
        durationUnits: C.object({}, {}, "Object"),
        gridType: C.Str,
        includeGuidesInMinMax: C.Bool,
        includeHidden: C.Bool,
        integersOnly: C.Bool,
        logarithmic: C.Bool,
        max: C.Num,
        maximum: C.Num,
        min: C.Num,
        minimum: C.Num,
        minMaxMultiplier: C.Num,
        precision: C.Num,
        radarCategoriesEnabled: C.Bool,
        recalculateToPercents: C.Bool,
        reversed: C.Bool,
        stackType: C.Str,
        step: C.Num,
        synchronizationMultiplier: C.Num,
        totalText: C.Str,
        unit: C.Str,
        unitPosition: C.Str,
        usePrefixes: C.Bool,
        useScientificNotation: C.Bool,
        coordinateToValue: C.fun([], C.Any, {}),
        getCoordinate: C.fun([], C.Any, {}),
        synchronizeWithAxis: C.fun([C.Self], C.Any, {}),
        zoomToValues: C.fun([], C.Any, {}),
        addListener: C.overload_fun(C.fun([C.Str, C.fun([C.object({
            type: C.Str,
            startValue: C.Any,
            endValue: C.Any,
            chart: AmChart
        }, {})], C.Undefined, {})], C.Any, {}), C.fun([C.Str, C.fun([C.object({
            type: C.Str,
            chart: AmChart
        }, {})], C.Undefined, {})], C.Any, {}), C.fun([], C.Any, {})),
        removeListener: C.overload_fun(C.fun([AmChart, C.Str, C.Any], C.Any, {}), C.fun([], C.Any, {}))
    }, {}, "ValueAxis"), AxisBase);
    ValueAxis_class = C.object({}, {
        "class": ValueAxis
    });
    AmCharts = C.object({
        baseHref: C.Bool,
        dayNames: C.Arr(C.Str),
        monthNames: C.Arr(C.Str),
        shortDayNames: C.Arr(C.Str),
        shortMonthNames: C.Arr(C.Str),
        useUTC: C.Bool,
        clear: C.fun([], C.Any, {}),
        AmPieChart: AmPieChart_class,
        AmRadarChart: AmRadarChart_class,
        AmXYChart: AmXYChart_class,
        Guide: Guide_class,
        ImagesSettings: ImagesSettings_class,
        AreasSettings: AreasSettings_class,
        Slice: Slice_class,
        AmStockChart: AmStockChart_class,
        ValueAxesSettings: ValueAxesSettings_class,
        AmLegend: AmLegend_class,
        StockLegend: StockLegend_class,
        StockPanel: StockPanel_class,
        AmChart: AmChart_class,
        AmCoordinateChart: AmCoordinateChart_class,
        GraphDataItem: GraphDataItem_class,
        SerialDataItem: SerialDataItem_class,
        CategoryAxis: CategoryAxis_class,
        ChartScrollbar: ChartScrollbar_class,
        AmRectangularChart: AmRectangularChart_class,
        TrendLine: TrendLine_class,
        ChartCursor: ChartCursor_class,
        AmSerialChart: AmSerialChart_class,
        PeriodSelector: PeriodSelector_class,
        PanelsSettings: PanelsSettings_class,
        DataSet: DataSet_class,
        StockGraph: StockGraph_class,
        StockEvent: StockEvent_class,
        LegendSettings: LegendSettings_class,
        DataSetSelector: DataSetSelector_class,
        AmBalloon: AmBalloon_class,
        CategoryAxesSettings: CategoryAxesSettings_class,
        ChartCursorSettings: ChartCursorSettings_class,
        ChartScrollbarSettings: ChartScrollbarSettings_class,
        AmGraph: AmGraph_class,
        AxisBase: AxisBase_class,
        ValueAxis: ValueAxis_class
    }, {
        "forgiving": true
    }, "AmCharts");
    return exports;
});