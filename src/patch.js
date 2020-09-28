import Element from "./Element.class";
import { ATTR, TEXT, REMOVE, REPLACE, NEWNODE } from "./patchTypes";

let patchs = {},
  nodeIndex = 0;

function patch(oldNode, newNode) {
  patchs = {};
  nodeIndex = 0;
  let index = 0;
  return vNodeWalk(oldNode, newNode, index);
}

function vNodeWalk(oldNode, newNode, index) {
  const { tagName, attrs, children } = oldNode;
  if (!newNode) {
    patchs[index] = {
      type: REMOVE,
      index,
    };
  } else if (!oldNode) {
    patchs[index] = {
      type: NEWNODE,
      newNode,
    };
  } else if (typeof oldNode === "string" && typeof newNode === "string") {
    if (oldNode !== newNode) {
      patchs[index] = {
        type: TEXT,
        text: newNode,
      };
    }
  } else if (tagName === newNode.tagName) {
    const props = attrsWalk(attrs, newNode.attrs);
    if (Object.keys(props).length) {
      patchs[index] = {
        type: ATTR,
        attrs: props,
      };
    }

    childrenWalk(children, newNode.children);
  } else {
    patchs[index] = {
      type: REPLACE,
      newNode,
    };
  }

  return patchs;
}

function attrsWalk(attrs, targetAttrs) {
  let props = {};

  for (let key in attrs) {
    if (attrs[key] !== targetAttrs[key]) {
      props[key] = targetAttrs[key];
    }
  }

  for (let key in targetAttrs) {
    if (!attrs.hasOwnProperty(key)) {
      props[key] = targetAttrs[key];
    }
  }

  return props;
}

function childrenWalk(children, newChi) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  if (!Array.isArray(newChi)) {
    newChi = [newChi];
  }

  let nodeList = children.length > newChi.length ? children : newChi;

  nodeList.map((item, idx) => {
    vNodeWalk(children[idx] || "", newChi[idx] || "", ++nodeIndex);
  });
}

export { patch };
