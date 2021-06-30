document.addEventListener("copy", e => {
  const selection = window.getSelection();
  let selectedBlock;

  if (selection.focusNode?.classList?.contains("block")) {
    selectedBlock = selection.focusNode;
  } else if (selection.anchorNode?.classList?.contains("block")) {
    selectedBlock = selection.anchorNode;
  } else {
    selectedBlock = selection.focusNode // @ts-ignore
    ?.querySelector?.(".block") || selection.anchorNode // @ts-ignore
    ?.querySelector?.(".block");
  }

  selectedBlock && e.clipboardData.setData("text/plain", selectedBlock.textContent);
  selectedBlock && e.clipboardData.setData("text/html", selectedBlock.outerHTML);
  e.preventDefault();
  document.querySelector("#hint").innerHTML = "copied";
});
document.addEventListener("paste", e => {
  console.log(e.clipboardData.items);
  Array.from(e.clipboardData.items)?.forEach(item => item.getAsString(console.log));
});
