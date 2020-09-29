import { ATTR, TEXT, REMOVE, REPLACE } from "./patchTypes";

let patches = {},
  nodeIndex = 0;

function patch(oldNode, newNode) {
  patches = {};
  nodeIndex = 0;
  let index = 0;
  vNodeWalk(oldNode, newNode, index);
  return patches;
}

function vNodeWalk(oldNode, newNode, index) {
  const { tagName, attrs, children } = oldNode;
  let arrPatches = [];
  if (!newNode) {
    arrPatches.push({
      type: REMOVE,
      index,
    });
  } else if (typeof oldNode === "string" && typeof newNode === "string") {
    if (oldNode !== newNode) {
      arrPatches.push({
        type: TEXT,
        text: newNode,
      });
    }
  } else if (tagName === newNode.tagName) {
    const props = attrsWalk(attrs, newNode.attrs);
    if (Object.keys(props).length) {
      arrPatches.push({
        type: ATTR,
        attrs: props,
      });
    }

    childrenWalk(children, newNode.children);
  } else {
    arrPatches.push({
      type: REPLACE,
      newNode,
    });
  }

  if (arrPatches.length) {
    patches[index] = arrPatches;
  }
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
