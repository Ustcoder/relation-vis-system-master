window.$i18n = function (lang,callback) {
  const i18nMap = {
    zh: "/lang/zh.json",
    en: "/lang/en.json",
  };
  const url = i18nMap[lang];
  if (!url) return;
  let request = new XMLHttpRequest();
  request.open("get", url);
  // 不发送数据到服务器
  request.send(null);
  request.onload = function () {
    // 返回状态为200，即为数据获取成功
    if (request.status == 200) {
      let data = JSON.parse(request.responseText);
      callback && callback(data);
      // 获取所有带有i18n属性的元素
      const i18nElements = document.querySelectorAll("[i18n]");


      const innerTextType = ['DIV','SPAN'];

      // 遍历每个元素
      i18nElements.forEach((element) => {
        // 判断元素类型
        if (element.tagName === "INPUT") {
          // 如果是input，则修改placeholder属性
          const placeholderValue = element.getAttribute("i18n");
          element.placeholder = data[placeholderValue];
        } else if (innerTextType.includes(element.tagName)) {
          // 如果是div，则修改innerText属性
          const textValue = element.getAttribute("i18n");
          element.innerText = data[textValue];
        } else if (element.tagName === "A") {
          // 如果是div，则修改innerText属性
          const titleValue = element.getAttribute("i18n");
          element.title = data[titleValue];
        }
      });
    } else {
    }
  };
};
