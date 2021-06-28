const root = document.getElementById("app");
const button = root.querySelector("button");

button.onclick = async () => {
  const url = root.querySelector("img").src;
  return fetch(url).then(res => res.blob()).then(data => // @ts-ignore
  navigator.clipboard.write([new ClipboardItem({
    [data.type]: data
  })])).then(() => {
    button.innerHTML = "Copied";
  });
};

document.addEventListener("copy", e => {
  const selection = getSelection();

  if (selection.type === "Range") {
    e.clipboardData.setData("Text", selection.toString()); // 复制按钮文本时同步改变按钮内容会导致复制失败

    setTimeout(() => {
      button.innerHTML = "Copied";
    });
  }
}); // 1. 复制截图, 成功
// 2. 请求同源图片, 复制成功
// 3. 复制选中项, 成功

document.addEventListener("paste", function (event) {
  let target = event.target;

  while (!target.classList?.contains("paste-area")) {
    target = target.parentNode;

    if (!target) {
      alert("请在指定区域粘贴!");
      return;
    }
  }

  if (target.hasAttribute("contenteditable")) {
    return;
  }

  const items = event.clipboardData && event.clipboardData.items || [];
  let file = null;

  for (const item of items) {
    const {
      type
    } = item;

    if (type.indexOf("image") !== -1) {
      file = item.getAsFile();
      const blobUrl = URL.createObjectURL(file);
      const img = document.createElement("img");
      img.src = blobUrl;
      target.append(img);
    } else if (type.match(/^text\/html/)) {
      item.getAsString(function (s) {
        const div = document.createElement("span");
        div.innerHTML = s;
        target.append(div);
      });
    }
  } // reset


  button.innerHTML = "Copy";
});
