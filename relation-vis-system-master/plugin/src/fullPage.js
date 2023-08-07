import PluginGraph from "./PluginGraph.js";

let lang = "zh"; // 当前显示的语言，可选zh、en

let defaultFocusTop = "50px";

let isFullscreen = false;

let isFullFolded = true; // 全屏是否自动靠泊

let pluginGraph;

// 全屏展示
document.getElementById("btn-big").addEventListener("click", (e) => {
  if (e.target.className.includes("fullScreen")) {
    // 退出全屏
    if (document.exitFullScreen) {
      document.exitFullscreen();
    }
    //兼容火狐
    console.log(document.mozExitFullScreen);
    if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
    //兼容谷歌等
    if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    //兼容IE
    if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    afterFullChange(false);
  } else {
    // 全屏
    if (document.documentElement.RequestFullScreen) {
      document.documentElement.RequestFullScreen();
    }
    //兼容火狐
    console.log(document.documentElement.mozRequestFullScreen);
    if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    }
    //兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
    if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen();
    }
    //兼容IE,只能写msRequestFullscreen
    if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
    afterFullChange(true);
  }
});
// window.onresize = function () {
//   setTimeout(() => {
//     // const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
//     // screen是window的属性方法，window.screen可省略window，指的是窗口
//     // const isFullScreen = screen.height == clientHeight * window.devicePixelRatio;
//     // isFullscreen = !!document.fullscreenElement
//     afterFullChange(!!document.fullscreenElement);
//   }, 100);
// };

//监听退出全屏事件
window.onresize = function () {
  if (document.body.clientHeight == realWidth) {
    // 退出全屏
    afterFullChange(false);
  }
};

document.onkeydown = function (e) {
  if (e && e.keyCode == 122) {
    e.preventDefault();
  }
};
function afterFullChange(isFull) {
  const fullDom = document.getElementById("btn-big");
  console.log(isFull);
  if (!isFull) {
    // 退出全屏
    fullDom.classList.remove("fullScreen");
    if (!isFullFolded) return;
    document.getElementById("header").classList.remove("full-screen");
    document.getElementById("header").classList.remove("animate__fadeOutUp");
    document.getElementById("header").classList.remove("animate__fadeInDown");
    pluginGraph.setOptions({
      focus: {
        top: defaultFocusTop,
      },
    });
    document.getElementById(
      "app"
    ).style.height = `calc(100vh - ${defaultFocusTop})`;
    document.getElementById("focus-info").style.top = defaultFocusTop;
    isFullscreen = false;
  } else {
    fullDom.classList.add("fullScreen");
    if (!isFullFolded) return;
    document.getElementById("header").classList.add("full-screen");
    document.getElementById("header").classList.add("animate__fadeOutUp");
    pluginGraph.setOptions({
      focus: {
        top: "0px",
      },
    });
    document.getElementById("focus-info").style.top = 0;
    isFullscreen = true;
    document.getElementById("app").style.height = `100vh`;
  }
}
// 头部靠泊效果
document.addEventListener("mousemove", function (e) {
  if (!isFullscreen || !isFullFolded) return;
  if (!e.target.className.includes("graphvis-elements")) return;
  // if (pluginGraph.getStatus().showFocusFlag) return;
  if (e.clientY < Number(defaultFocusTop.replace("px", ""))) {
    document.getElementById("header").classList.remove("animate__fadeOutUp");
    document.getElementById("header").classList.add("animate__fadeInDown");
  } else {
    document.getElementById("header").classList.remove("animate__fadeInDown");
    document.getElementById("header").classList.add("animate__fadeOutUp");
  }
});

// 关闭/显示网格
document.getElementById("btn-net").addEventListener("click", (e) => {
  const dom = e.target;
  if (dom.className.includes("btn-net-close")) {
    // 需要关闭网格
    dom.classList.remove("btn-net-close");
    dom.classList.add("btn-net");
    dom.setAttribute("i18n", "xian-shi-wang-ge");
    // dom.innerText = "显示网格";
    pluginGraph.switchGrid(false);
  } else {
    // 需要显示网格
    dom.classList.add("btn-net-close");
    dom.classList.remove("btn-net");
    dom.setAttribute("i18n", "guan-bi-wang-ge");
    // dom.innerText = "关闭网格";
    pluginGraph.switchGrid(true);
  }
  changeI18n(lang);
});
//  返回
document.getElementById("returnPreLevel").addEventListener("click", (e) => {
  pluginGraph.loadServerData();
  e.target.classList.add("hidden");
});
// 事件冒泡
document.body.addEventListener("click", (e) => {
  console.log(e);
  const dom = e.target;
  if (dom.hasAttribute("page-event")) {
    if (dom.getAttribute("page-event") == "showBgPic") {
      pluginGraph.showBgPic();
    } else {
      const type = dom.getAttribute("data-type");
      if (!type) return;
      pluginGraph.zoom(type);
    }
  }
});
document.getElementById("searchBtn").addEventListener("click", () => {
  pluginGraph.search(document.getElementById("searchInput").value);
});

// 切换语言
document.getElementById("btn-lang").addEventListener("click", () => {
  const langDom = document.getElementById("btn-lang");
  if (lang == "zh") {
    lang = "en";
    langDom.innerText = "English";
  } else {
    lang = "zh";
    langDom.innerText = "中文";
  }
  changeI18n(lang);
});
function changeI18n(l) {
  window.$i18n(lang, (config) => {
    pluginGraph.setI18nConfig(config);
  });
}
changeI18n(lang);

function initConfig(config) {
  const { general, header, toolbar, nodeTip, focus, theme, canvas } = config;
  document.body.className = theme;
  if (canvas) {
    updateCssVar("--canvas-bgColor", canvas.bgColor);
  }
  if (general) {
    const { fontFamily, fontSize } = general;
    updateCssVar("--base-font-family", fontFamily);
    updateCssVar("--base-font-size", fontSize);
  }
  if (header) {
    defaultFocusTop = header.height || "50px";
    updateCssVar("--header-height", defaultFocusTop);
    isFullFolded = header.isFullFolded;
    updateCssVar("--header-bgColor", header.bgColor);
    updateCssVar("--header-opacity", header.opacity);
    if (header.bgImage) {
      document.getElementById("header-bg").setAttribute("src", header.bgImage);
    }
  }
  if (toolbar) {
    updateCssVar("--toolbar-bgColor", toolbar.bgColor);
    updateCssVar("--toolbar-height", toolbar.height);
    updateCssVar("--toolbar-bgImg", toolbar.bgImg);
  }
  if (nodeTip) {
    updateCssVar("--nodetip-width", nodeTip.width);
    updateCssVar("--nodetip-maxRows", nodeTip.maxRows);
    updateCssVar("--nodetip-bgColor", nodeTip.bgColor);
    updateCssVar("--nodetip-borderWidth", nodeTip.borderWidth);
    updateCssVar("--nodetip-borderColor", nodeTip.borderColor);
    updateCssVar("--nodetip-panelBgImgUrl", nodeTip.panelBgImgUrl);
    updateCssVar("--nodetip-titleFont", nodeTip.titleFont);
    updateCssVar("--nodetip-titleSize", nodeTip.titleSize);
    updateCssVar("--nodetip-titleColor", nodeTip.titleColor);
    updateCssVar("--nodetip-titleTextAlien", nodeTip.titleTextAlien);
    updateCssVar("--nodetip-hoverFont", nodeTip.hoverFont);
    updateCssVar("--nodetip-hoverSize", nodeTip.hoverSize);
    updateCssVar("--nodetip-hoverColor", nodeTip.hoverColor);
    updateCssVar("--nodetip-hoverTextAlien", nodeTip.hoverTextAlien);
  }
  if (focus) {
    updateCssVar("--focus-width", focus.width);
    updateCssVar("--focus-bgColor", focus.bgColor);
    updateCssVar("--focus-borderWidth", focus.borderWidth);
    updateCssVar("--focus-borderColor", focus.borderColor);
    updateCssVar("--focus-panelBgImgUrl", focus.panelBgImgUrl);
    updateCssVar("--focus-titleFont", focus.titleFont);
    updateCssVar("--focus-titleSize", focus.titleSize);
    updateCssVar("--focus-titleColor", focus.titleColor);
    updateCssVar("--focus-titleBgColor", focus.titleBgColor);
    updateCssVar("--focus-titleTextAlien", focus.titleTextAlien);
    updateCssVar("--focus-hoverFont", focus.hoverFont);
    updateCssVar("--focus-hoverSize", focus.hoverSize);
    updateCssVar("--focus-hoverColor", focus.hoverColor);
    updateCssVar("--focus-hoverTextAlien", focus.hoverTextAlien);
  }

  pluginGraph.resize();
}
function updateCssVar(key, val) {
  if (val && key) {
    document.body.style.setProperty(key, val);
  }
}

function init(config, isReset = false) {
  console.log(isReset);
  if (!isReset) {
    pluginGraph = new PluginGraph(config);
    pluginGraph.init("app");
  } else {
    pluginGraph.setOptions(config);
    pluginGraph.resetConfig();
  }
  initConfig(config);
}

export default init;
