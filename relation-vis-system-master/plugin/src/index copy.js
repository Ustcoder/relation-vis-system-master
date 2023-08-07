/******** plugin版本入口文件 **********/
let PluginGraph;
(function (global, factory) {
  if (typeof module !== "undefined" && typeof exports === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define(["moduleName"], factory);
  } else if (typeof define === "function" && define.cmd) {
    define(function (require, exports, module) {
      module.exports = factory();
    });
  } else {
    global = typeof globalThis !== "undefined" ? globalThis : global || self;
    global.PluginGraph =PluginGraph= factory();
  }
})(this, function () {
  function PluginGraph(options) {
    // 提取配置文件内容
    const {
      baseurl,
      DEFAULT_NODE_SIZE,
      rootClassName = "pluginGraph",
      node = {},
      link = {},
    } = options;

    // 全局变量
    let showGridSwitch = true; //显示网格的标识
    let show2DSwitch = true; //显示2D效果的标识
    let hexeGridCache = new Map(); //虚拟网格的坐标缓存
    let hexeNodeCache = new Map(); //网格节点缓存
    const globleGraphData = {
      //全局数据定义(服务端返回数据)
      panel_type: "global", //数据类型 global|local
      panel_radius: 5, //坐标系半径
      grid_radius: DEFAULT_NODE_SIZE, //网格节点半径
      nodeInfos: [], //点信息
      edgeInfos: [], //边信息
    };

    //GraphVis可视化对象通用配置项
    const config = {
      node: {
        //节点的默认配置
        label: {
          //标签配置
          show: false, //是否显示
          color: "150,150,200", //字体颜色
          font: "normal 14px Arial", //字体大小及类型
          textPosition: "Middle_Center", //文字位置 Top_Center,Bottom_Center,Middle_Right,Middle_Center
        },
        shape: "polygon", //circle,polygon
        width: options.DEFAULT_NODE_SIZE * 2,
        height: options.DEFAULT_NODE_SIZE * 2,
        color: null, //节点颜色 '5,13,48'
        borderColor: options.node.borderColor, //边框颜色
        borderWidth: 1, //边框宽度,
        borderAlpha: 0.3, //边框透明度
        lineDash: [0], //边框虚线间隔,borderWidth>0时生效
        alpha: 1, //节点透明度
        higlight: false, //节点是否被focus
        selected: {
          //选中时的样式设置
          borderColor: options.node.selectedBorderColor, //选中时边框颜色
          borderAlpha: 0.8, //选中时的边框透明度
          borderWidth: 1, //选中时的边框宽度
        },
        onClick: function (event, node) {
          //单击
          showNodeInfo(node.id);
        },
        ondblClick: function (event, node) {
          //双击
          dblClickNode(node);
        },
        onMouseOver: function (event, node) {
          //悬浮
          node.higlight = true;
          showNodeTips(event, node);
          higlightNode(node, true); //节点高亮
        },
        onMouseOut: function (event, node) {
          //悬浮
          node.higlight = false;
          higlightNode(node, false); //取消节点高亮
        },
      },
      link: {
        //连线的默认配置
        label: {
          //连线标签
          show: false, //是否显示
          color: "50,50,50", //字体颜色
          font: "normal 13px Arial", //字体大小及类型
        },
        lineType: "direct", //连线类型,direct
        colorType: "defined",
        color: options.link.color, //连线颜色
        alpha: 1, // 连线透明度
        lineWidth: options.link.lineWidth, //连线宽度
        lineDash: [3, 5, 3], //虚线间隔样式如：[5,8]
        showArrow: false, //显示连线箭头
        selected: {
          //选中时的样式设置
          color: options.link.selectedColor, //选中时的颜色
        },
        onClick: function (event, link) {
          //单击
          showLineInfo(link);
        },
        onMouseOver: function (event, link) {
          //悬浮
          showLinkTips(event, link);
        },
        onMouseOut: function (event, link) {
          //移走
          hideLineTips(link);
        },
      },
      noElementClick: function (event, _graphvis) {
        hideNodeTips(); //隐藏提示层
      },
      wheelZoom: 0.9, //开启鼠标滚轮缩放null
      highLightNeiber: false, //相邻节点高亮开关
    };
    // GraphVis 实例化
    let visgraph;
    // 当前显示的内容配置
    let iconConfigs = {};

    // 封装请求方法
    function _getJSON(url) {
      return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open("get", url);
        // 不发送数据到服务器
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
    }

    function _getRootClassName(name) {
      return rootClassName + "-" + name;
    }

    //开始加载动画 todo
    function _startLoadingAnimate() {}

    //关闭加载动画 todo
    function _closeLoadingAnimate() {}

    //合并服务端返回数据给客户端缓存数据
    function _mergeServerData(serveData) {
      globleGraphData["panel_type"] = serveData["panel_type"] || "global"; //数据类型
      globleGraphData["panel_radius"] = serveData["panel_radius"] || 5; //六边形面板半径
      globleGraphData["grid_radius"] =
        serveData["grid_radius"] || options.DEFAULT_NODE_SIZE; //网格半径
      globleGraphData["nodeInfos"] = serveData["nodeInfos"] || []; //点数据
      globleGraphData["edgeInfos"] = serveData["edgeInfos"] || []; //边数据

      options.DEFAULT_NODE_SIZE = globleGraphData["panel_radius"]; //记录点默认半径大小

      // todo 改为调用回调函数，通知外部目前状态
      // monitorPanelType(globleGraphData["panel_type"]); //监控示例数据类型
    }

    //按服务端返回数据，重新设置图可视化配置
    function _resetGraphConfig() {
      config.node.width = globleGraphData["grid_radius"] * 2; //节点的宽设置
      config.node.height = globleGraphData["grid_radius"] * 2; //节点的高设置
      visgraph.resetConfig(config); //重新设置
    }

    //获取图的关键信息
    function _getGraphKeyInfo() {
      var nodes = globleGraphData["nodeInfos"];
      var edges = globleGraphData["edgeInfos"];

      // todo 修改目录，改为配置
      var graphNodes = nodes.map((node) => {
        if (_isAssetTypeAnGif(node.image)) {
          let seq_count = node.image.split("_");
          seq_count = seq_count[seq_count.length - 2];
          let imgs = [];
          for (var i = 1; i <= seq_count; i++) {
            imgs.push(
              `entities/${options.NODE_IMG_MENU}/${node.image}/${i}.png`
            );
          }
          return {
            id: node.id,
            gridId: `${node.coors[0]},${node.coors[1]}`,
            label: node["titletext"],
            image: `entities/${options.NODE_IMG_MENU}/${node.image}/0.png`,
            images: imgs,
            properties: node,
          };
        }
        return {
          id: node.id,
          gridId: `${node.coors[0]},${node.coors[1]}`,
          label: node["titletext"],
          image: `entities/${options.NODE_IMG_MENU}/${node.image}`,
          properties: node,
        };
      });

      var graphLinks = edges.map((edge) => {
        return {
          id: edge.id,
          source: edge["startnode"],
          target: edge["endnode"],
          lineType: edge["line"],
          properties: edge,
        };
      });
      return {
        nodes: graphNodes,
        links: graphLinks,
      };
    }

    function _isAssetTypeAnGif(filePath) {
      return filePath.endsWith("_seq");
    }

    //开启动画效果
    function _showSecneAnimate(nodes, edges, callback) {
      var newNodes = [];
      hexeNodeCache.forEach(function (node, id) {
        if (id != "0,0") {
          node.alpha = 0;
          newNodes.push(node);
        }
      });

      visgraph
        .animate()
        .timeline({
          targets: newNodes,
          delay: function (el, i) {
            return i * 20;
          },
          duration: 20,
          easing: "linear",
          complete: function () {
            callback(nodes, edges); //动画完成，展示关系网络
          },
        })
        .add({
          alpha: 1,
        });
    }

    //清空所有数据 todo
    function _clearAll() {
      // closeRightPanel();
      // hideNodeTips(); //消除提示层
      // visgraph.clearAll(); //清空画布
      // hexeNodeCache = new Map(); //网格节点缓存
      // hexeGridCache = new Map(); //网格坐标系清空
    }

    // 加载图标配置
    async function _loadIconConfig() {
      const setData = await _getJSON(options.iconConfig);
      iconConfigs = setData;
    }
    // 加载图标数据
    async function _loadServerData(node) {
      _startLoadingAnimate();
      _clearAll(); //清除原有显示数据

      //如果查询的某个节点下钻数据，则需要根据nodeId从服务端获取
      let dataUrl = options.baseurl; //默认的首页数据
      if (node && node.properties.link) {
        // todo 下钻的数据需要增加配置项
        dataUrl = "data/" + node.properties.link; //下钻示例数据
      }
      const serverData = await _getJSON(dataUrl);
      if (serverData.panel_type == "local") {
        show2DSwitch = false;
      } else {
        show2DSwitch = true;
      }
      //1、获取数据，设置给客户端数据
      _mergeServerData(serverData);
      //2、设置节点的半径，重新设置配置
      _resetGraphConfig();

      //3、渲染2d场景
      if (show2DSwitch) {
        _render2DScene(); // 2D场景
      } else {
        render3DScene(); // 3D场景
      }

      _closeLoadingAnimate(); //关闭加载动画
    }

    /**
     * 渲染2D场景
     * @param isLocal 标识是否为本地切换，服务端数据需要重新计算
     */
    function _render2DScene(isLocal = false) {
      //1、按半径，生成六边形网格坐标系统
      if (!isLocal) {
        _generate2DHexeGrid(globleGraphData["panel_radius"]);
      }

      //2、按网格大小，生成虚拟的网格节点
      _gerenate2DGridNodes(globleGraphData["grid_radius"]);

      //3、绘制2D场景图，将数据信息赋值给网格节点
      _draw2DSceneGraph(isLocal);
    }

    //生成2维场景的六边形网格节点坐标系统
    function _generate2DHexeGrid(panelRadius = 3) {
      hexeGridCache = new Map(); //网格系统记录

      //设置中心节点
      _addToHexCache([0, 0], hexeGridCache);

      //1、生成x,y轴上的点坐标,及其对角线节点坐标
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

          for (var j = 0; j < panelRadius; j++) {
            if (j % 2 == 0 && j + 2 <= panelRadius) {
              _addToHexCache([i, j + 2], hexeGridCache); //右侧y方向向上
              _addToHexCache([i, -j - 2], hexeGridCache); //右侧y方向向下

              _addToHexCache([-i, j + 2], hexeGridCache); //左侧y方向向上
              _addToHexCache([-i, -j - 2], hexeGridCache); //左侧y方向向下
            }
          }
        }
      }
    }
    //添加至网格缓存
    function _addToHexCache(hex, hexeCache) {
      var id = `${hex[0]},${hex[1]}`;
      if (!hexeCache.get(id)) {
        hexeCache.set(id, hex);
      }
    }

    //按照网格半径和六边形半径生成2D网格面板
    function _gerenate2DGridNodes(gridRadius = 40) {
      visgraph.clearAll(); //清空画布

      var xSpace = 1.5 * gridRadius; //横向间距计算
      var ySpace = 0.875 * gridRadius; //纵向间距计算

      //画布中心位置
      var centerX = visgraph.canvas.width / 2 - gridRadius;
      var centerY = visgraph.canvas.height / 2 - gridRadius;
      var nodeTmp = null;
      hexeGridCache.forEach(function (hexe, id) {
        nodeTmp = visgraph.addNode({
          id: hexe[0] + "," + hexe[1],
          x: hexe[0] * xSpace + centerX,
          y: -hexe[1] * ySpace + centerY,
        });
        nodeTmp.dragable = false; //禁止拖动

        hexeNodeCache.set(id, nodeTmp);
      });

      visgraph.setZoom("zoom1"); //1:1居中显示
    }

    // 渲染节点和边的数据
    function _draw2DSceneGraph() {
      var graphKeyInfo = _getGraphKeyInfo();
      _startLoadingAnimate();
      _showSecneAnimate(graphKeyInfo.nodes, graphKeyInfo.links, _showRelations);
      _closeLoadingAnimate();
    }

    //对关系数据进行可视化渲染，设置节点图片，添加连线等
    function _showRelations(nodes, links) {
      const effectNodes = []; //有动画效果的节点
      nodes.forEach((node) => {
        //获取网格实际的节点
        const targetNode = hexeNodeCache.get(node.gridId);
        if (targetNode) {
          targetNode.id = node.id;
          targetNode.label = node.label;
          targetNode.gridId = node.gridId;
          targetNode.images = [];

          targetNode.setImage(node.image); //设置节点的图标
          targetNode.path = node.image;
          targetNode.fillColor = options.NODE_DEFAULT_COLOR; //此处需要对有图标的节点设置背景色
          targetNode.properties = node.properties; //设置为扩展属性
          targetNode.isRealNode = true; //实际节点标识
          targetNode.link = node.properties.link; //下钻链接地址

          const animateType = ["bulb-white", "bulb-temp"]; // 动画类型，支持两种
          if (Array.isArray(node.images) && node.images.length > 1) {
            // 判断是否是gif
            node.images.forEach(function (imgS) {
              var img = new Image();
              img.setAttribute("crossOrigin", "Anonymous");
              img.src = imgS;
              // todo 此处有个bug，onload是异步的，故走到下面判断images的长度为0
              img.onload = function () {
                targetNode.images.push(img);
              };
            });
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
            effectNodes.push(targetNode);
            // node.drawNode = drawEffectNode;
          }
        }
      });

      //加动画效果
      _addAnimateLoop(effectNodes);

      //添加连线
      let linkTmp = null;
      links.forEach((_link) => {
        linkTmp = visgraph.addEdge(_link);
        if (linkTmp != null) {
          //连线经过的节点坐标位置
          var linePoints = [];
          (_link.properties["path"] || []).forEach(function (coors) {
            var gridNode = hexeNodeCache.get(`${coors[0]},${coors[1]}`);
            if (gridNode) {
              linePoints.push([gridNode.cx, gridNode.cy]);
            }
          });
          linkTmp.alpha = 0;
          linkTmp.linePoints = linePoints;
          //linkTmp.lineDash = [5,2,3]; //设置连线的虚线样式
          linkTmp.drawLine = _drawDeined2DLine;
          linkTmp.animate = true;
        }
      });

      visgraph.animate({
        targets: visgraph.links,
        duration: 1000,
        easing: "linear",
        alpha: 1,
      });
    }

    //节点自定义开发动画效果
    function _addAnimateLoop(nodes = []) {
      nodes.forEach((_node) => {
        if (_node.images && _node.images.length > 0) {
          _node.drawNode = _drawGif;
        } else {
          _node.drawNode = _drawEffectNode;
        }
      });
    }
    function _drawGif(ctx) {
      if (this.animateNode) {
        this.animate = this.animate >= 9.88 ? 0 : this.animate; //定义一个可变属性
        if (this.higlight) {
          this.animate += 0.12; //动画步长
        }
        ctx.save(); //绘制节点前需要保存上下文环境，防止样式污染（必须）
        ctx.moveTo(0, 0); //移动到节点的中心位置（必须）

        var realSize = this.radius - 25; //中心部分的半径
        //绘制一个圆形区域
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + this.fillColor + "," + this.alpha + ")";
        ctx.arc(0, 0, this.radius - 10, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        if (this.images && this.images.length >= 2) {
          let index = Math.floor(this.animate / 2);
          //ctx.drawImage(this.images[index],0,0,100,100)
          var globalAlpha = ctx.globalAlpha;
          ctx.globalAlpha = this.alpha;
          ctx.arc(
            -2 * this.radius,
            -2 * this.radius,
            this.radius,
            0,
            2 * Math.PI
          );
          ctx.clip();
          ctx.drawImage(
            this.images[index],
            -this.radius / 2,
            -this.radius / 2,
            this.radius,
            this.radius
          );
          ctx.globalAlpha = globalAlpha;
        }
        ctx.restore(); //恢复外部绘制环境（必须）
      } else {
        this.drawShape(ctx);
        if (this.image) {
          ctx.save();
          var globalAlpha = ctx.globalAlpha;
          ctx.globalAlpha = this.alpha;
          ctx.arc(
            -2 * this.radius,
            -2 * this.radius,
            this.radius,
            0,
            2 * Math.PI
          );
          ctx.clip();
          ctx.drawImage(
            this.image,
            -this.radius / 2,
            -this.radius / 2,
            this.radius,
            this.radius
          );
          ctx.globalAlpha = globalAlpha;
          ctx.restore(); //恢复外部绘制环境（必须）
        }
      }
    }
    /**
     * canvas绘制节点的动效
     * @param ctx:canvas绘制上下文环境
     */
    function _drawEffectNode(ctx) {
      if (this.animateNode) {
        var realSize = this.radius - 25; //中心部分的半径

        this.animate = this.animate > 10 ? 0 : this.animate; //定义一个可变属性
        this.animate += 0.12; //动画步长

        ctx.save(); //绘制节点前需要保存上下文环境，防止样式污染（必须）
        ctx.moveTo(0, 0); //移动到节点的中心位置（必须）

        //绘制一个圆形区域
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + this.fillColor + "," + this.alpha + ")";
        ctx.arc(0, 0, this.radius - 10, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        // 亮色版本：绘制呼吸灯
        if (options.theme === "light" && this._rate) {
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
          const radius = 40; // 阴影大小
          var radialgradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
          const shadowColor = {
            "bulb-white": "rgb(255,155,155)",
            "bulb-temp": "rgb(153,233,255)",
          };
          radialgradient.addColorStop(0, shadowColor[this._animateType]);
          radialgradient.addColorStop(this._rate, "white");
          radialgradient.addColorStop(1, "white");
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, 2 * Math.PI);
          ctx.fillStyle = radialgradient;
          ctx.fill();
        }
        // 暗色版本：绘制呼吸灯
        if (options.theme === "dark") {
          ctx.beginPath();
          ctx.fillStyle = "rgba(250,250,250,0.2)";
          ctx.arc(0, 0, this.animate + realSize, 0, 2 * Math.PI); //内层扩散区域
          ctx.closePath();
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = "rgba(250,250,250,0.15)";
          ctx.arc(0, 0, this.animate + 8 + realSize, 0, 2 * Math.PI); //最外层扩散区域
          ctx.closePath();
          ctx.fill();
        }

        if (this.image) {
          var globalAlpha = ctx.globalAlpha;
          ctx.globalAlpha = this.alpha;
          ctx.arc(
            -2 * this.radius,
            -2 * this.radius,
            this.radius,
            0,
            2 * Math.PI
          );
          ctx.clip();
          //ctx.drawImage(this.image, -this.radius / 2, -this.radius / 2, this.radius, this.radius);

          ctx.drawImage(
            this.image,
            -this.image.width / 2,
            -this.image.height / 2,
            this.image.width,
            this.image.height
          );
          ctx.globalAlpha = globalAlpha;
        }
        ctx.restore(); //恢复外部绘制环境（必须）
      } else {
        this.drawShape(ctx);

        if (this.image) {
          ctx.save();
          var globalAlpha = ctx.globalAlpha;
          ctx.globalAlpha = this.alpha;
          ctx.arc(
            -2 * this.radius,
            -2 * this.radius,
            this.radius,
            0,
            2 * Math.PI
          );
          ctx.clip();
          //ctx.drawImage(this.image, -this.radius / 2, -this.radius / 2, this.radius, this.radius);

          ctx.drawImage(
            this.image,
            -this.image.width / 2,
            -this.image.height / 2,
            this.image.width,
            this.image.height
          );
          ctx.globalAlpha = globalAlpha;
          ctx.restore(); //恢复外部绘制环境（必须）
        }
      }
      // 绘制文字
      if (this.isRealNode) _drawText(ctx, this.label || "");
    }

    // 添加节点文字
    function _drawText(ctx, text) {
      ctx.save(); //绘制节点前需要保存上下文环境，防止样式污染（必须）
      const w = 50;
      const h = 20;
      const x = -26;
      const y = 28;
      let r = 10;
      if (w < 2 * r) r = w / 2;
      if (h < 2 * r) r = h / 2;
      if (show2DSwitch) {
        // 2D需要渲染外框
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x, y + h);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.fillStyle = "#032840";
        ctx.fill();
        ctx.fillStyle = "#fff";

        if (text.length > 5) {
          text = text.substring(0, 5) + "...";
        }
        // ctx.fillRect(x, y, w, h);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, w / 2 + x, h / 2 + y + 2);
        ctx.restore(); //恢复外部绘制环境（必须）
      } else {
        // 3D需要渲染外框
        if (options.theme == "light") {
          ctx.fillStyle = "#000";
          ctx.shadowColor = "rgba(0,0,0,0.9)";
        } else {
          ctx.fillStyle = "#fff";
          ctx.shadowColor = "rgba(255,255,255,0.9)";
        }
        ctx.shadowOffsetX = -3;
        ctx.shadowOffsetY = -3;
        ctx.shadowBlur = 5;
        ctx.translate(15, -15);
        ctx.rotate((-10 * Math.PI) / 180);

        if (text.length > 5) {
          text = text.substring(0, 5) + "...";
        }
        // ctx.fillRect(x, y, w, h);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, w / 2 + x, h / 2 + y + 2);
        ctx.restore(); //恢复外部绘制环境（必须）
      }
    }

    //绘制自定义连线
    function _drawDeined2DLine(ctx) {
      var lineStyle = `rgba(${this.strokeColor},${this.alpha})`;
      if (this.selected || this.showSelected) {
        lineStyle = `rgba(${this.selectedColor},${this.selectedAlpha})`;
      }

      //连线路径,用于计算鼠标是否在连线上的路径
      this.path = [];

      ctx.beginPath();
      ctx.moveTo(this.source.cx, this.source.cy);

      //如果是折线
      if (LINE_TYPE_DICT[this.lineType] == "折线") {
        for (var i = 0; i < this.linePoints.length; i++) {
          var point = this.linePoints[i];
          ctx.lineTo(point[0], point[1]);
          this.path.push({ x: point[0], y: point[1] });
        }
      } else {
        ctx.lineTo(this.target.cx, this.target.cy);
        this.path.push({ x: this.source.cx, y: this.source.cy });
        this.path.push({ x: this.target.cx, y: this.target.cy });
      }

      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = lineStyle;

      if (this.animate) {
        ctx.setLineDash([3, 5, 3]);
        ctx.lineDashOffset = this.lineDashOffset -= options.link.lineDashOffset;
        this.lineDashOffset =
          this.lineDashOffset < -100 ? 1 : this.lineDashOffset;
      }
      ctx.stroke();
    }

    // 集中所有动态添加dom元素的方法
    const _createElement = {
      //
      createGraphDom: (parentDom) => {
        const parentId = parentDom.getAttribute("id");
        const dom = document.createElement("div");
        dom.setAttribute("id", parentId + "-graph");
        dom.className = _getRootClassName("graph");
        parentDom.appendChild(dom);
        return dom;
      },
    };

    // 初始化组件 只用调用一次
    function init(container) {
      const dom = document.getElementById(container);
      if (!dom) throw new Error("容器不存在");
      const graphDom = _createElement.createGraphDom(dom);

      visgraph = new VisGraph(graphDom, config);
      visgraph.scene.pickMode = "link-first"; //设置连线优先拾取

      visgraph.switchAnimate(true); //开启支持动画模式
      visgraph.setZoomRange(options.ZoomRange); //设置画布缩放比例区间
      visgraph.setMouseModel("drag"); //鼠标模式为拖拽

      const algorithm = visgraph.algorithm();
    }

    return {
      init,
    };
  }

  return PluginGraph;
});
export default PluginGraph;