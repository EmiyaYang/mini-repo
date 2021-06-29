const root = document.getElementById("app");
const button = root.querySelector("button");

document.querySelectorAll(".paste-area").forEach((item) => {
  item.onfocus = function () {
    this.classList.add("focused");
  };
  item.onblur = function () {
    this.classList.remove("focused");
  };
});

button.onclick = async () => {
  const url = root.querySelector("img").src;

  const textBlob = new Blob([root.querySelector(".txt").textContent], {
    type: "text/plain",
  });

  return fetch(url)
    .then((res) => res.blob())
    .then((data) =>
      // @ts-ignore
      navigator.clipboard.write([
        // @ts-ignore
        new ClipboardItem({ [data.type]: data, [textBlob.type]: textBlob }),
      ]),
    )
    .then(() => {
      button.innerHTML = "Copied";
    });
};

// 1. 复制截图, 成功
// 2. 请求同源图片, 复制成功
// 3. 复制选中项, 成功
document.addEventListener("paste", function (event) {
  let target = event.target as HTMLElement;

  while (!target.classList?.contains("paste-area")) {
    target = target.parentNode as HTMLElement;

    if (!target) {
      alert("请在指定区域粘贴!");
      return;
    }
  }

  event.clipboardData.getData;

  if (target.hasAttribute("contenteditable")) {
    return;
  }

  const items = (event.clipboardData && event.clipboardData.items) || [];

  let textItem = null;

  let file = null;
  for (const item of items) {
    const { type } = item;

    item.getAsString((s) => {
      console.log("test", s);
    });

    if (type.indexOf("image") !== -1) {
      file = item.getAsFile();
      const blobUrl = URL.createObjectURL(file);
      const img = document.createElement("img");

      img.src = blobUrl;

      target.append(img);
    } else if (type.match(/^text/)) {
      textItem = item;
    }
  }

  textItem?.getAsString(function (s) {
    const div = document.createElement("span");
    div.innerHTML = s;

    target.append(div);
  });

  // reset
  button.innerHTML = "Copy";
});
