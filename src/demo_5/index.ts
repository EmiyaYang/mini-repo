import copy from "https://cdn.skypack.dev/copy-to-clipboard@3.3.1";

let loading = false;

function genStr(n) {
  let c = "1";
  while (c.length < n) {
    c += c;
  }

  return c;
}

const buttonArr = [
  { size: 1024, label: "1KB", data: genStr(1024) },
  {
    size: 1024 * 1024,
    label: "1MB",
    data: genStr(1024 * 1024),
  },
  {
    size: 1024 * 1024 * 10,
    label: "10MB",
    data: genStr(1024 * 1024 * 10),
  },
  {
    size: 1024 * 1024 * 100,
    label: "100MB",
    danger: true,
    data: genStr(1024 * 1024 * 100),
  },
];

Array.from(document.querySelectorAll("button.sync")).forEach(
  (button, index) => {
    const { data, label, danger } = buttonArr[index];

    button.innerHTML = label;

    if (danger) {
      button.classList.add("btn-danger");
      button.classList.remove("btn-primary");
    } else {
      button.classList.remove("btn-danger");
      button.classList.add("btn-primary");
    }

    button.onclick = async () => {
      if (loading) {
        return;
      }

      loading = true;

      const startAt = +new Date();

      copy(data);

      const endAt = +new Date();

      document.querySelector("#hint").innerHTML = `${label} 用时 ${
        endAt - startAt
      }ms`;

      loading = false;
    };
  },
);

Array.from(document.querySelectorAll("button.async")).forEach(
  (button, index) => {
    const { size, label, danger, data } = buttonArr[index];

    button.innerHTML = label;

    if (danger) {
      button.classList.add("btn-danger");
      button.classList.remove("btn-primary");
    } else {
      button.classList.remove("btn-danger");
      button.classList.add("btn-primary");
    }

    button.onclick = async () => {
      if (loading) {
        return;
      }

      loading = true;

      const startAt = +new Date();

      await navigator.clipboard.writeText(data);

      const endAt = +new Date();

      document.querySelector("#async-hint").innerHTML = `${label} 用时 ${
        endAt - startAt
      }ms`;

      loading = false;
    };
  },
);
