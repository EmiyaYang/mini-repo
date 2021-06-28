import copy from "https://cdn.skypack.dev/copy-to-clipboard@3.3.1";

const asyncButton = document.querySelector("#btn-async");
const asyncButton2 = document.querySelector("#btn-async2");

asyncButton.onclick = () => {
  fetch(
    "https://result.eolinker.com/zdBe81Pa8b841f6b8fe96ba5e8e67a6fac3804a3da7c8b8?uri=/system/announcements",
  )
    .then((res) => res.text())
    .then(() => {
      const data = new Date();

      navigator.clipboard
        .writeText(data)
        .then(() => {
          document.querySelector("#hint").innerHTML = `"${data}" copied`;
        })
        .catch((e) => {
          document.querySelector("#hint").innerHTML = "copy fail: " + e.message;
        });
    });
};

asyncButton2.onclick = () => {
  fetch(
    "https://result.eolinker.com/zdBe81Pa8b841f6b8fe96ba5e8e67a6fac3804a3da7c8b8?uri=/system/announcements",
  )
    .then((res) => res.text())
    .then(() => {
      const button = document.createElement("button");
      button.onclick = () => {
        const data = new Date();

        copy(data);

        document.querySelector("#hint").innerHTML = `"${data}" copied`;
      };
      button.click();
    });
};
