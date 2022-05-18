import Queue from "../queue/Queue";
import { isArray, deepClone, keyBy, omit } from "../../../utils/util";
const defaultOptions = {
  parentProperty: "parent_id",
  childrenProperty: "children",
  customID: "id",
  rootID: "00000",
  needNodeInfo: true,
};
function isEmptyValue(v) {
  const emptyValues = [undefined, null, "", NaN];
  return emptyValues.includes(v);
}
export default class Tree {
  constructor(data, options) {
    this.options = Object.assign({}, defaultOptions, options);
    this.T = this.arrayToTree(data);
    if (this.options.needNodeInfo) {
      this.addNodeInfo();
    }
  }
  addNodeInfo() {
    this.T.forEach((d) => (d.depth = 0));
    this.traverse((node, p) => {
      if (!p) {
        node.depth = 0;
        node.nodeType = "root";
      } else {
        node.depth = p.depth + 1;
        node.nodeType =
          node.children && node.children.length > 0 ? "internal node" : "leaf";
      }
    });
  }
  traverse(cb) {
    function walk(nodes, p) {
      for (const v of nodes) {
        cb(v, p);
        if (v.children && v.children.length > 0) {
          walk(v.children, v);
        }
      }
    }
    walk(this.T, null);
  }

  toArray() {
    const res = [];
    if (!isArray(this.T)) {
      return res;
    }
    const { childrenProperty } = this.options;
    function innerWalk(child) {
      for (const d of child) {
        res.push(omit(d, childrenProperty));
        if (d[childrenProperty] && d[childrenProperty].length > 0) {
          innerWalk(d[childrenProperty]);
        }
      }
    }
    innerWalk(this.T);
    return res;
  }

  findIndex(predicate) {
    let index = -1;
    let found = -1;
    let identity = predicate;
    if (typeof identity !== "function") {
      identity = (d) => d === predicate;
    }
    const { childrenProperty } = this.options;
    const q = new Queue(this.T);
    while (!q.isEmpty()) {
      const processing = q.dequeue();
      index += 1;
      if (identity.call(null, processing)) {
        found = index;
        break;
      }
      q.enqueueMany(processing[childrenProperty]);
    }
    return found;
  }

  find(predicate) {
    let found = null;
    let identity = predicate;
    if (typeof identity !== "function") {
      identity = (d) => d === predicate;
    }
    const { childrenProperty } = this.options;
    const q = new Queue(this.T);
    while (!q.isEmpty()) {
      const processing = q.dequeue();
      if (identity.call(null, processing)) {
        found = omit(processing, childrenProperty);
        break;
      }
      q.enqueueMany(processing[childrenProperty]);
    }
    return found;
  }

  findParent(predicate) {
    const targetNode = this.find(predicate);
    const { parentProperty, customID } = this.options;
    return this.find((n) => n[customID] === targetNode[parentProperty]);
  }

  findAncestors(predicate) {
    const node = this.find(predicate);
    const parents = [];
    const { parentProperty, customID } = this.options;
    let tmp = node;
    while (tmp) {
      tmp = this.find((n) => n[customID] === tmp[parentProperty]);
      if (tmp) {
        parents.unshift(tmp);
      }
    }
    return parents;
  }

  createTree(array, rootNodes, customID, childrenProperty) {
    const tree = [];

    for (const rootNode in rootNodes) {
      const node = rootNodes[rootNode];
      const childNode = array[node[customID]];

      if (!node && !rootNodes.hasOwnProperty(rootNode)) {
        continue;
      }

      if (childNode) {
        node[childrenProperty] = this.createTree(
          array,
          childNode,
          customID,
          childrenProperty
        );
      }

      tree.push(node);
    }

    return tree;
  }

  groupByParents(array, options) {
    const arrayByID = keyBy(array, options.customID);

    return array.reduce(function (prev, item) {
      let parentID = item[options.parentProperty];
      if (isEmptyValue(parentID) || !arrayByID.hasOwnProperty(parentID)) {
        parentID = options.rootID;
      }

      if (!isEmptyValue(parentID) && prev.hasOwnProperty(parentID)) {
        prev[parentID].push(item);
        return prev;
      }

      prev[parentID] = [item];
      return prev;
    }, {});
  }

  arrayToTree(data) {
    if (!isArray(data)) {
      throw new TypeError("Expected an array but got an invalid argument");
    }

    const grouped = this.groupByParents(deepClone(data), this.options);

    return this.createTree(
      grouped,
      grouped[this.options.rootID],
      this.options.customID,
      this.options.childrenProperty
    );
  }
}
