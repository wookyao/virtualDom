import Element from "./Element.class";
import { ATTR, TEXT, REMOVE, REPLACE } from "./patchTypes";

import { setNodeAttr, render } from "./vDOM";

let finalPatches = {},
  rnIndex = 0;

function doPatch(realDOM, patches) {
  finalPatches = patches;
  walkPatch(realDOM);
}

function walkPatch(realNode) {
  let rnPatch = finalPatches[rnIndex++];
  let rnChildren = realNode.childNodes;

  if (rnPatch && realNode) {
    patchActions(realNode, rnPatch);
  }

  [...rnChildren].map((c) => {
    walkPatch(c);
  });
}

function patchActions(realNode, rnPatch) {
  rnPatch.forEach((patch) => {
    switch (patch.type) {
      case ATTR:
        setNodeAttr(realNode, patch.attrs);
        break;

      case REPLACE:
      case TEXT:
        let newNode =
          patch.type === TEXT
            ? document.createTextNode(patch.text)
            : render(patch.newNode);
        realNode.parentNode.replaceChild(newNode, realNode);
        break;
      case REMOVE:
        realNode.parentNode.removeChild(realNode);
        break;

      default:
        break;
    }
  });
}

export default doPatch;
