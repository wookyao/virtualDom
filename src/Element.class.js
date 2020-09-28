export default class Element {
  constructor(tagName, attrs, children) {
    this.tagName = tagName;
    this.attrs = attrs || {};
    this.children = children || "";
  }
}
