import { createElement as h, render } from "./vDOM";
import renderDOM from "./renderDOM";
import { patch } from "./domDiff";
import doPatch from "./doPatch";

const vDom = h(
  "ul",
  {
    id: "oldNode",
    className: "list",
    style: "background: #f8f8f8",
  },
  [
    h(
      "li",
      {
        className: "list-item",
        style: {
          background: "#000",
          color: "#fff",
        },
      },
      "this is first item"
    ),
    h(
      "li",
      {
        className: "list-item",
        style: "color: red",
        alt: "alt",
      },
      [h("b", {}, "this is last item")]
    ),
  ]
);
const realDOM = render(vDom);
renderDOM(realDOM, document.getElementById("app"));

const vDomChange = h(
  "ul",
  {
    id: "newNode",
    className: "list-wrap",
    style: "background: #ccc",
    "data-tips": "todo list",
  },
  [
    h(
      "li",
      {
        className: "list-item",
        style: {
          background: "#000",
          color: "#fff",
        },
      },
      "I'm changed"
    ),
    h(
      "li",
      {
        className: "list-item",
        style: "color: red",
        alt: "alt",
      },
      [h("i", {}, "b => i")]
    ),
  ]
);

const patches = patch(vDom, vDomChange);

console.log(patches);

window.onload = function () {
  let $btn = document.getElementById("btn");

  $btn.addEventListener("click", () => {
    doPatch(realDOM, patches);
  });
};
