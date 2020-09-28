import Element from "./Element.class";

function createElement(tagName, attrs, children) {
  return new Element(tagName, attrs, children);
}

function render(vDom) {
  const { tagName, attrs, children } = vDom;

  let el = document.createElement(tagName);

  setNodeAttr(el, attrs);

  if (typeof children === "string") {
    let textNode = document.createTextNode(children);
    el.appendChild(textNode);
  } else {
    children.map((c) => {
      if (c instanceof Element) {
        const childrens = render(c);
        el.appendChild(childrens);
      }
    });
  }

  return el;
}

// 设置节点的样式
function setNodeAttr(node, attrs) {
  for (let key in attrs) {
    let value = attrs[key];
    if (key === "className") {
      node.className = value;
    } else if (key === "value") {
      if (["input", "textarea"].includes(node.tagName)) {
        node.value = value;
      } else {
        node.setAttribute("value", value);
      }
    } else if (key === "style") {
      if (typeof value === "string") {
        node.style.cssText = value;
      } else if (typeof value == "object") {
        for (let styleKey in value) {
          node.style[styleKey] = value[styleKey];
        }
      }
    } else {
      node.setAttribute(key, value);
    }
  }
}

export { createElement, render, setNodeAttr };
