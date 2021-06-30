const result = document.querySelector("#result");
Array.from(document.querySelectorAll(".card")).forEach(dom => {
  const button = dom.querySelector("button");
  const img = dom.querySelector("img");

  button.onclick = async e => {
    const src = img.src;
    const data = await fetch(src);
    const blob = await data.blob();
    button.innerHTML = "Coping...";
    const startAt = +new Date();
    await navigator.clipboard.write([new ClipboardItem({
      [blob.type]: blob
    })]);
    const endAt = +new Date();
    button.innerHTML = "Time: " + (endAt - startAt) + "ms" + "<br/>" + "Size: " + Math.floor(blob.size / 1024) + "KB"; // reset

    result.innerHTML = "⌘ + v";
  };
});
document.addEventListener("paste", async e => {
  try {
    const clipboardItems = await navigator.clipboard.read();

    for (const clipboardItem of clipboardItems) {
      for (const type of clipboardItem.types) {
        const blob = await clipboardItem.getType(type);
        const imageUrl = URL.createObjectURL(blob);
        const img = document.createElement("img");
        img.src = imageUrl;
        result.innerHTML = "";
        result.append(img);
      }
    }
  } catch (e) {
    result.innerHTML = "Fail to copy: " + e.message;
  }
});
