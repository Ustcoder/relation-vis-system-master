export default {
  iconConfig: "../entities/icon_config.json",
  // icon图标所在目录，
  iconMenu: "../entities/icons",
  // 数据配置，初始数据来源
  baseurl: "../data/Global_1.json",

  general: {
    fontFamily: "sans-serif", // 字体
    fontSize: "14px", // 字号
    loadingImg:'./images/loading2.gif',
    loadingColor:'rgba(0,7,46,0.3)'
  },
  canvas: {
    bgColor: "rgba(0, 12, 24, 1)", // 背景色
    aspectRatio: [16, 9], // 宽高比
    zoomRange: [1, 10], // 允许缩放的范围
    extend_global_l2_img: "./images/bg/1_20230724105031.png",
    extend_local_l2_img: "./images/bg/2_20230724112754.png",
    // 2d 背景图
    backgroud_global_img: "./images/bg/20230705172430.jpg",
    backgroud_global_l2_img: "./images/bg/3_20230726211540.png",
    // 3d 背景图
    backgroud_local_img: "./images/bg/3bcf5d4cb764cd235fc9af6636427e6.jpg",
    backgroud_local_l2_img: "./images/bg/3_20230726211525.png",
    animateOpenSpeed: 0, // 棋盘展开速度
    DEFAULT_NODE_SIZE: 80 * Math.sin(30), // 默认节点半径
    zoom: 1, // 初始缩放程度
    position: [0,0], // 初始位置
  },
  header: {
    bgImage: "./images/dark/header.png", // 背景图
    height: "60px", // 高度
    bgColor: "#00072e", // 底色
    opacity: 1, // 透明度
    isFullFolded: true, //全屏是否向上折叠
  },
  toolbar: {
    btnNumber: 5, //按钮数量
    fold: false, // 是否允许向左折叠
    bgColor: "rgba(0, 135, 190, 0.3)", // 底色
    height: "276px", // toolbar的高度
    bgImg: "url(../images/light/common/sidebar-5.png)", // 背景图
  },
  d2View: {
    // 默认六边形边框
    default: {
      borderWidth: 1, // 线粗
      borderColor: "150,150,200", // 颜色
      borderAlpha: 1, // 透明度
      isBgColor: false, // 是否填色
      bgColor: "0,10,55", // 填色的颜色
      bgAlpha: 0, // 填色的透明度
    },
    // 高亮六边形边框
    selected: {
      borderWidth: 1, // 线粗
      borderColor: "150,150,200", // 颜色
      borderAlpha: 0.3, // 透明度
      isBgColor: false, // 是否填色
      bgColor: "0,10,55", // 填色的颜色
      bgAlpha: 0, // 填色的透明度
    },
    // Grid Off状态的圆形边框
    offBorder: {
      shape: "circle",
      borderWidth: 1, // 线粗
      borderColor: "150,150,200", // 颜色
      borderAlpha: 1, // 透明度
      isBgColor: false, // 是否填色
      bgColor: "150,150,200", // 填色的颜色
      bgAlpha: 0, // 填色的透明度
    },
    // 默认Edge
    link: {
      width: 2, // 线粗
      color: "120,120,180", // 颜色
      alpha: 0.3, // 透明度
    },
    // 高亮Edge
    selectedLink: {
      width: 2, // 线粗
      color: "150,230,120", // 颜色
      alpha: 0.3, // 透明度
      lineDashOffset: 0.5, // 线的流速
      lineType: [2,8,2], // 点的
    },
    titleText: {
      isShow: true, // 默认是否显示
      hoverHidden: true, // hover是否隐藏
      textAlign: "center", // 水平对齐模式
      height: 20, // 高度
      width: 50, // 宽度
      borderRadius: 10, //边角弧度
      bgColor: "#D7E7F1", // 背景色
      line: 1, // 允许行数上限
      wordCount: 7, //文字允许长度上限
      fontFamily: "sans-serif", // 字体
      fontSize: '10px', // 字号
      fontColor: "#032840", // 文字颜色
    },
  },
  d3View: {
    // 默认六边形边框
    default: {
      borderWidth: 1, // 线粗
      borderColor: "150,150,200", // 颜色
      borderAlpha: 0.3, // 透明度
      isBgColor: false, // 是否填色
      bgColor: "150,150,200", // 填色的颜色
      bgAlpha: 1, // 填色的透明度
    },
    // 高亮六边形边框
    selected: {
      borderWidth: 1, // 线粗
      borderColor: "150,150,200", // 颜色
      borderAlpha: 0.3, // 透明度
      isBgColor: false, // 是否填色
      bgColor: "150,150,200", // 填色的颜色
      bgAlpha: 0, // 填色的透明度
    },
    // Grid Off状态的圆形边框
    offBorder: {
      shape: "nocircle",
      borderWidth: 1, // 线粗
      borderColor: "150,150,200", // 颜色
      borderAlpha: 0.3, // 透明度
      isBgColor: false, // 是否填色
      bgColor: "150,150,200", // 填色的颜色
      bgAlpha: 0, // 填色的透明度
    },
    // 默认Edge
    link: {
      width: 1, // 线粗
      color: "150,150,200", // 颜色
      alpha: 0.3, // 透明度
    },
    // 高亮Edge
    selectedLink: {
      width: 1, // 线粗
      color: "150,150,200", // 颜色
      alpha: 0.3, // 透明度
      lineDashOffset: 0.5, // 线的流速
    },
    titleText: {
      isShow: true, // 默认是否显示
      hoverHidden: false, // hover是否隐藏
      textAlign: "center", // 水平对齐模式 start、end、center
      height: 20, // 高度
      width: 50, // 宽度
      line: 1, // 允许行数上限
      wordCount: 7, //文字允许长度上限
      fontFamily: "sans-serif", // 字体
      fontSize: "10px", // 字号
      fontColor: "#fff", // 文字颜色
      highlight: false, // 是否文字高亮
      highlightColor: "rgba(255,255,255,1)", // 高亮颜色
    },
  },
  nodeTip: {
    width: "240px", // 宽度
    maxRows: 2, // 对应最大高度，设置文本多展示多少行
    bgColor: "rgba(222, 239, 245, 0.8)", // 底色
    // showBorder: false, // 是否有边框 根据borderWidth判断即可
    borderWidth: "0px", // 边框宽度
    borderColor: "rgba(51, 51, 51, 0.8)", //边框颜色
    // panelBgImg: false, // panel是否贴图  根据panelBgImgUrl判断即可
    panelBgImgUrl: "", // 贴图地址 贴图透明度，可以通过bgColor来控制
    borderBgImg: false, // 边框是否贴图
    borderBgUrl: "", // 边框图
    borderBgOpacity: 0, // 边框透明度 0-1  0代表不透明 1代表透明
    // title
    titleFont: "sans-serif", // 标题字体
    titleSize: "14px", // 标题字号
    titleColor: "#333", // 标题颜色
    titleTextAlien: "left", // 标题对齐方式，可选left，center
    hoverMaxLength: "auto", // 允许最大长度，建议根据宽度来决定
    // hoverText
    hoverFont: "sans-serif", // 标题字体
    hoverSize: "14px", // 标题字号
    hoverColor: "#333", // 标题颜色
    hoverTextAlien: "left", // 标题对齐方式，可选left，center
    hoverMaxLength: "auto", // 允许最大长度，建议根据宽度来决定

    animateIn: "animate__fadeInDown", // 出现动效
    animateOut: "animate__fadeOutDown", // 消失动效
  },
  // 侧边栏
  focus: {
    top: "60px", // 距离顶部距离
    width: "20%", // 宽度，一个详情是20%，两个则是40%
    bgColor: "rgba(0, 22, 56, 0.9)", // 底色
    // showBorder: false, // 是否有边框 根据borderWidth判断即可
    borderWidth: "0px", // 边框宽度
    borderColor: "rgba(238, 249, 255, 0.8)", //边框颜色
    // panelBgImg: false, // panel是否贴图  根据panelBgImgUrl判断即可
    panelBgImgUrl: "", // 贴图地址 贴图透明度，可以通过bgColor来控制
    borderBgImg: false, // 边框是否贴图
    borderBgUrl: "", // 边框图
    borderBgOpacity: 0, // 边框透明度 0-1  0代表不透明 1代表透明
    // title
    titleFont: "sans-serif", // 标题字体
    titleBgColor: "#012142", // 标题背景色
    titleSize: "18px", // 标题字号
    titleColor: "#fff", // 标题颜色
    titleTextAlien: "left", // 标题对齐方式，可选left，center
    hoverMaxLength: "auto", // 允许最大长度，建议根据宽度来决定
    // hoverText
    hoverFont: "sans-serif", // 标题字体
    hoverSize: "14px", // 标题字号
    hoverColor: "#fff", // 标题颜色
    hoverTextAlien: "left", // 标题对齐方式，可选left，center
    hoverMaxLength: "auto", // 允许最大长度，建议根据宽度来决定

    animateIn: "animate__fadeInRight", // 出现动效
    animateOut: "animate__fadeOutRight", // 消失动效
  },
};
