"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeTip, _focus;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/******** plugin版本入口文件 **********/
// _drawEffectNode
var DEAULT_THEME = "dark";
var DEFAULT_OPTIONS = {
  // 一、总体配置文件
  // theme 选项 dark,light
  theme: DEAULT_THEME,
  // 图标配置，用来微调图标坐标
  iconConfig: DEAULT_THEME === "dark" ? "../entities/icon_config.json" : "../entities/icon_config_light.json",
  // icon图标所在目录，
  iconMenu: DEAULT_THEME === "dark" ? "../entities/icons" : "../entities/light",
  // 数据配置，初始数据来源
  baseurl: "../data/Global_1.json",
  canvas: {
    bgColor: "rgba(255, 255, 255, 1)",
    // 背景色
    aspectRatio: [16, 9],
    // 宽高比
    zoomRange: [1, 10],
    // 允许缩放的范围
    // 2d 背景图
    backgroud_global_img: "/images/bg/浅色无光效背景.jpg",
    // 背景图地址
    backgroud_global_l2_img: "/images/bg/浅色背景2D.jpg",
    // 背景图地址
    // 3d 背景图
    backgroud_local_img: "/images/bg/浅色无光效背景.jpg",
    // 背景图地址
    backgroud_local_l2_img: "/images/bg/浅色背景2.5D.jpg",
    // 背景图地址
    animateOpenSpeed: 0,
    // 棋盘展开速度
    DEFAULT_NODE_SIZE: 80 * Math.sin(30),
    // 默认节点半径
    zoom: 1,
    // 初始缩放程度
    position: [0, 0] // 初始位置

  },
  general: {
    fontFamily: "sans-serif",
    // 字体
    fontSize: "14px",
    // 字号
    loadingImg: "./images/loading.gif",
    loadingColor: "rgba(0,9,50,0.3)"
  },
  d2View: {
    // 默认六边形边框
    "default": {
      borderWidth: 1,
      // 线粗
      borderColor: "209,209,209",
      // 颜色
      borderAlpha: 0.3,
      // 透明度
      isBgColor: true,
      // 是否填色
      bgColor: "255,255,255",
      // 填色的颜色
      bgAlpha: 1 // 填色的透明度

    },
    // 高亮六边形边框
    selected: {
      borderWidth: 1,
      // 线粗
      borderColor: "209,209,209",
      // 颜色
      borderAlpha: 0.3,
      // 透明度
      isBgColor: true,
      // 是否填色
      bgColor: "255,255,255",
      // 填色的颜色
      bgAlpha: 1 // 填色的透明度

    },
    // Grid Off状态的圆形边框
    offBorder: {
      shape: "circle",
      borderWidth: 1,
      // 线粗
      borderColor: "150,150,200",
      // 颜色
      borderAlpha: 0.3,
      // 透明度
      isBgColor: false,
      // 是否填色
      bgColor: "150,150,200",
      // 填色的颜色
      bgAlpha: 0 // 填色的透明度

    },
    // 默认Edge
    link: {
      width: 2,
      // 线粗
      color: "220,220,220",
      // 颜色
      alpha: 0.3 // 透明度

    },
    // 高亮Edge
    selectedLink: {
      width: 2,
      // 线粗
      color: "1,255,185",
      // 颜色
      alpha: 0.3,
      // 透明度
      lineDashOffset: 0.5 // 线的流速

    },
    titleText: {
      isShow: true,
      // 默认是否显示
      hoverHidden: false,
      // hover是否隐藏
      textAlign: "center",
      // 水平对齐模式
      height: 20,
      // 高度
      width: 50,
      // 宽度
      borderRadius: 10,
      //边角弧度
      bgColor: "#032840",
      // 背景色
      line: 1,
      // 允许行数上限
      wordCount: 7,
      //文字允许长度上限
      fontFamily: "sans-serif",
      // 字体
      fontSize: 14,
      // 字号
      fontColor: "#fff" // 文字颜色

    }
  },
  d3View: {
    // 默认六边形边框
    "default": {
      borderWidth: 1,
      // 线粗
      borderColor: "209,209,209",
      // 颜色
      borderAlpha: 0.3,
      // 透明度
      isBgColor: true,
      // 是否填色
      bgColor: "255,255,255",
      // 填色的颜色
      bgAlpha: 1 // 填色的透明度

    },
    // 高亮六边形边框
    selected: {
      borderWidth: 1,
      // 线粗
      borderColor: "209,209,209",
      // 颜色
      borderAlpha: 0.3,
      // 透明度
      isBgColor: true,
      // 是否填色
      bgColor: "255,255,255",
      // 填色的颜色
      bgAlpha: 1 // 填色的透明度

    },
    // Grid Off状态的圆形边框
    offBorder: {
      shape: "circle",
      borderWidth: 1,
      // 线粗
      borderColor: "150,150,200",
      // 颜色
      borderAlpha: 0.3,
      // 透明度
      isBgColor: false,
      // 是否填色
      bgColor: "150,150,200",
      // 填色的颜色
      bgAlpha: 0 // 填色的透明度

    },
    // 默认Edge
    link: {
      width: 2,
      // 线粗
      color: "220,220,220",
      // 颜色
      alpha: 0.3 // 透明度

    },
    // 高亮Edge
    selectedLink: {
      width: 2,
      // 线粗
      color: "1,255,185",
      // 颜色
      alpha: 0.3,
      // 透明度
      lineDashOffset: 0.5 // 线的流速

    },
    titleText: {
      isShow: true,
      // 默认是否显示
      hoverHidden: false,
      // hover是否隐藏
      textAlign: "center",
      // 水平对齐模式 start、end、center
      height: 20,
      // 高度
      width: 50,
      // 宽度
      line: 1,
      // 允许行数上限
      wordCount: 7,
      //文字允许长度上限
      fontFamily: "sans-serif",
      // 字体
      fontSize: "10px",
      // 字号
      fontColor: "#000",
      // 文字颜色
      highlight: false,
      // 是否文字高亮
      highlightColor: "rgba(0,0,0,1)" // 高亮颜色

    }
  },
  // 浮窗
  nodeTip: (_nodeTip = {
    width: "240px",
    // 宽度
    maxRows: 2,
    // 对应最大高度，设置文本多展示多少行
    bgColor: "rgba(51, 51, 51, 0.8)",
    // 底色
    // showBorder: false, // 是否有边框 根据borderWidth判断即可
    borderWidth: "0px",
    // 边框宽度
    borderColor: "rgba(0, 0, 255, 0.8)",
    //边框颜色
    // panelBgImg: false, // panel是否贴图  根据panelBgImgUrl判断即可
    panelBgImgUrl: "",
    // 贴图地址 贴图透明度，可以通过bgColor来控制
    borderBgImg: false,
    // 边框是否贴图
    borderBgUrl: "",
    // 边框图
    borderBgOpacity: 0,
    // 边框透明度 0-1  0代表不透明 1代表透明
    // title
    titleFont: "sans-serif",
    // 标题字体
    titleSize: "14px",
    // 标题字号
    titleColor: "#fff",
    // 标题颜色
    titleTextAlien: "left",
    // 标题对齐方式，可选left，center
    hoverMaxLength: "auto",
    // 允许最大长度，建议根据宽度来决定
    // hoverText
    hoverFont: "sans-serif",
    // 标题字体
    hoverSize: "14px",
    // 标题字号
    hoverColor: "#fff",
    // 标题颜色
    hoverTextAlien: "left"
  }, _defineProperty(_nodeTip, "hoverMaxLength", "auto"), _defineProperty(_nodeTip, "animateIn", "animate__fadeInDown"), _defineProperty(_nodeTip, "animateOut", "animate__fadeOutDown"), _nodeTip),
  linkTip: {
    animateIn: "animate__fadeInUp",
    // 出现动效
    animateOut: "animate__fadeOut" // 消失动效

  },
  // 侧边栏
  focus: (_focus = {
    top: "52px",
    // 距离顶部距离
    width: "20%",
    // 宽度，一个详情是20%，两个则是40%
    bgColor: "rgba(238, 249, 255, 0.8)",
    // 底色
    // showBorder: false, // 是否有边框 根据borderWidth判断即可
    borderWidth: "0px",
    // 边框宽度
    borderColor: "rgba(238, 249, 255, 0.8)",
    //边框颜色
    // panelBgImg: false, // panel是否贴图  根据panelBgImgUrl判断即可
    panelBgImgUrl: "",
    // 贴图地址 贴图透明度，可以通过bgColor来控制
    borderBgImg: false,
    // 边框是否贴图
    borderBgUrl: "",
    // 边框图
    borderBgOpacity: 0,
    // 边框透明度 0-1  0代表不透明 1代表透明
    // title
    titleFont: "sans-serif",
    // 标题字体
    titleBgColor: "#b4d9e6",
    // 标题背景色
    titleSize: "18px",
    // 标题字号
    titleColor: "#000",
    // 标题颜色
    titleTextAlien: "left",
    // 标题对齐方式，可选left，center
    hoverMaxLength: "auto",
    // 允许最大长度，建议根据宽度来决定
    // hoverText
    hoverFont: "sans-serif",
    // 标题字体
    hoverSize: "14px",
    // 标题字号
    hoverColor: "#000",
    // 标题颜色
    hoverTextAlien: "left"
  }, _defineProperty(_focus, "hoverMaxLength", "auto"), _defineProperty(_focus, "animateIn", "animate__fadeInRight"), _defineProperty(_focus, "animateOut", "animate__fadeOutRight"), _focus)
};
var IMAGE_LOOP = 300; // 动态图片渲染间隔，单位毫秒

/**
 * Plugin版插件
 *
 * 使用方式：
 * 1、const pluginGraph = new PluginGraph(opt)
 * 2、pluginGraph.init('app') // 其中app为需要渲染的dom id
 *
 * @param {*} opt
 * @returns
 */

function PluginGraph(opt) {
  // 合并默认配置
  var options = _deepMerge(DEFAULT_OPTIONS, opt); // 全局变量


  var containerDOM = document.body; // 挂载plugin的dom

  var showGridSwitch = true; //显示网格的标识

  var showFocusFlag = true; //是否正在显示侧边栏

  var show2DSwitch = true; //显示2D效果的标识

  var hexeGridCache = new Map(); //虚拟网格的坐标缓存

  var hexeNodeCache = new Map(); //网格节点缓存

  var serverData = null; // 缓存请求到的节点信息

  var isShowNodeTip = false; //是否显示节点tip

  var tipNodeId = null; // 记录当前tip的节点id

  var showNodesMap = {}; // 目前正在显示的节点详情集合

  var algorithm;
  var currentNode = null;
  var globleGraphData = {
    //全局数据定义(服务端返回数据)
    panel_type: "global",
    //数据类型 global|local
    panel_radius: 5,
    //坐标系半径
    grid_radius: options.canvas.DEFAULT_NODE_SIZE,
    //网格节点半径
    nodeInfos: [],
    //点信息
    edgeInfos: [],
    //边信息
    backgroud_global_img: options.canvas.backgroud_global_img,
    backgroud_global_l2_img: options.canvas.backgroud_global_l2_img,
    backgroud_local_img: options.canvas.backgroud_local_img,
    backgroud_local_l2_img: options.canvas.backgroud_local_l2_img
  };
  var i18nConfig = {}; // 国际化配置
  //连线类型定义

  var LINE_TYPE_DICT = {
    straight: "直线",
    elbow: "折线",
    curve: "曲线"
  }; //GraphVis可视化对象通用配置项

  var config = {
    node: {
      //节点的默认配置
      label: {
        //标签配置
        show: false,
        //是否显示
        color: "150,150,200",
        //字体颜色
        font: "normal 14px Arial",
        //字体大小及类型
        textPosition: "Middle_Center" //文字位置 Top_Center,Bottom_Center,Middle_Right,Middle_Center

      },
      shape: "polygon",
      //circle,polygon, 隐含hexagon
      width: options.canvas.DEFAULT_NODE_SIZE * 2,
      height: options.canvas.DEFAULT_NODE_SIZE * 2,
      color: null,
      //节点颜色 '5,13,48'
      borderColor: options.d2View["default"].borderColor,
      //边框颜色
      borderWidth: 1,
      //边框宽度,
      borderAlpha: 0.3,
      //边框透明度
      lineDash: [0],
      //边框虚线间隔,borderWidth>0时生效
      alpha: 1,
      //节点透明度
      higlight: false,
      //节点是否被focus
      selected: {
        //选中时的样式设置
        borderColor: options.d2View.selected.borderColor,
        //选中时边框颜色
        borderAlpha: options.d2View.selected.borderAlpha,
        //选中时的边框透明度
        borderWidth: options.d2View.selected.borderWidth //选中时的边框宽度

      },
      onClick: function onClick(event, node) {
        //单击
        _elementOption.showTipNode(node);
      },
      ondblClick: function ondblClick(event, node) {
        //双击
        if (node.isRealNode) {
          //双击
          console.log("node", node);
        }
      },
      onMouseOver: function onMouseOver(event, node) {
        if (!node.isRealNode) {
          // 如果是虚拟节点，则
          _elementOption.hideTipNode();
        } //悬浮


        node.higlight = true;

        _elementOption.showTipNode(node);

        _higlightNode(node, true); //节点高亮

      },
      onMouseOut: function onMouseOut(event, node) {
        //悬浮
        node.higlight = false;

        _higlightNode(node, false); //取消节点高亮
        // _elementOption.hideTipNode();

      }
    },
    link: {
      //连线的默认配置
      label: {
        //连线标签
        show: false,
        //是否显示
        color: "50,50,50",
        //字体颜色
        font: "normal 13px Arial" //字体大小及类型

      },
      lineType: "direct",
      //连线类型,direct
      colorType: "defined",
      color: options.d2View.link.color,
      //连线颜色
      alpha: options.d2View.link.alpha,
      // 连线透明度
      lineWidth: options.d2View.link.lineWidth,
      //连线宽度
      lineDash: [3, 5, 3],
      //虚线间隔样式如：[5,8]
      showArrow: false,
      //显示连线箭头
      selected: {
        //选中时的样式设置
        color: options.d2View.selectedLink.selectedColor,
        //选中时的颜色
        lineWidth: options.d2View.selectedLink.lineWidth //连线宽度

      },
      onClick: function onClick(event, link) {//单击
        // showLineInfo(link);
      },
      ondblClick: function ondblClick(event, link) {
        //双击
        console.log("clickedlink", link);
      },
      onMouseOver: _linkonMouseOver,
      onMouseOut: function onMouseOut(event, link) {
        //移走
        _elementOption.hideTipLine();
      }
    },
    noElementClick: function noElementClick(event, _graphvis) {// hideNodeTips(); //隐藏提示层
    },
    wheelZoom: 0.9,
    //开启鼠标滚轮缩放null
    highLightNeiber: false,
    //相邻节点高亮开关
    background_global_img: "./images/bg/bg1.png",
    background_local_img: "./images/bg/bg2.jpg"
  };

  function _linkonMouseOver(event, link) {
    _elementOption.showTipLine(event, link);
  } // GraphVis 实例化


  var visgraph; // 当前显示的内容配置

  var iconConfigs = {}; // 封装请求方法

  function _getJSON(url) {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.open("get", url); // 不发送数据到服务器

      request.send(null);

      request.onload = function () {
        // 返回状态为200，即为数据获取成功
        if (request.status == 200) {
          var data = JSON.parse(request.responseText);
          resolve(data);
        } else {
          reject("请求出错");
        }
      };
    });
  } //开始加载动画


  function _startLoadingAnimate() {
    _elementOption.showLoading();
  } //关闭加载动画


  function _closeLoadingAnimate() {
    _elementOption.hideLoading();
  } //合并服务端返回数据给客户端缓存数据


  function _mergeServerData(serveData) {
    globleGraphData["panel_type"] = serveData["panel_type"] || "global"; //数据类型

    globleGraphData["panel_radius"] = serveData["panel_radius"] || 5; //六边形面板半径

    globleGraphData["grid_radius"] = serveData["grid_radius"] || options.canvas.DEFAULT_NODE_SIZE; //网格半径

    globleGraphData["nodeInfos"] = serveData["nodeInfos"] || []; //点数据

    globleGraphData["edgeInfos"] = serveData["edgeInfos"] || []; //边数据

    options.canvas.DEFAULT_NODE_SIZE = globleGraphData["panel_radius"]; //记录点默认半径大小
    // todo 改为调用回调函数，通知外部目前状态
    // monitorPanelType(globleGraphData["panel_type"]); //监控示例数据类型
  } //按服务端返回数据，重新设置图可视化配置


  function _resetGraphConfig() {
    config.node.width = globleGraphData["grid_radius"] * 2; //节点的宽设置

    config.node.height = globleGraphData["grid_radius"] * 2; //节点的高设置

    _reloadConfig();

    console.log(config);
    visgraph.resetConfig(config); //重新设置
  } // 由于2D和3D的配置需要分开，所有切换后需要


  function _reloadConfig() {
    var view = {};

    if (show2DSwitch) {
      view = options.d2View;
    } else {
      view = options.d3View;
    }

    var resetC = {
      node: {
        // color: view.default.isBgColor ? view.default.bgColor : null, //节点颜色
        borderColor: view["default"].borderColor,
        //边框颜色
        borderWidth: view["default"].borderWidth,
        //边框宽度,
        borderAlpha: view["default"].borderAlpha,
        //边框透明度
        alpha: view["default"].bgAlpha,
        //节点透明度
        selected: {
          //选中时的样式设置
          borderColor: view.selected.borderColor,
          //选中时边框颜色
          borderAlpha: view.selected.borderAlpha,
          //选中时的边框透明度
          borderWidth: view.selected.borderWidth //选中时的边框宽度

        }
      },
      link: {
        color: view.link.color,
        //连线颜色
        alpha: view.link.alpha,
        // 连线透明度
        lineWidth: view.link.width,
        //连线宽度
        // lineType: view.selectedLink.lineType,
        selected: {
          //选中时的样式设置
          color: view.selectedLink.color,
          //连线颜色
          alpha: view.selectedLink.alpha,
          // 连线透明度
          lineWidth: view.selectedLink.width //连线宽度

        }
      }
    };
    config = _deepMerge(config, resetC);
    containerDOM.style.backgroundColor = options.canvas.bgColor;
  } //获取图的关键信息


  function _getGraphKeyInfo() {
    var nodes = globleGraphData["nodeInfos"];
    var edges = globleGraphData["edgeInfos"];
    var graphNodes = nodes.map(function (node) {
      if (_isAssetTypeAnGif(node.image)) {
        var seq_count = node.image.split("_");
        seq_count = seq_count[seq_count.length - 2];
        var imgs = [];

        for (var i = 0; i < seq_count; i++) {
          imgs.push("".concat(options.iconMenu, "/").concat(node.image, "/").concat(i, ".svg"));
        }

        return {
          id: node.id,
          gridId: "".concat(node.coors[0], ",").concat(node.coors[1]),
          label: node["titletext"],
          image: "".concat(options.iconMenu, "/").concat(node.image, "/0.svg"),
          images: imgs,
          properties: node
        };
      }

      return {
        id: node.id,
        gridId: "".concat(node.coors[0], ",").concat(node.coors[1]),
        label: node["titletext"],
        image: "".concat(options.iconMenu, "/").concat(node.image),
        properties: node
      };
    });
    var graphLinks = edges.map(function (edge) {
      return {
        id: edge.id,
        source: edge["startnode"],
        target: edge["endnode"],
        lineType: edge["line"],
        properties: edge
      };
    });
    return {
      nodes: graphNodes,
      links: graphLinks
    };
  }

  function _isAssetTypeAnGif(filePath) {
    return filePath.endsWith("_seq");
  } //开启动画效果


  function _showSecneAnimate(nodes, edges, callback) {
    var newNodes = [];
    hexeNodeCache.forEach(function (node, id) {
      if (id != "0,0") {
        node.alpha = 0;
        newNodes.push(node);
      }
    });
    visgraph.animate().timeline({
      targets: newNodes,
      delay: function delay(el, i) {
        return i * options.canvas.animateOpenSpeed;
      },
      duration: options.canvas.animateOpenSpeed,
      easing: "linear",
      complete: function complete() {
        callback(nodes, edges); //动画完成，展示关系网络
      }
    }).add({
      alpha: 1
    });
  } //节点及其关联节点高亮


  function _higlightNode(node, flag) {
    var view = show2DSwitch ? options.d2View : options.d3View;

    if (!node.isRealNode) {
      // 空格子
      node.selectedBorderColor = view["default"].borderColor;
      node.selectedBorderAlpha = view["default"].borderAlpha;
      return;
    }

    if (flag) {
      node.selectedBorderWidth = view.selected.borderWidth;
      node.selectedBorderColor = view.selected.borderAlpha;
      node.selectedBorderAlpha = view.selected.borderColor;
    }

    node.isShowNodeTip = flag; // 增加呼吸灯

    changeNodeAnimateType(node, flag ? "bulb-hover" : null);
    (node.outLinks || []).forEach(function (link) {
      link.showSelected = flag; // if (flag) {
      //   link.lineType = view.selectedLink.lineType;
      // } else {
      //   link.lineType = "direct";
      // }

      link.target.showSelected = flag; // changeNodeAnimateType(link.target, flag ? "bulb-link" : null);
    });
    (node.inLinks || []).forEach(function (link) {
      link.showSelected = flag; // if (flag) {
      //   link.lineType = view.selectedLink.lineType;
      // } else {
      //   link.lineType = "direct";
      // }

      link.source.showSelected = flag; // changeNodeAnimateType(link.source, flag ? "bulb-link" : null);
    });
  }
  /**
   * 修改节点呼吸灯效果
   * @param {*} node 节点实例
   * @param {*} animateType 动画类型，支持bulb-white(异常)、bulb-hover(hover)、bulb-link(关联)，为空时去掉呼吸灯
   */


  function changeNodeAnimateType(node, animateType) {
    if (node._animateType == "bulb-white") return;

    if (!animateType) {
      node.animateNode = false;
      node._animateType = null;
      node._rate = null;
      return;
    } // 异常节点，不需要改变呼吸灯效果


    node.animateNode = true; //增加动画节点标识

    node._direction = 1; // 1正方向  0负方向

    node._rate = 0.5; // 阴影比例

    node._animateType = animateType;

    if (show2DSwitch) {
      node.drawNode = _drawEffectNode;
    } else {
      node.drawNode = _draw3DHexagonNode;
    }
  } //清空所有数据 todo


  function _clearAll() {
    var isthemechange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (!isthemechange) {
      _elementOption.hideFocusInfo();
    } // closeRightPanel();
    // hideNodeTips(); //消除提示层


    visgraph.clearAll(); //清空画布

    hexeNodeCache = new Map(); //网格节点缓存

    hexeGridCache = new Map(); //网格坐标系清空
  } // 加载图标配置


  function _loadIconConfig() {
    var setData;
    return regeneratorRuntime.async(function _loadIconConfig$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_getJSON(options.iconConfig));

          case 2:
            setData = _context.sent;
            iconConfigs = setData;

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  } // 加载图标数据 -- main


  function loadServerData(node) {
    var backDom, dataUrl;
    return regeneratorRuntime.async(function loadServerData$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!node) {
              backDom = document.getElementById("returnPreLevel");
              if (backDom) backDom.classList.add("hidden");
            } else {
              currentNode = node;
            }

            _startLoadingAnimate();

            _clearAll(); //清除原有显示数据
            //如果查询的某个节点下钻数据，则需要根据nodeId从服务端获取


            dataUrl = options.baseurl; //默认的首页数据

            if (node && node.properties.link) {
              // todo 下钻的数据需要增加配置项
              dataUrl = "/data/" + node.properties.link; //下钻示例数据
            }

            console.log("load 数据" + dataUrl);
            _context2.next = 8;
            return regeneratorRuntime.awrap(_getJSON(dataUrl));

          case 8:
            serverData = _context2.sent;

            if (serverData.panel_type == "local") {
              show2DSwitch = false;
              config.node.shape = "hexagon";
            } else {
              show2DSwitch = true;
              config.node.shape = "polygon";
            } //1、获取数据，设置给客户端数据


            _mergeServerData(serverData); //2、设置节点的半径，重新设置配置


            _resetGraphConfig();

            visgraph.stage.resize(); //3、渲染2d场景

            if (show2DSwitch) {
              _render2DScene(); // 2D场景

            } else {
              _render3DScene(); // 3D场景

            }

            setTimeout(function () {
              switchGrid(showGridSwitch); // const [x = 0, y = 0] = options.canvas.position;
              // let gridRadius= globleGraphData["panel_radius"]
              // var centerX = visgraph.stage.width / 2 - gridRadius;
              // var centerY = visgraph.stage.height / 2 - gridRadius;
              // visgraph.scene.setCenter(centerX, centerY); // todo 未开放此方法

              visgraph.translateToCenter();
            }, 10);

            _closeLoadingAnimate(); //关闭加载动画


          case 16:
          case "end":
            return _context2.stop();
        }
      }
    });
  } // 加载图标数据 -- main


  function reloadServerData() {
    var isthemechange,
        node,
        backDom,
        scale,
        translateX,
        translateY,
        dataUrl,
        _args3 = arguments;
    return regeneratorRuntime.async(function reloadServerData$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isthemechange = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : false;
            node = null;

            if (!currentNode) {
              backDom = document.getElementById("returnPreLevel");
              if (backDom) backDom.classList.add("hidden");
            } else {
              node = currentNode;
            } //先保留 scene 的 scale ，transform的值


            scale = visgraph.scene.scaleX;
            translateX = visgraph.scene.translateX;
            translateY = visgraph.scene.translateY;

            _startLoadingAnimate();

            _clearAll(isthemechange); //清除原有显示数据
            //如果查询的某个节点下钻数据，则需要根据nodeId从服务端获取


            dataUrl = options.baseurl; //默认的首页数据

            if (node && node.properties.link) {
              // todo 下钻的数据需要增加配置项
              dataUrl = "/data/" + node.properties.link; //下钻示例数据
            }

            _context3.next = 12;
            return regeneratorRuntime.awrap(_getJSON(dataUrl));

          case 12:
            serverData = _context3.sent;
            // if (serverData.panel_type == "local") {
            //   show2DSwitch = false;
            //   config.node.shape = "hexagon";
            // } else {
            //   show2DSwitch = true;
            //   config.node.shape = "polygon";
            // }
            //1、获取数据，设置给客户端数据
            // _mergeServerData(serverData);
            //2、设置节点的半径，重新设置配置
            // _resetGraphConfig();
            visgraph.stage.resize(); //3、渲染2d场景

            if (show2DSwitch) {
              _render2DScene(); // 2D场景

            } else {
              _render3DScene(isthemechange); // 3D场景

            } // if (scale <= 10 && scale > 0.01) {
            //   visgraph.setZoomRange([scale, options.canvas.zoomRange[1]]); //设置画布缩放比例区间
            // }


            if (isthemechange == false) {
              visgraph.scene.rightOffset = 0;
              visgraph.setZoom("zoomInit");
            } else {
              visgraph.scene.scaleX = scale;
              visgraph.scene.scaleY = scale;
              visgraph.scene.translateX = translateX;
              visgraph.scene.translateY = translateY;
            }

            setTimeout(function () {
              switchGrid(showGridSwitch); // const [x = 0, y = 0] = options.canvas.position;
              // visgraph.setCenter(x, y); todo 未开放此方法

              console.log(visgraph.scene.scaleX, visgraph.scene.scaleY, visgraph.scene.translateX, visgraph.scene.translateY);
            }, 0);

            _closeLoadingAnimate(); //关闭加载动画


          case 18:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
  /************************************
   ************ 渲染2D场景************
   ***********************************/


  function _render2DScene() {
    var isLocal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    //1、按半径，生成六边形网格坐标系统
    if (!isLocal) {
      _generate2DHexeGrid(globleGraphData["panel_radius"]);
    } //2、按网格大小，生成虚拟的网格节点


    _gerenate2DGridNodes(globleGraphData["grid_radius"]); //2.1、判断虚拟图层大小


    gerenateBackground(globleGraphData["panel_radius"], globleGraphData["grid_radius"], globleGraphData["backgroud_global_img"], globleGraphData["backgroud_global_l2_img"]); //3、绘制2D场景图，将数据信息赋值给网格节点

    _draw2DSceneGraph(isLocal);
  } //1、按半径，生成六边形网格坐标系统


  function _generate2DHexeGrid() {
    var panelRadius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
    hexeGridCache = new Map(); //网格系统记录
    //设置中心节点

    _addToHexCache([0, 0], hexeGridCache); //1、生成x,y轴上的点坐标,及其对角线节点坐标


    for (var i = 1; i <= panelRadius; i++) {
      //左侧方向数据生成
      _addToHexCache([-i, i], hexeGridCache); //左上45度方向


      _addToHexCache([-i, -i], hexeGridCache); //左下45度方向
      //右侧方向数据生成


      _addToHexCache([i, i], hexeGridCache); //右上45度方向


      _addToHexCache([i, -i], hexeGridCache); //右下45度方向
      //奇数列


      if (i % 2 == 1) {
        for (var j = 1; j <= panelRadius + 2; j++) {
          if (j % 2 == 1 && j <= panelRadius + 2) {
            _addToHexCache([i, j - 2], hexeGridCache); //右侧y方向向上


            _addToHexCache([i, -j + 2], hexeGridCache); //右侧y方向向下


            _addToHexCache([-i, j - 2], hexeGridCache); //左侧y方向向上


            _addToHexCache([-i, -j + 2], hexeGridCache); //左侧y方向向下

          }
        }
      } else {
        _addToHexCache([0, i], hexeGridCache); //y方向向上正方向


        _addToHexCache([0, -i], hexeGridCache); //y方向向下负方向


        _addToHexCache([-i, 0], hexeGridCache); //x方向向左侧负方向


        _addToHexCache([i, 0], hexeGridCache); //x方向向右侧正方向


        for (var _j = 0; _j < panelRadius; _j++) {
          if (_j % 2 == 0 && _j + 2 <= panelRadius) {
            _addToHexCache([i, _j + 2], hexeGridCache); //右侧y方向向上


            _addToHexCache([i, -_j - 2], hexeGridCache); //右侧y方向向下


            _addToHexCache([-i, _j + 2], hexeGridCache); //左侧y方向向上


            _addToHexCache([-i, -_j - 2], hexeGridCache); //左侧y方向向下

          }
        }
      }
    }
  } //2、按网格大小，生成虚拟的网格节点


  function _gerenate2DGridNodes() {
    var gridRadius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 40;
    visgraph.clearAll(); //清空画布

    var degree = 2 * Math.PI / 6;
    var x0 = Math.round(Math.cos(0) * gridRadius);
    var x1 = Math.round(Math.cos(degree) * gridRadius);
    var y1 = Math.round(Math.sin(degree) * gridRadius);
    var xSpace = x0 + x1; //横向间距计算

    var ySpace = y1; //纵向间距计算
    //画布中心位置

    var centerX = visgraph.canvas.width / 2 - gridRadius;
    var centerY = visgraph.canvas.height / 2 - gridRadius;
    var nodeTmp = null;
    hexeGridCache.forEach(function (hexe, id) {
      nodeTmp = visgraph.addNode({
        id: hexe[0] + "," + hexe[1],
        x: hexe[0] * xSpace + centerX,
        y: -hexe[1] * ySpace + centerY
      });
      nodeTmp.polygonPoints = _computePolygonPoints(x0, x1, y1);
      nodeTmp.dragable = false; //禁止拖动

      hexeNodeCache.set(id, nodeTmp);
    });
    visgraph.setZoom("zoomInit"); //1:1居中显示
  }

  function _computePolygonPoints(x0, x1, y1) {
    //根据生成规则，判断是否
    var postionArr = [{
      x: x0,
      y: 0
    }, {
      x: x1,
      y: y1
    }, {
      x: -x1,
      y: y1
    }, {
      x: -x0,
      y: 0
    }, {
      x: -x1,
      y: -y1
    }, {
      x: x1,
      y: -y1
    }];
    return postionArr;
  } //3、绘制2D场景图，将数据信息赋值给网格节点


  function _draw2DSceneGraph() {
    var graphKeyInfo = _getGraphKeyInfo(); // _startLoadingAnimate();


    _showSecneAnimate(graphKeyInfo.nodes, graphKeyInfo.links, _showRelations); // _closeLoadingAnimate();

  }
  /************************************
   ************ 渲染3D场景************
   ***********************************/


  function _render3DScene() {
    var isLocal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var isthemechange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    //1、按半径，生成六边形网格坐标系统
    _generate3DHexeGrid(globleGraphData["panel_radius"]); //2、按网格大小，生成虚拟的网格节点


    _gerenate3DGridNodes(isthemechange, globleGraphData["grid_radius"]); //2.1、判断虚拟图层大小


    gerenateBackground(globleGraphData["panel_radius"], globleGraphData["grid_radius"], globleGraphData["backgroud_local_img"], globleGraphData["backgroud_local_l2_img"]); //3、绘制3D场景图，将数据信息赋值给网格节点

    _draw3DSceneGraph();
  } //1、按半径，生成六边形网格坐标系统


  function _generate3DHexeGrid() {
    var panelRadius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
    hexeGridCache = new Map(); //网格系统记录

    _addToHexCache([0, 0], hexeGridCache); //中心点


    for (var i = 1; i <= panelRadius; i++) {
      //竖直方向的坐标
      _addToHexCache([0, -i * 2], hexeGridCache); //中心坐标向上


      _addToHexCache([0, i * 2], hexeGridCache); //中心坐标向下

    }

    var panelDirtem = panelRadius * 2; //直径

    for (var _i = 1; _i <= panelRadius; _i++) {
      var innerRadius = panelDirtem - _i; //向两边扩展逐步递减

      if (_i % 2 == 1) {
        //奇数列
        for (var j = 1; j <= innerRadius; j++) {
          if (j % 2 == 1) {
            _addToHexCache([_i, j], hexeGridCache); //右侧坐标向上


            _addToHexCache([_i, -j], hexeGridCache); //右侧坐标向下


            _addToHexCache([-_i, j], hexeGridCache); //左侧坐标向上


            _addToHexCache([-_i, -j], hexeGridCache); //左侧坐标向下

          }
        }
      } else {
        //偶数列
        for (var _j2 = 0; _j2 <= innerRadius; _j2++) {
          if (_j2 % 2 == 0) {
            _addToHexCache([_i, _j2], hexeGridCache); //右侧坐标向上


            _addToHexCache([_i, -_j2], hexeGridCache); //右侧坐标向下


            _addToHexCache([-_i, _j2], hexeGridCache); //左侧坐标向上


            _addToHexCache([-_i, -_j2], hexeGridCache); //左侧坐标向下

          }
        }
      }
    }
  } //2、按网格大小，生成虚拟的网格节点


  function _gerenate3DGridNodes() {
    var isthemechange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var gridRadius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;
    visgraph.clearAll(); //清空画布

    var degree = 2 * Math.PI / 6;
    var x0 = Math.round(Math.cos(0) * gridRadius);
    var x1 = Math.round(Math.cos(degree) * gridRadius);
    var y1 = Math.round(Math.sin(degree) * gridRadius);
    var xSpace = x0 + x1; //横向间距计算

    var ySpace = y1; //纵向间距计算
    //画布中心位置

    var centerX = visgraph.canvas.width / 2 - gridRadius;
    var centerY = visgraph.canvas.height / 2 - gridRadius;
    console.log("画布中心位置", centerX, centerY);
    var nodeTmp = null;
    hexeGridCache.forEach(function (hexe, id) {
      var x = hexe[0] * xSpace + centerX;
      var y = hexe[1] * ySpace + centerY;

      var point = _pointSkewThenRotate(x, y, -30);

      nodeTmp = visgraph.addNode({
        id: hexe[0] + "," + hexe[1],
        x: point.x,
        y: point.y
      });
      nodeTmp.hexagonPoints = _computeHexagonPoints([0, 0], nodeTmp.radius, true);
      nodeTmp.dragable = false; //禁止拖动

      nodeTmp.drawNode = _draw3DHexagonNode; //注册自定义3d网格绘制方式

      nodeTmp.isInBound = function (mouseX, mouseY) {
        //重写注册节点的拾取算法
        var centerX = this.cx,
            centerY = this.cy;
        var anglePoints = this.hexagonPoints.map(function (point) {
          return {
            x: point.x + centerX,
            y: point.y + centerY
          };
        });
        return _pointIsInPolygon({
          x: mouseX,
          y: mouseY
        }, anglePoints);
      };

      hexeNodeCache.set(id, nodeTmp);
    });

    if (isthemechange) {
      visgraph.setZoom("zoomInit"); //1:1居中显示
    } else {
      visgraph.setZoom("zoom1");
    }
  } //3、绘制3D场景图，将数据信息赋值给网格节点


  function _draw3DSceneGraph() {
    _startLoadingAnimate();

    var graphKeyInfo = _getGraphKeyInfo();

    _showSecneAnimate(graphKeyInfo.nodes, graphKeyInfo.links, _show3DRelations);

    _closeLoadingAnimate();
  } //绘制3d视图的六边形（从现有节点计旋转倾斜30度计算各顶点新坐标）


  function _draw3DHexagonNode(ctx) {
    if (this.higlight && this.images && this.images.length >= 2) {
      _drawImageNode(ctx, this, true);
    } else if (this.image) {
      var globleAlpha = ctx.globalAlpha;
      ctx.save();
      ctx.scale(this.scaleX, this.scaleY);
      ctx.globalAlpha = this.alpha; //根据图片size 调整3d node的位置

      var imageflag = this.properties["image"];
      var heightfix = 0;
      (iconConfigs.icon_settings || []).forEach(function (item) {
        if (item.image == imageflag) {
          heightfix = iconConfigs.icon_grid_align[item.align][2] - item.offset[1];
        }
      });
      ctx.drawImage(this.image, -this.image.width / 2, heightfix, this.image.width, this.image.height);
      ctx.globalAlpha = globleAlpha;
      ctx.restore();
    } // this.paintText(ctx);


    if (this.isRealNode) _drawText(ctx, this.label || "");
  }

  function _draw3DHexagonNodeWithCircle(ctx) {
    ctx.save();

    if ((this.showSelected || this.selected) && this.selectedBorderWidth > 0) {
      ctx.lineWidth = this.borderWidth + this.selectedBorderWidth;
      ctx.strokeStyle = "rgba(".concat(this.selectedBorderColor, ",").concat(this.alpha * this.selectedBorderAlpha, ")");
      ctx.stroke();
    }

    ctx.restore();

    if (this.image) {
      var globleAlpha = ctx.globalAlpha;
      ctx.save();
      ctx.globalAlpha = this.alpha; //根据图片size 调整3d node的位置

      var imageflag = this.properties["image"];
      var heightfix = 0;
      (iconConfigs.icon_settings || []).forEach(function (item) {
        if (item.image == imageflag) {
          heightfix = iconConfigs.icon_grid_align[item.align][2] - item.offset[1];
        }
      });
      ctx.drawImage(this.image, -this.image.width / 2, heightfix, this.image.width, this.image.height);
      ctx.globalAlpha = globleAlpha;
      ctx.restore();
    }

    var titleTextConfig = options.d3View.titleText || {};
    if (this.isRealNode && (!this.isShowNodeTip || !titleTextConfig.hoverHidden)) _drawText(ctx, this.label || "");
  } //绘制特殊的连线


  function _drawSpecialLine(ctx) {
    this.drawIndex = 9999;
    var targetNode = this.target;
    var sourceNode = this.source;

    var targettop = _get3DImageHeight(targetNode);

    var sourcetop = _get3DImageHeight(sourceNode);

    var padding = Math.abs(sourceNode.cx - targetNode.cx) / 4; //TODO 可以修改连线高度

    var sx = sourceNode.cx,
        sy = sourceNode.cy - sourcetop;
    var tx = targetNode.cx,
        ty = targetNode.cy - targettop;
    var centerX = (tx + sx) / 2;
    var centerY = (ty + sy) / 2; //var sTopY = sy -(sourceNode.radius + 15);
    //var tTopY = ty -(targetNode.radius + 15);

    var sTopY = sy - padding;
    var tTopY = ty - padding;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(sx, sy); // ctx.lineTo(sx, sTopY);

    /* ctx.lineTo(sx, sTopY);
      ctx.lineTo((sx+centerX)*0.5, (sTopY+centerY)*0.5 - 90);
      ctx.lineTo(centerX,centerY - 150);
      ctx.lineTo((tx+centerX)*0.5, (tTopY+centerY)*0.5 - 90);
      ctx.lineTo(tx,tTopY); */
    //var cp = algorithm.getQuadraticControlPoint(sx, sTopY, tx, tTopY);
    //ctx.quadraticCurveTo(cp.x, cp.y, tx, ty);

    var cp1 = {
      x1: sx - (sx - tx) / 12,
      y1: sy - sourcetop * 3,
      x2: tx + (sx - tx) / 12,
      y2: ty - targettop * 3
    };
    ctx.bezierCurveTo(cp1.x1, cp1.y1, cp1.x2, cp1.y2, tx, ty); // ctx.lineTo(tx, ty);

    if (this.selected || this.showSelected) {
      ctx.strokeStyle = "rgba(".concat(this.selectedColor, ",").concat(this.selectedAlpha, ")");
    } else {
      ctx.strokeStyle = "rgba(".concat(this.strokeColor, ",").concat(this.alpha || 0.8, ")");
    }

    ctx.lineWidth = this.lineWidth;

    if (this.lineDash && this.lineDash.length > 1) {
      ctx.setLineDash([3, 5, 3]);
    }

    ctx.lineCap = "round"; //square、round、butt

    ctx.lineJoin = "round"; //bevel|round|miter

    if (this.animate) {
      ctx.setLineDash([3, 5, 3]);
      ctx.lineDashOffset = this.lineDashOffset -= options.d3View.selectedLink.lineDashOffset;
      this.lineDashOffset = this.lineDashOffset < -100 ? 1 : this.lineDashOffset;
    }

    ctx.stroke();
    ctx.restore();
    this.curvePoints = [sx, sTopY, cp1.x1, cp1.y1, tx, tTopY];
    this.path = [{
      x: sx,
      y: sy
    }, {
      x: sx,
      y: sTopY
    }, {
      x: tx,
      y: tTopY
    }, {
      x: tx,
      y: ty
    }];
  } //特殊连线的鼠标检测事件


  function _isInLineBound(mouseX, mouseY) {
    if (this.path.length < 4) {
      return false;
    }

    var startPoint = this.path[0],
        endPoint = this.path[1];

    if (algorithm.containStroke(startPoint.x, startPoint.y, endPoint.x, endPoint.y, this.lineWidth, mouseX, mouseY)) {
      return true;
    } else {
      startPoint = this.path[2], endPoint = this.path[3];

      if (algorithm.containStroke(startPoint.x, startPoint.y, endPoint.x, endPoint.y, this.lineWidth, mouseX, mouseY)) {
        return true;
      }
    }

    var pos = this.curvePoints;
    return algorithm.containQuadraticStroke(pos[0], pos[1], pos[2], pos[3], pos[4], pos[5], this.lineWidth, mouseX, mouseY);
  }
  /************************************
   ************ 工具函数 ************
   ***********************************/
  //对坐标点进行倾斜旋转指定度数，计算新坐标


  function _pointSkewThenRotate(x, y, angle) {
    var rdi = angle / 180 * Math.PI; //倾斜

    var _x = y * Math.sin(rdi) + x;

    var _y = y * Math.cos(rdi); //旋转


    return {
      x: _x * Math.cos(rdi) + _y * Math.sin(rdi),
      y: -_x * Math.sin(rdi) + _y * Math.cos(rdi)
    };
  } //计算六边形各顶点在3D场景下的坐标位置


  function _computeHexagonPoints() {
    var center = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
    var is25D = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var h = parseInt(radius * Math.sqrt(3) * 0.5);
    var fixradius = parseInt(radius / 2);
    var postionArr = [{
      x: -fixradius,
      y: h
    }, {
      x: fixradius,
      y: h
    }, {
      x: fixradius * 2,
      y: 0
    }, {
      x: fixradius,
      y: -h
    }, {
      x: -fixradius,
      y: -h
    }, {
      x: -fixradius * 2,
      y: 0
    }];

    if (is25D) {
      for (var i = 0; i < postionArr.length; i++) {
        var point = _pointSkewThenRotate(postionArr[i].x, postionArr[i].y, -30);

        postionArr[i].x = point.x;
        postionArr[i].y = point.y;
      }
    }

    for (var _i2 = 0; _i2 < postionArr.length; _i2++) {
      postionArr[_i2].x = Math.round(postionArr[_i2].x + center[0]);
      postionArr[_i2].y = Math.round(postionArr[_i2].y + center[0]);
    }

    return postionArr;
  } //鼠标位置包裹检测算法


  function _pointIsInPolygon(checkPoint, polygonPoints) {
    var counter = 0;
    var i;
    var xinters;
    var p1, p2;
    var pointCount = polygonPoints.length;
    p1 = polygonPoints[0];

    for (i = 1; i <= pointCount; i++) {
      p2 = polygonPoints[i % pointCount];

      if (checkPoint.x > Math.min(p1.x, p2.x) && checkPoint.x <= Math.max(p1.x, p2.x)) {
        if (checkPoint.y <= Math.max(p1.y, p2.y)) {
          if (p1.x != p2.x) {
            xinters = (checkPoint.x - p1.x) * (p2.y - p1.y) / (p2.x - p1.x) + p1.y;

            if (p1.y == p2.y || checkPoint.y <= xinters) {
              counter++;
            }
          }
        }
      }

      p1 = p2;
    }

    if (counter % 2 == 0) {
      return false;
    } else {
      return true;
    }
  } //添加至网格缓存


  function _addToHexCache(hex, hexeCache) {
    var id = "".concat(hex[0], ",").concat(hex[1]);

    if (!hexeCache.get(id)) {
      hexeCache.set(id, hex);
    }
  } //对关系数据进行可视化渲染，设置节点图片，添加连线等


  function _showRelations(nodes, links) {
    var effectNodes = []; //有动画效果的节点

    nodes.forEach(function (node) {
      //获取网格实际的节点
      var targetNode = hexeNodeCache.get(node.gridId);

      if (targetNode) {
        targetNode.id = node.id;
        targetNode.label = node.label;
        targetNode.gridId = node.gridId;
        targetNode.images = [];
        targetNode.setImage(node.image); //设置节点的图标

        targetNode.path = node.image;
        targetNode.fillColor = options.d2View["default"].isBgColor ? options.d2View["default"].bgColor : null; //此处需要对有图标的节点设置背景色

        targetNode.properties = node.properties; //设置为扩展属性

        targetNode.isRealNode = true; //实际节点标识

        targetNode.link = node.properties.link; //下钻链接地址

        var animateType = ["bulb-white", "bulb-hover"]; // 动画类型，支持两种

        if (Array.isArray(node.images) && node.images.length > 1) {
          // 判断是否是gif
          node.images.forEach(function _callee(imgS) {
            var res;
            return regeneratorRuntime.async(function _callee$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return regeneratorRuntime.awrap(_loadImage(imgS));

                  case 2:
                    res = _context4.sent;
                    targetNode.images.push(res);

                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          });
          targetNode.imageCount = node.images.length;
          targetNode.animateNode = true; //增加动画节点标识

          effectNodes.push(targetNode);
          targetNode.higlight = false;
        } else if (animateType.includes(node.properties["effect"])) {
          //如果有呼吸灯效果属性，则加入动画效果
          targetNode.animateNode = true; //增加动画节点标识

          targetNode._direction = 1; // 1正方向  0负方向

          targetNode._rate = 0.5; // 阴影比例

          targetNode._animateType = node.properties["effect"];
          effectNodes.push(targetNode);
        } else {
          effectNodes.push(targetNode); // node.drawNode = drawEffectNode;
        }
      }
    }); //加动画效果

    _addAnimateLoop(effectNodes); //添加连线


    var linkTmp = null;
    links.forEach(function (_link) {
      linkTmp = visgraph.addEdge(_link);

      if (linkTmp != null) {
        //连线经过的节点坐标位置
        var linePoints = [];
        (_link.properties["path"] || []).forEach(function (coors) {
          var gridNode = hexeNodeCache.get("".concat(coors[0], ",").concat(coors[1]));

          if (gridNode) {
            linePoints.push([gridNode.cx, gridNode.cy]);
          }
        });
        linkTmp.alpha = 0;
        linkTmp.linePoints = linePoints; //linkTmp.lineDash = [5,2,3]; //设置连线的虚线样式

        linkTmp.drawLine = _drawDeined2DLine;
        linkTmp.animate = true;
      }
    });
    visgraph.animate({
      targets: visgraph.links,
      duration: 1000,
      easing: "linear",
      alpha: 1
    });
  } //显示2.5D的关系


  function _show3DRelations(nodes, links) {
    //节点ID对应节点的信息
    var nodeIdMapNode = new Map();
    var effectNodes = []; //有动画效果的节点

    nodes.forEach(function (node) {
      //获取网格实际的节点
      var targetNode = hexeNodeCache.get(node.gridId);

      if (targetNode) {
        targetNode.id = node.id;
        targetNode.label = node.label;
        targetNode.gridId = node.gridId;
        targetNode.images = [];

        if (Array.isArray(node.images) && node.images.length > 1) {
          // 判断是否是gif
          node.images.forEach(function _callee2(imgS) {
            var res;
            return regeneratorRuntime.async(function _callee2$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return regeneratorRuntime.awrap(_loadImage(imgS));

                  case 2:
                    res = _context5.sent;
                    targetNode.images.push(res);

                  case 4:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          });
          targetNode.imageCount = node.images.length;
          targetNode.animateNode = true; //增加动画节点标识

          effectNodes.push(targetNode);
          targetNode.higlight = false;
        }

        targetNode.setImage(node.image); //设置节点的图标
        //targetNode.fillColor = NODE_DEFAULT_COLOR;//此处需要对有图标的节点设置背景色

        targetNode.properties = node.properties; //设置为扩展属性

        targetNode.isRealNode = true; //实际节点标识

        targetNode.link = node.properties.link; //下钻链接地址
        //如果有呼吸灯效果属性，则加入动画效果

        var animateType = ["bulb-white", "bulb-hover"]; // 动画类型，支持两种 bulb-hover是点击详情时的临时呼吸灯

        if (animateType.includes(node.properties["effect"])) {
          targetNode.animateNode = true; //增加动画节点标识

          effectNodes.push(targetNode);
        }

        nodeIdMapNode.set(node.id, targetNode);
      }
    }); //添加连线

    var linkTmp = null;
    links.forEach(function (_link) {
      //如果是曲线类型，需要进行转换适配
      if (_link.lineType == "curve") {
        var sourceId = _link.source;
        var targetId = _link.target;
        var sourceNode = nodeIdMapNode.get(sourceId);
        var targetNode = nodeIdMapNode.get(targetId); //如果起始节点在目标节点的右侧，则对其进行颠倒,

        if (sourceNode.x > targetNode.x) {
          _link.source = targetId;
          _link.target = sourceId;
        }
      }

      linkTmp = visgraph.addEdge(_link); //添加可视化连线

      if (linkTmp != null) {
        if (_link.lineType == "curve") {
          //如果为曲线，则需要设置连线类型
          //linkTmp.lineType = 'curver';//二次曲线curver bezier
          //linkTmp.curveness = 0.42; //曲线曲率
          linkTmp.animate = true; //连线动画开启

          linkTmp.drawLine = _drawSpecialLine; //绘制特殊连线

          linkTmp.isInBound = _isInLineBound; //特殊连线鼠标碰撞检测
        } else {
          //连线经过的节点坐标位置
          var linePoints = [];
          (_link.properties["path"] || []).forEach(function (coors) {
            var gridNode = hexeNodeCache.get("".concat(coors[0], ",").concat(coors[1]));

            if (gridNode) {
              linePoints.push([gridNode.cx, gridNode.cy]);
            }
          });
          linkTmp.linePoints = linePoints;
          linkTmp.animate = true; //连线动画开启
          //linkTmp.lineDash = [5,2,3]; //设置连线的虚线样式

          linkTmp.drawLine = _drawDeined2DLine;
        }
      }
    });
    visgraph.animate({
      targets: visgraph.links,
      duration: 1000,
      easing: "linear",
      alpha: 1
    });
  }

  function _loadImage(src) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.setAttribute("crossOrigin", "Anonymous");
      img.src = src;

      img.onload = function () {
        resolve(img);
      };
    });
  }

  function _get3DImageHeight(node) {
    var imageflag = node.properties["image"];
    var height = 0;
    (iconConfigs.icon_settings || []).forEach(function (item) {
      if (item.image == imageflag) {
        height = item.offset[1] - iconConfigs.icon_grid_align[item.align][2];
      }
    });
    return height;
  } //节点自定义开发动画效果


  function _addAnimateLoop() {
    var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    nodes.forEach(function (_node) {
      _node.drawNode = _drawEffectNode; // if (_node.images && _node.images.length > 0) {
      //   _node.drawNode = _drawGif;
      // } else {
      //   _node.drawNode = _drawEffectNode;
      // }
    });
  }
  /**
   * canvas绘制节点的动效
   * @param ctx:canvas绘制上下文环境
   */


  function _drawEffectNode(ctx) {
    if (!this.isRealNode) return; //如果节点不是真实节点，不做任何动效处理

    var realSize = this.radius - 25; //中心部分的半径

    this.animate = this.animate > 10 ? 0 : this.animate; //定义一个可变属性

    this.animate += 0.12; //动画步长

    ctx.save(); //绘制节点前需要保存上下文环境，防止样式污染（必须）

    ctx.scale(this.scaleX, this.scaleY);
    ctx.moveTo(0, 0); //移动到节点的中心位置（必须）
    //绘制一个圆形区域

    ctx.beginPath();

    if (!this.showSelected) {
      if (!showGridSwitch) {
        if (options.d2View.offBorder.isBgColor) {
          this.fillColor = options.d2View.offBorder.bgColor;
          this.alpha = options.d2View.offBorder.bgAlpha;
        } else {
          this.fillColor = null;
          this.alpha = 1;
        }
      } else {
        if (options.d2View["default"].isBgColor) {
          this.fillColor = options.d2View["default"].bgColor;
          this.alpha = options.d2View["default"].bgAlpha;
        } else {
          this.fillColor = null;
          this.alpha = 1;
        }
      }
    } else {
      if (options.d2View.selected.isBgColor) {
        this.fillColor = options.d2View.selected.bgColor;
        this.alpha = options.d2View.selected.bgAlpha;
      }
    } // if (!this.fillColor) {
    //   this.fillColor = options.canvas.bgColor;
    //   this.alpha = 1;
    // }


    var alpha = this.alpha || 1;
    var fillColor = this.fillColor ? "rgba(" + this.fillColor + "," + this.alpha + ")" : options.canvas.bgColor;
    ctx.fillStyle = "rgba(0,0,0,0)"; // 避免出现填充色
    // ctx.fillStyle = "rgba(" + fillColor + "," + alpha + ")";

    ctx.arc(0, 0, this.radius - 10, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill(); // 绘制呼吸灯

    var shadowColor = {
      "bulb-white": "rgb(254,123,106)",
      // 异常
      "bulb-hover": "rgb(36,183,229)",
      // 选中
      "bulb-link": "rgb(149,218,240)" // 与选中关联的

    };

    if (this._animateType && this._rate) {
      if (this._direction == 0) {
        this._rate = this._rate - 0.01;
      } else {
        this._rate = this._rate + 0.01;
      }

      if (this._rate >= 1) {
        this._direction = 0;
        this._rate = 1;
      }

      if (this._rate <= 0.5) {
        this._direction = 1;
        this._rate = 0.5;
      }

      var radius = 40; // 阴影大小

      var radialgradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      radialgradient.addColorStop(0, shadowColor[this._animateType]);
      radialgradient.addColorStop(this._rate, fillColor);
      radialgradient.addColorStop(1, fillColor);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = radialgradient;
      ctx.fill();
    } else if (this.showSelected && this.isRealNode) {
      var _radius = 40; // 阴影大小

      var _radialgradient = ctx.createRadialGradient(0, 0, 0, 0, 0, _radius);

      _radialgradient.addColorStop(0, shadowColor["bulb-link"]);

      _radialgradient.addColorStop(0.9, fillColor);

      _radialgradient.addColorStop(1, fillColor);

      ctx.beginPath();
      ctx.arc(0, 0, _radius, 0, 2 * Math.PI);
      ctx.fillStyle = _radialgradient;
      ctx.fill();
    }

    if (this.images && this.images.length >= 2) {
      _drawImageNode(ctx, this);
    } else if (this.image) {
      var globalAlpha = ctx.globalAlpha;
      ctx.globalAlpha = this.alpha;
      ctx.arc(-2 * this.radius, -2 * this.radius, this.radius, 0, 2 * Math.PI);
      ctx.clip(); //ctx.drawImage(this.image, -this.radius / 2, -this.radius / 2, this.radius, this.radius);

      ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2, this.image.width, this.image.height);
      ctx.globalAlpha = globalAlpha;
    }

    ctx.restore(); //恢复外部绘制环境（必须）
    // 绘制文字

    var titleTextConfig = options.d2View.titleText || {};
    if (this.isRealNode && (!this.isShowNodeTip || !titleTextConfig.hoverHidden)) _drawText(ctx, this.label || "");
  }
  /**
   * 渲染动图
   * @param {*} ctx
   * @param {*} that
   */


  function _drawImageNode(ctx, that) {
    var is3D = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (that.imageIndex == undefined) {
      // 首次渲染
      that.imageIndex = 0;
      that.imageDate = new Date().getTime();
    } else {
      var now = new Date().getTime();

      if (that.imageDate + IMAGE_LOOP < now) {
        if (that.imageIndex == that.imageCount - 1) {
          that.imageIndex = 0;
        } else {
          that.imageIndex++;
        }

        that.imageDate = new Date().getTime();
      }
    }

    var imageIndex = that.imageIndex; // 当前渲染到哪一张图片

    if (is3D) {
      var globleAlpha = ctx.globalAlpha;
      ctx.save();
      ctx.scale(that.scaleX, that.scaleY);
      ctx.globalAlpha = that.alpha; //根据图片size 调整3d node的位置

      var imageflag = that.properties["image"];
      var heightfix = 0;
      (iconConfigs.icon_settings || []).forEach(function (item) {
        if (item.image == imageflag) {
          heightfix = iconConfigs.icon_grid_align[item.align][2] - item.offset[1];
        }
      });
      ctx.drawImage(that.images[imageIndex], -that.image.width / 2, heightfix, that.image.width, that.image.height);
      ctx.globalAlpha = globleAlpha;
      ctx.restore();
    } else {
      var globalAlpha = ctx.globalAlpha;
      ctx.globalAlpha = that.alpha;
      ctx.arc(-2 * that.radius, -2 * that.radius, that.radius, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(that.images[imageIndex], -that.radius / 2, -that.radius / 2, that.radius, that.radius);
      ctx.globalAlpha = globalAlpha;
    }
  } // 添加节点文字


  function _drawText(ctx, text) {
    var titleTextConfig = (show2DSwitch ? options.d2View.titleText : options.d3View.titleText) || {};
    if (titleTextConfig.isShow == false) return;
    ctx.save(); //绘制节点前需要保存上下文环境，防止样式污染（必须）

    ctx.scale(1, 1);
    var w = titleTextConfig.width || 50;
    var h = titleTextConfig.height || 20;
    var x = -(w / 2);
    var y = 48;
    var r = titleTextConfig.borderRadius || 10;
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;

    if (show2DSwitch) {
      // 2D需要渲染外框
      ctx.beginPath(); // ctx.moveTo(x + r, y);
      // ctx.arcTo(x + w, y, x + w, y + h, r);
      // ctx.lineTo(x + w, y + h);
      // ctx.lineTo(x, y + h);
      // ctx.arcTo(x, y, x + w, y, r);

      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.fillStyle = titleTextConfig.bgColor;
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = titleTextConfig.fontColor;
      var count = titleTextConfig.wordCount || 7;

      if (text.length > count) {
        text = text.substring(0, count) + "...";
      } // ctx.fillRect(x, y, w, h);


      ctx.textAlign = titleTextConfig.textAlign || "center";
      ctx.font = "normal normal ".concat(titleTextConfig.fontSize || "10px", " ").concat(titleTextConfig.fontFamily);
      ctx.textBaseline = "middle";
      ctx.fillText(text, w / 2 + x, h / 2 + y + 2);
    } else {
      ctx.fillStyle = titleTextConfig.fontColor;

      if (titleTextConfig.highlight) {
        ctx.shadowColor = titleTextConfig.highlightColor;
      }

      ctx.shadowOffsetX = -3;
      ctx.shadowOffsetY = -3;
      ctx.shadowBlur = 5;
      ctx.translate(15, -15);
      ctx.rotate(-10 * Math.PI / 180);

      var _count = titleTextConfig.wordCount || 5;

      if (text.length > _count) {
        text = text.substring(0, _count) + "...";
      } // ctx.fillRect(x, y, w, h);


      ctx.textAlign = titleTextConfig.textAlign || "center";
      ctx.font = "normal normal ".concat(titleTextConfig.fontSize || "10px", " ").concat(titleTextConfig.fontFamily);
      ctx.textBaseline = "middle";
      ctx.fillText(text, w / 2 + x, h / 2 + y + 2);
    }

    ctx.restore(); //恢复外部绘制环境（必须）
  } //绘制自定义连线


  function _drawDeined2DLine(ctx) {
    var lineStyle = "rgba(".concat(this.strokeColor, ",").concat(this.alpha, ")");

    if (this.selected || this.showSelected) {
      lineStyle = "rgba(".concat(this.selectedColor, ",").concat(this.selectedAlpha, ")");
      ctx.lineWidth = options.d2View.selectedLink.width;
    } else {
      ctx.lineWidth = this.lineWidth;
    } //连线路径,用于计算鼠标是否在连线上的路径


    this.path = [];
    ctx.beginPath();
    ctx.moveTo(this.source.cx, this.source.cy); //如果是折线

    if (LINE_TYPE_DICT[this.lineType] == "折线") {
      for (var i = 0; i < this.linePoints.length; i++) {
        var point = this.linePoints[i];
        ctx.lineTo(point[0], point[1]);
        this.path.push({
          x: point[0],
          y: point[1]
        });
      }
    } else {
      ctx.lineTo(this.target.cx, this.target.cy);
      this.path.push({
        x: this.source.cx,
        y: this.source.cy
      });
      this.path.push({
        x: this.target.cx,
        y: this.target.cy
      });
    }

    ctx.strokeStyle = lineStyle;

    if (this.animate) {
      if (this.selected || this.showSelected) {
        ctx.setLineDash(options.d2View.selectedLink.lineType || [3, 5, 3]);
      } else {
        ctx.setLineDash([3, 5, 3]);
      }

      ctx.lineDashOffset = this.lineDashOffset -= options.d2View.selectedLink.lineDashOffset;
      this.lineDashOffset = this.lineDashOffset < -100 ? 1 : this.lineDashOffset;
    }

    ctx.stroke();
  }

  function _sleep() {
    var time,
        _args6 = arguments;
    return regeneratorRuntime.async(function _sleep$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            time = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : 1000;
            return _context6.abrupt("return", new Promise(function (resolve) {
              setTimeout(function () {
                resolve();
              }, time);
            }));

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    });
  } // 对象深度合并


  function _deepMerge() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    target = _deepClone(target); //深度克隆

    if (_typeof(target) !== "object" || _typeof(source) !== "object") return false; //判断类型

    for (var prop in source) {
      if (!source.hasOwnProperty(prop)) continue; //检测属性是否为对象的自有属性

      if (prop in target) {
        //prop 中是否有 target 属性
        if (_typeof(target[prop]) !== "object") {
          target[prop] = source[prop];
        } else {
          if (_typeof(source[prop]) !== "object") {
            target[prop] = source[prop];
          } else {
            // 避免数组合并
            target[prop] = _deepMerge(target[prop], source[prop]); //递归
            //   if (target[prop].concat && source[prop].concat) {
            //   target[prop] = target[prop].concat(source[prop]); //合并
            // } else {
            //   target[prop] = _deepMerge(target[prop], source[prop]); //递归
            // }
          }
        }
      } else {
        target[prop] = source[prop];
      }
    }

    return target;
  } // 深度克隆


  function _deepClone(obj) {
    // 对常见的“非”值，直接返回原来值
    if ([null, undefined, NaN, false].includes(obj)) return obj;

    if (_typeof(obj) !== "object" && typeof obj !== "function") {
      //原始类型直接返回
      return obj;
    }

    var o = _isArray(obj) ? [] : {};

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = _typeof(obj[i]) === "object" ? _deepClone(obj[i]) : obj[i];
      }
    }

    return o;
  }

  function _isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  } // 集中所有动态添加dom元素的方法


  var _elementOption = {
    // 创建画布区域dom
    createGraphDom: function createGraphDom(parentDom) {
      // const parentId = parentDom.getAttribute("id");
      var dom = document.createElement("div");
      dom.setAttribute("id", "graph-container");
      dom.classList.add("graph-container");
      parentDom.appendChild(dom); // 设置背景图,换成复杂的了
      // options.backgroudImg && setBackgroundImg(options.backgroudImg);

      return dom;
    },

    /******* link相关 *******/
    createTipLine: function createTipLine(parentDom) {
      var dom = document.createElement("div");
      dom.setAttribute("id", "tip-line");
      dom.classList.add("tip-line");
      var LineParent = document.createElement("div");
      LineParent.setAttribute("id", "tip-line-container");
      LineParent.classList.add("tip-line-container");
      LineParent.classList.add("animate__animated");
      LineParent.classList.add(options.linkTip.animateOut); // 默认隐藏状态

      LineParent.appendChild(dom);
      parentDom.appendChild(LineParent);
    },
    showTipLine: function showTipLine(event, link) {
      if (isShowNodeTip) return;
      var pageX = event.pageX,
          pageY = event.pageY;

      var _ref = link || {},
          _ref$properties = _ref.properties,
          properties = _ref$properties === void 0 ? {} : _ref$properties;

      var hovertext = properties.hovertext; // if (!hovertext) return;

      var dom = document.getElementById("tip-line");
      dom.innerText = hovertext || i18nConfig["zan-wu-miao-shu-nei-rong"];
      var LineParent = document.getElementById("tip-line-container");
      LineParent.style.left = pageX + "px";
      LineParent.style.top = pageY + "px";
      LineParent.classList.add(options.linkTip.animateIn);
      LineParent.classList.remove(options.linkTip.animateOut);
    },
    hideTipLine: function hideTipLine() {
      var dom;
      return regeneratorRuntime.async(function hideTipLine$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!isShowNodeTip) {
                _context7.next = 2;
                break;
              }

              return _context7.abrupt("return");

            case 2:
              dom = document.getElementById("tip-line-container");
              dom.classList.remove(options.linkTip.animateIn);
              dom.classList.add(options.linkTip.animateOut); // 避免遮挡

              dom.style.left = 10000 + "px";
              dom.style.top = 10000 + "px";

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      });
    },

    /******* end *******/

    /******* node相关 *******/
    createTipNode: function createTipNode(parentDom) {
      var dom = document.createElement("div");
      dom.setAttribute("id", "tip-node");
      dom.classList.add("tip-node");
      dom.classList.add("animate__animated");
      dom.classList.add(options.nodeTip.animateOut); // 默认隐藏状态

      var headerDom = document.createElement("div");
      headerDom.classList.add("tip-node-header"); // 标题区域

      var titleDom = document.createElement("div");
      titleDom.setAttribute("id", "tip-node-title");
      headerDom.appendChild(titleDom); // 按钮区域

      var toolbarDom = document.createElement("div");
      toolbarDom.classList.add("flex"); // 按钮区域1--下级按钮

      var childLinkDom = document.createElement("div");
      childLinkDom.setAttribute("id", "tip-node-link-child");
      childLinkDom.addEventListener("click", function () {
        findRelations(tipNodeId);
      }); // 按钮区域2--详情按钮

      var childInfoDom = document.createElement("div");
      childInfoDom.setAttribute("id", "tip-node-link-info");
      childInfoDom.addEventListener("click", function () {
        _elementOption.showFocusInfo(tipNodeId);
      });
      toolbarDom.appendChild(childLinkDom);
      toolbarDom.appendChild(childInfoDom);
      headerDom.appendChild(toolbarDom); // 描述区域

      var descDom = document.createElement("div");
      descDom.setAttribute("id", "tip-node-desc");
      dom.appendChild(headerDom);
      dom.appendChild(descDom);
      parentDom.appendChild(dom);
    },
    showTipNode: function showTipNode(node) {
      if (!node.isRealNode) return; // 设置文案

      var tipNodeTitle = document.getElementById("tip-node-title");
      var tipNodeDesc = document.getElementById("tip-node-desc");
      tipNodeTitle.innerText = node.properties.titletext || i18nConfig["biao-ti"];
      tipNodeDesc.innerText = node.properties.hovertext || i18nConfig["miao-shu-nei-rong"]; // 暂时置为普通形状，避免影响视觉效果

      tipNodeTitle.style.cursor = "default";
      tipNodeDesc.style.cursor = "default";
      tipNodeId = node.id; // 显示 or 隐藏 按钮

      var linkChildDom = document.getElementById("tip-node-link-child");

      if (node.properties["link"]) {
        linkChildDom.classList.remove("disabled");
      } else {
        linkChildDom.classList.add("disabled");
      } // 计算显示位置，显示tip-node


      var scale = visgraph.scene.scaleX;
      var offsetY = node.radius * scale * 0.86;

      if (!show2DSwitch) {
        offsetY = node.radius * scale * 0.5; //3D状态下需要偏移向上
      }

      var pagePostion = visgraph.getPagePosition(node.cx, node.cy);
      var tipNodeDom = document.getElementById("tip-node");
      tipNodeDom.style.cursor = "default";
      tipNodeDom.style.left = pagePostion.pageX - 140 + "px";
      tipNodeDom.style.top = pagePostion.pageY + offsetY / visgraph.stage.pixelRatio + "px";
      tipNodeDom.classList.remove(options.nodeTip.animateOut);
      tipNodeDom.classList.add(options.nodeTip.animateIn);
      setTimeout(function () {
        tipNodeTitle.style.cursor = "text";
        tipNodeDesc.style.cursor = "text";
      }, 500);
      isShowNodeTip = true;
    },
    hideTipNode: function hideTipNode() {
      var tipNodeDom = document.getElementById("tip-node");
      tipNodeDom.classList.remove(options.nodeTip.animateIn);
      tipNodeDom.classList.add(options.nodeTip.animateOut);
      tipNodeDom.style.left = 10000 + "px";
      tipNodeDom.style.top = 10000 + "px";
      isShowNodeTip = false;
    },

    /******* end *******/

    /******* 侧边栏 *******/
    createFocusDom: function createFocusDom(parentDom) {
      var dom = document.createElement("div");
      dom.setAttribute("id", "focus-info");
      dom.classList.add("focus-info");
      dom.classList.add("animate__animated");
      dom.classList.add(options.focus.animateOut); // 默认隐藏状态
      // 节点详情的包裹，可容纳多个节点详情，实际节点显示的内容，动态添加

      var wrap = document.createElement("div");
      wrap.setAttribute("id", "focus-info-wrap");
      wrap.classList.add("focus-info-wrap"); // 创建连线的详情，默认详情，内容动态添加

      var Line = document.createElement("div");
      Line.setAttribute("id", "focus-info-line");
      Line.classList.add("focus-info-line");
      Line.style.display = "none"; // 关闭按钮

      var closeBtn = document.createElement("div");
      closeBtn.classList.add("focus-info-close");
      closeBtn.addEventListener("click", _elementOption.hideFocusInfo);
      dom.appendChild(closeBtn);
      dom.appendChild(wrap);
      dom.appendChild(Line);
      parentDom.appendChild(dom);
    },
    showFocusInfo: function showFocusInfo(nodeId) {
      // 重复点击，不处理
      if (showNodesMap[nodeId]) return;
      if (!serverData) return; // 没有返回节点信息

      var _serverData = serverData,
          _serverData$nodeInfos = _serverData.nodeInfos,
          nodeInfos = _serverData$nodeInfos === void 0 ? [] : _serverData$nodeInfos,
          _serverData$edgeInfos = _serverData.edgeInfos,
          edgeInfos = _serverData$edgeInfos === void 0 ? [] : _serverData$edgeInfos;
      var node = nodeInfos.find(function (item) {
        return item.id == nodeId;
      });
      var LineInfo = null; // 1.比较现在正在显示的节点，和当前节点之间是否存在连线

      if (Object.keys(showNodesMap).length == 1) {
        var otherNode = showNodesMap[Object.keys(showNodesMap)[0]];
        var otherId = otherNode.id;
        var hasLine = edgeInfos.some(function (item) {
          var startnode = item.startnode,
              endnode = item.endnode;

          if (startnode == nodeId && endnode == otherId || startnode == otherId && endnode == nodeId) {
            LineInfo = item;
            return true;
          }

          return false;
        });

        if (!hasLine) {
          // 两个节点之间没有关联
          showNodesMap = {
            nodeId: node
          };
        } else {
          // 两个节点之间有关联
          showNodesMap[nodeId] = node;
        }
      } else {
        showNodesMap = {
          nodeId: node
        };
      } // 2. 渲染节点详情


      var wrap = document.getElementById("focus-info-wrap");
      if (!wrap) return false;
      wrap.innerHTML = null; // 清空所有子节点

      Object.keys(showNodesMap).map(function (id) {
        var node = showNodesMap[id];

        var _ref2 = node || {},
            titletext = _ref2.titletext,
            focustext = _ref2.focustext,
            type = _ref2.type;

        var content = document.createElement("div");
        content.classList.add("focus-content");
        var header = document.createElement("div");
        header.classList.add("focus-info-title");
        header.innerText = titletext;
        content.appendChild(header);
        var contentWrapDom = document.createElement("div");
        contentWrapDom.classList.add("content-wrap");

        function createTypeDom() {
          var typeDom = document.createElement("div");
          typeDom.classList.add("node-focus");
          typeDom.innerHTML = "<span class=\"node-focus-title\" i18n='jie-dian-lei-xing'>".concat(i18nConfig["jie-dian-lei-xing"], "</span>\n          <span class=\"node-focus-value\">").concat(type, "</span>");
          return typeDom;
        }

        if (focustext && _typeof(focustext) === "object") {
          contentWrapDom.appendChild(createTypeDom());
          Object.keys(focustext).forEach(function (k) {
            var v = focustext[k];
            var focusDom = document.createElement("div");
            focusDom.classList.add("node-focus");

            if (v.includes("entities")) {
              // 图片
              focusDom.innerHTML = " <span class=\"node-focus-title\">".concat(k, "</span>\n              <div class=\"node-focus-img\">\n                <img fullscreen src=\"").concat(v, "\" />\n              </div>");
            } else if (typeof v == "string") {
              focusDom.innerHTML = " <span class=\"node-focus-title\">".concat(k, "</span>\n              <span class=\"node-focus-value\">").concat(v, "</span>");
            } else if (Array.isArray(v)) {
              // 数组
              var liStr = v.map(function (i) {
                return "<li>".concat(i, "</li>");
              }).join("");
              focusDom.innerHTML = " <span class=\"node-focus-title\">".concat(k, "</span>\n              <ul class=\"node-focus-ul\">").concat(liStr, "</ul>");
            }

            contentWrapDom.appendChild(focusDom);
          });
        } else {
          contentWrapDom.appendChild(createTypeDom());
        }

        content.appendChild(contentWrapDom);
        wrap.appendChild(content);
      }); // 显示节点详情

      var nodeInfoDom = document.getElementById("focus-info");
      nodeInfoDom.classList.remove(options.focus.animateOut);
      nodeInfoDom.classList.add(options.focus.animateIn);
      nodeInfoDom.style.right = 0;
      nodeInfoDom.style.top = options.focus.top;
      console.log(options.focus.top);

      if (Object.keys(showNodesMap).length == 2) {
        nodeInfoDom.classList.add("length2");
      } else {
        nodeInfoDom.classList.remove("length2");
      } // let width =
      //   containerDOM.clientWidth -
      //   document.getElementById("focus-info").offsetWidth;
      // console.log(width, document.getElementById("focus-info").offsetWidth);
      // document.getElementById("graph-container").width = width;
      // document.getElementById("graph-container").style.width = width + "px";


      visgraph.scene.rightOffset = nodeInfoDom.offsetWidth;
      console.log("修改后的大小", visgraph.scene.rightOffset);
      var divval = (1 - document.getElementById("focus-info").offsetWidth / visgraph.stage.width) / 2;
      setTimeout(function () {
        // 移动画布中心点
        _moveToCenterByNode(visgraph.findNodeByAttr("id", nodeId), divval);
      }, 100);

      _elementOption.hideTipNode();

      showFocusFlag = true;
    },
    hideFocusInfo: function hideFocusInfo() {
      showNodesMap = {}; // 隐藏节点详情

      var nodeInfoDom = document.getElementById("focus-info");
      nodeInfoDom.classList.add(options.focus.animateOut);
      nodeInfoDom.classList.remove(options.focus.animateIn); // document.getElementById("graph-container").width =
      //   containerDOM.clientWidth;
      // document.getElementById("graph-container").style.width =
      //   containerDOM.clientWidth + "px";
      // visgraph.stage.resize();

      visgraph.scene.rightOffset = 0;
      console.log("恢复后的大小", visgraph.scene.rightOffset); // _moveToCenterByNode(visgraph.findNodeByAttr("id", nodeId),0.5);

      setTimeout(function () {
        nodeInfoDom.style.right = "-40%";
      }, 500);
      showFocusFlag = false;
    },

    /******* 上下左右箭头 *******/
    createVis: function createVis(parentDom) {
      var dom = document.createElement("div");
      dom.classList.add("vis-navigation");
      var btnArray = ["up", "down", "left", "right"];
      btnArray.map(function (key) {
        var btnDom = document.createElement("div");
        btnDom.classList.add("vis-button");
        btnDom.classList.add("vis-" + key);
        btnDom.addEventListener("click", function () {
          visgraph.moveScene(key, 30);
        });
        dom.appendChild(btnDom);
      });
      parentDom.appendChild(dom);
    },

    /******* loading遮罩层 *******/
    createLoading: function createLoading(parentDom) {
      var dom = document.createElement("div");
      dom.setAttribute("id", "plugin-loading");
      dom.classList.add("plugin-loading");
      var gifDom = document.createElement("img");
      gifDom.setAttribute("id", "plugin-loading-img");
      gifDom.setAttribute("src", options.general.loadingImg);
      gifDom.classList.add("plugin-loading-img");
      dom.appendChild(gifDom); // dom.classList.add("hidden-loading");
      // dom.classList.add("animate__animated");
      // dom.classList.add("animate__fadeOut");

      parentDom.appendChild(dom);
    },
    showLoading: function showLoading() {
      var dom = document.getElementById("plugin-loading");
      dom.style.backgroundColor = options.general.loadingColor;
      var gifDom = document.getElementById("plugin-loading-img");
      gifDom.setAttribute("src", options.general.loadingImg);
      dom.style.opacity = 1;
      dom.style.pointerEvents = "auto";
      document.querySelector(".graphvis-elements").style.transition = "opacity 0s ease";
      document.querySelector(".graphvis-elements").style.opacity = 0;
      console.log(document.querySelector(".graphvis-elements").style.opacity); // dom.classList.add("show");
      // dom.classList.remove("hidden-loading");
      // dom.classList.remove("animate__fadeOut");
      // dom.classList.add("animate__fadeIn");
    },
    hideLoading: function hideLoading() {
      var dom = document.getElementById("plugin-loading");
      setTimeout(function () {
        // dom.classList.remove("animate__fadeIn");
        // dom.classList.add("animate__fadeOut");
        // dom.classList.add("hidden-loading");
        document.querySelector(".graphvis-elements").style.transition = "opacity 2s ease";
        document.querySelector(".graphvis-elements").style.opacity = 1;
        dom.style.opacity = 0;
        dom.style.pointerEvents = "none";
      }, 3000);
    },

    /******* 左侧按钮组 *******/
    createSidebar: function createSidebar(parentDom) {
      var sidebarDom = document.createElement("div");
      sidebarDom.classList.add("sidebar"); // 显示/隐藏按钮

      var switchBtn = document.createElement("div");
      switchBtn.classList.add("sidebar-switch");
    }
  }; // 将画布移到node为中心

  function _moveToCenterByNode(node, divval) {
    if (!node) return;
    visgraph.HorizontalMoveNodeToLeftCenter(node, divval, 500);
    visgraph.animate({
      targets: node,
      scaleX: 1.5,
      scaleY: 1.5,
      delay: 500,
      duration: 1000,
      direction: "alternate",
      easing: "easeInSine",
      complete: function complete() {
        node.scaleX = 1;
        node.scaleY = 1;
      }
    });
  }
  /************************************
   ************ 对外暴露方法 ************
   ***********************************/

  /**
   * 加载指定节点配置，并渲染
   * @param {*} nodeId 节点id
   * @returns
   */


  function findRelations(nodeId) {
    // 隐藏所有弹窗
    _elementOption.hideFocusInfo();

    _elementOption.hideTipLine();

    _elementOption.hideTipNode();

    var node = visgraph.findNodeByAttr("id", nodeId);
    if (!node) return;
    if (typeof options.handleLoad === "function") options.handleLoad(node);
    loadServerData(node);
  }
  /**
   * 切换网格的显示/隐藏
   * @param {*} isShow true/false
   */


  function switchGrid(isShow) {
    showGridSwitch = isShow;
    var offBorderConfig = show2DSwitch ? options.d2View.offBorder : options.d3View.offBorder;
    var defaultBorderConfig = show2DSwitch ? options.d2View["default"] : options.d3View["default"];

    if (isShow) {
      // 需要显示
      visgraph.nodes.forEach(function (node) {
        node.scaleX = node.scaleY = 1; //恢复原始大小

        node.alpha = 1; //不透明

        if (show2DSwitch) {
          node.shape = "polygon"; //设置默认是六边形

          node.drawNode = _drawEffectNode;
        } else {
          node.shape = "hexagon";
          node.drawNode = _draw3DHexagonNode;
        }

        node.borderWidth = defaultBorderConfig.borderWidth;
        node.borderColor = defaultBorderConfig.borderColor;
        node.borderAlpha = defaultBorderConfig.borderAlpha;
      });
    } else {
      visgraph.nodes.forEach(function (node) {
        if (!node.isRealNode) {
          node.alpha = 0; //虚拟节点透明隐藏
        }

        if (show2DSwitch) {
          node.shape = options.d2View.offBorder.shape; // node.scaleX = node.scaleY = 0.6; //变圆形后，设置节点大小缩放至0.6倍

          node.drawNode = _drawEffectNode;
        } else {
          node.shape = options.d3View.offBorder.shape;
          node.drawNode = _draw3DHexagonNodeWithCircle;
        }

        node.borderWidth = offBorderConfig.borderWidth;
        node.borderColor = offBorderConfig.borderColor;
        node.borderAlpha = offBorderConfig.borderAlpha;
      });
    }
  }

  function resize() {
    return regeneratorRuntime.async(function resize$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            setTimeout(function () {
              document.getElementById("graph-container").style.width = containerDOM.clientWidth + "px";
              visgraph.stage.resize(); // visgraph.setZoom("zoomInit");
            }, 50);

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    });
  }
  /**
   * 初始化函数，仅需调用一次，请勿重复调用
   * @param {*} container 需要渲染的dom id
   */


  function init(container) {
    var dom, graphDom;
    return regeneratorRuntime.async(function init$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            dom = document.getElementById(container);

            if (dom) {
              _context9.next = 3;
              break;
            }

            throw new Error("容器不存在");

          case 3:
            containerDOM = dom; // 依次创建各dom节点

            graphDom = _elementOption.createGraphDom(dom);

            _elementOption.createTipLine(graphDom); // 初始化连线tip


            _elementOption.createTipNode(graphDom); // 初始化节点tip


            _elementOption.createFocusDom(graphDom); // 初始化节点详情


            _elementOption.createVis(graphDom); // 初始化上下左右键盘


            _elementOption.createLoading(graphDom); // 初始化loading dom
            // return;
            //1、创建GraphVis对象，进行方法调用


            visgraph = new VisGraph(graphDom, config);
            visgraph.setInitZoomRange(options.canvas.zoomRange); //设置画布缩放比例区间

            visgraph.setInitZoom(options.canvas.zoom);
            visgraph.setInitPosition(options.canvas.position);
            visgraph.scene.pickMode = "link-first"; //设置连线优先拾取

            visgraph.switchAnimate(true); //开启支持动画模式

            visgraph.setMouseModel("drag"); //鼠标模式为拖拽

            visgraph.setMouseModel("selectdrag"); //鼠标模式为拖拽

            algorithm = visgraph.algorithm();
            _context9.next = 21;
            return regeneratorRuntime.awrap(_loadIconConfig());

          case 21:
            _context9.next = 23;
            return regeneratorRuntime.awrap(loadServerData());

          case 23:
          case "end":
            return _context9.stop();
        }
      }
    });
  } // 添加全局事件


  window.addEventListener("keydown", function (e) {
    var keyCodeMap = {
      37: "right",
      38: "down",
      39: "left",
      40: "up"
    };

    if (keyCodeMap[e.keyCode]) {
      visgraph.moveScene(keyCodeMap[e.keyCode], 30); //移动方向的变更

      _elementOption.hideTipLine();

      _elementOption.hideTipNode();
    }
  });
  window.addEventListener("wheel", function () {
    _elementOption.hideTipLine();

    _elementOption.hideTipNode();
  });
  window.addEventListener("click", function (event) {
    // 判断是否是带有 fullscreen 属性的 img 元素触发的点击事件
    var fullscreenImg = event.target.closest("img[fullscreen]");

    if (fullscreenImg) {
      // 创建全屏图片容器
      var fullscreen = document.createElement("div");
      fullscreen.classList.add("fullscreen");
      var imgClone = fullscreenImg.cloneNode();
      imgClone.removeAttribute("fullscreen");
      fullscreen.appendChild(imgClone);
      document.body.appendChild(fullscreen); // 在下一帧动画前显示全屏图片

      requestAnimationFrame(function () {
        fullscreen.style.display = "flex";
        fullscreen.style.opacity = 1; // 设置不透明
      }); // 点击全屏 <div> 空白区域时，隐藏全屏图片

      fullscreen.addEventListener("click", function (event) {
        if (event.target === fullscreen) {
          fullscreen.style.opacity = 0; // 设置完全透明
          // 在渐变效果结束后隐藏全屏图片并移除容器

          setTimeout(function () {
            fullscreen.remove();
          }, 300);
        }
      });
    }
  });
  /**
   * 移动画布中心点
   * @param {*} key 移动方向，可选up/down/left/right
   * @param {*} num 移动距离，默认30像素
   */

  function move(key) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
    var keys = ["up", "down", "left", "right"];
    if (!keys.includes(key)) throw new Error("方向必须是'up','down','left','right'之一");
    visgraph.moveScene(key, num);
  }
  /**
   * 放大、缩小等
   * @param {*} type 可选zomm1/zoomOut/zoomIn/auto
   */


  function zoom(type) {
    _elementOption.hideTipLine();

    _elementOption.hideTipNode();

    if (type == "auto") {
      visgraph.setZoom("zoom1");
    }

    visgraph.setZoom(type);
  }

  function setBackgroundImg(url) {
    if (!url) return;
    var dom = document.getElementById("graph-container");
    dom.style.backgroundImage = "url(".concat(url, ")");
  }

  function gerenateBackground(panelSize, gridRadius, backgroundImage, backgroundImageL2) {
    var bound = visgraph.scene.getElementsBound();

    if (bound != null) {
      var width = bound.right - bound.left;
      var height = bound.bottom - bound.top;
      var prefixXSpace = 1.5 * gridRadius * 5; //横向间距计算

      var prefixYSpace = 0.875 * gridRadius * 5; //纵向间距计算

      var scaleX = visgraph.stage.width / width;
      var scaleY = visgraph.stage.height / height;
      var scale = Math.min(scaleX, scaleY);

      if (scale == scaleX) {
        var theight = visgraph.stage.height / scale;
        visgraph.scene.setBackground(backgroundImage, backgroundImageL2, bound.left, (height - theight) / 2 + bound.top, width, theight, bound.left + prefixXSpace, bound.top - prefixYSpace, bound.right - prefixXSpace, bound.bottom + prefixYSpace);
      } else {
        var twidth = visgraph.stage.width / scale;
        visgraph.scene.setBackground(backgroundImage, backgroundImageL2, (width - twidth) / 2 + bound.left, bound.top, twidth, height, bound.left + prefixXSpace, bound.top - prefixYSpace, bound.right - prefixXSpace, bound.bottom + prefixYSpace);
      }

      if (scale <= 10 && scale > 0.01) {
        visgraph.setZoomRange([scale, options.canvas.zoomRange[1]]); //设置画布缩放比例区间
      }
    }
  }
  /**
   * 切换背景图的显示隐藏
   */


  function showBgPic() {
    visgraph.showBgPic();
  }
  /**
   * 搜索
   */


  function search(text) {
    var node = visgraph.findNodeByAttr("label", text); //根据label属性查询节点

    if (node) {
      _moveToCenterByNode(node, 0.5);
    }
  }
  /**
   * 设置选项，不会重新渲染
   * @param {*} opt 需要重新设置的选项
   */


  function setOptions(opt) {
    options = _deepMerge(options, opt);
  }

  function getOptions() {
    return options;
  }
  /**
   * 设置选项，会重新渲染
   * @param {*} opt 需要重新设置的选项
   */


  function resetConfig() {
    return regeneratorRuntime.async(function resetConfig$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return regeneratorRuntime.awrap(_loadIconConfig());

          case 2:
            console.log("重置 数据 ");
            _context10.next = 5;
            return regeneratorRuntime.awrap(reloadServerData(true));

          case 5:
            // _reloadConfig();
            //不知道为啥，下面这些写在这里才生效
            globleGraphData["backgroud_global_img"] = options.canvas.backgroud_global_img;
            globleGraphData["backgroud_global_l2_img"] = options.canvas.backgroud_global_l2_img;
            globleGraphData["backgroud_local_img"] = options.canvas.backgroud_local_img;
            globleGraphData["backgroud_local_l2_img"] = options.canvas.backgroud_local_l2_img;

            if (show2DSwitch) {
              gerenateBackground(globleGraphData["panel_radius"], globleGraphData["grid_radius"], globleGraphData["backgroud_global_img"], globleGraphData["backgroud_global_l2_img"]);
            } else {
              gerenateBackground(globleGraphData["panel_radius"], globleGraphData["grid_radius"], globleGraphData["backgroud_local_img"], globleGraphData["backgroud_local_l2_img"]);
            }

            containerDOM.style.backgroundColor = options.canvas.bgColor; // visgraph.resetConfig(config); //重新设置

          case 11:
          case "end":
            return _context10.stop();
        }
      }
    });
  }
  /**
   * 设置语言包
   * @param {*} config 语言包json
   */


  function setI18nConfig(config) {
    i18nConfig = _objectSpread({}, i18nConfig, {}, config);
  }
  /**
   * 获取plugin状态
   */


  function getStatus() {
    return {
      showFocusFlag: showFocusFlag
    };
  }

  return {
    init: init,
    move: move,
    switchGrid: switchGrid,
    loadServerData: loadServerData,
    zoom: zoom,
    showBgPic: showBgPic,
    search: search,
    setOptions: setOptions,
    getOptions: getOptions,
    setI18nConfig: setI18nConfig,
    resetConfig: resetConfig,
    resize: resize,
    getStatus: getStatus
  };
}

var _default = PluginGraph;
exports["default"] = _default;