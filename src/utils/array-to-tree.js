function groupByParent(arr, { parentProperty }) {
  const group = new Map();
  let parent;
  for (const a of arr) {
    parent = a[parentProperty] || "root";
    if (!group.has(parent)) group.set(parent, []);
    group.get(parent).push(a);
  }
  return group;
}

function createTree(group, childNodes, options, parent) {
  const { childrenProperty, withLevel, customId } = options;
  if (!childNodes) {
    return [];
  }
  for (let childNode of childNodes) {
    if (withLevel) {
      childNode.level = (parent && parent.level + 1) || 0;
    }
    let cgroup = group.get(childNode[customId]);
    if (cgroup) {
      childNode[childrenProperty] = createTree(
        group,
        cgroup,
        options,
        childNode
      );
    }
  }
  return [...childNodes];
}
const defaultOptions = {
  parentProperty: "_parent",
  childrenProperty: "children",
  customId: "name",
  withLevel: false,
};

const getFinalOptions = (options) =>
  Object.assign({ ...defaultOptions }, options);

export function toTree(dataSource, options) {
  const finalOptions = getFinalOptions(options);
  const group = groupByParent(dataSource, finalOptions);
  return createTree(group, group.get("root"), finalOptions);
}

export function findTreeNode(nodes, predicate, options) {
  if (!nodes || !nodes.length) {
    return null;
  }
  const { childrenProperty } = getFinalOptions(options);
  let found = null;
  let processing = [...nodes];
  while (processing.length > 0) {
    const processed = processing.shift();
    if (predicate(processed)) {
      found = processed;
      break;
    }
    if (processed[childrenProperty] && processed[childrenProperty].length > 0) {
      processing.unshift(...processed[childrenProperty]);
    }
  }
  return found;
}

export function findTreeNodeIndex(nodes, predicate, options) {
  if (!nodes || !nodes.length) {
    return null;
  }
  let foundIndex = -1;
  let processing = [...nodes];
  let idx = -1;
  while (processing.length > 0) {
    const processed = processing.shift();
    idx += 1;
    if (predicate(processed)) {
      foundIndex = idx;
      break;
    }
    const { childrenProperty } = getFinalOptions(options);
    if (processed[childrenProperty] && processed[childrenProperty].length > 0) {
      processing.unshift(...processed[childrenProperty]);
    }
  }
  return foundIndex;
}

export function findTreeNodePath(nodes, predicate, options) {
  if (!nodes || !nodes.length) {
    return null;
  }
  const { childrenProperty } = getFinalOptions(options);
  let processing = [...nodes];
  let path = [];
  let found = null;
  while (processing.length > 0) {
    const processed = processing.shift();
    if (predicate(processed)) {
      found = processed;
      break;
    }
    if (processed[childrenProperty] && processed[childrenProperty].length > 0) {
      processing.unshift(
        ...processed[childrenProperty].map((c) =>
          Object.assign(c, { _parent: processed })
        )
      );
    }
  }
  let pathNode = found;
  while (pathNode) {
    path.unshift(pathNode);
    pathNode = pathNode._parent;
  }
  return path;
}
