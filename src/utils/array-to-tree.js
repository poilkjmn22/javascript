function groupByParent(arr) {
  const group = new Map();
  let _parent;
  for (const a of arr) {
    _parent = a._parent || 'root';
    if (!group.has(_parent)) group.set(_parent, []);
    group.get(_parent).push(a);
  }
  return group;
}

function createTree(group, childNodes) {
  const res = [];
  for (let childNode of childNodes) {
    let tree = group.get(childNode.name);
    if (tree) {
      childNode.children = createTree(group, tree);
    }
    res.push(childNode);
  }
  return res;
}

export function toTree(dataSource) {
  const group = groupByParent(dataSource);
  return createTree(group, group.get('root'));
}
