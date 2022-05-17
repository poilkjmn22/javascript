import Tree from "./Tree";

describe("test class Tree", () => {
  const t = new Tree(
    [
      { nodeId: 0, parentId: undefined },
      { nodeId: 1, parentId: 0 },
      { nodeId: 4, parentId: 0 },
      { nodeId: 10, parentId: 0 },
      { nodeId: 2, parentId: 1 },
      { nodeId: 3, parentId: 1 },
      { nodeId: 5, parentId: 4 },
      { nodeId: 6, parentId: 4 },
      { nodeId: 7, parentId: 4 },
      { nodeId: 11, parentId: 10 },
      { nodeId: 12, parentId: 10 },
      { nodeId: 8, parentId: 7 },
      { nodeId: 9, parentId: 7 },
    ],
    { customID: "nodeId", parentProperty: "parentId", needNodeInfo: false }
  );
  it("a new tree instance", () => {
    expect(t.T).toEqual([
      {
        nodeId: 0,
        parentId: undefined,
        children: [
          {
            parentId: 0,
            nodeId: 1,
            children: [
              {
                parentId: 1,
                nodeId: 2,
              },
              {
                parentId: 1,
                nodeId: 3,
              },
            ],
          },
          {
            nodeId: 4,
            parentId: 0,
            children: [
              {
                nodeId: 5,
                parentId: 4,
              },
              {
                nodeId: 6,
                parentId: 4,
              },
              {
                nodeId: 7,
                parentId: 4,
                children: [
                  {
                    nodeId: 8,
                    parentId: 7,
                  },
                  {
                    nodeId: 9,
                    parentId: 7,
                  },
                ],
              },
            ],
          },
          {
            nodeId: 10,
            parentId: 0,
            children: [
              {
                nodeId: 11,
                parentId: 10,
              },
              {
                nodeId: 12,
                parentId: 10,
              },
            ],
          },
        ],
      },
    ]);

    const t2 = new Tree([
      {
        id: 1,
        name: "Portfolio",
        parent_id: undefined,
      },
      {
        id: 2,
        name: "Web Development",
        parent_id: 1,
      },
      {
        id: 3,
        name: "Recent Works",
        parent_id: 2,
      },
      {
        id: 4,
        name: "About Me",
        parent_id: undefined,
      },
    ]);
    expect(t2.T).toEqual([
      {
        id: 1,
        name: "Portfolio",
        parent_id: undefined,
        depth: 0,
        nodeType: "root",
        children: [
          {
            id: 2,
            name: "Web Development",
            parent_id: 1,
            depth: 1,
            nodeType: "internal node",
            children: [
              {
                id: 3,
                name: "Recent Works",
                parent_id: 2,
                depth: 2,
                nodeType: "leaf",
              },
            ],
          },
        ],
      },
      {
        id: 4,
        name: "About Me",
        parent_id: undefined,
        depth: 0,
        nodeType: "root",
      },
    ]);
  });

  it("tree method toArray", () => {
    expect(t.toArray(t.T)).toEqual([
      { nodeId: 0, parentId: undefined },
      { nodeId: 1, parentId: 0 },
      { nodeId: 2, parentId: 1 },
      { nodeId: 3, parentId: 1 },
      { nodeId: 4, parentId: 0 },
      { nodeId: 5, parentId: 4 },
      { nodeId: 6, parentId: 4 },
      { nodeId: 7, parentId: 4 },
      { nodeId: 8, parentId: 7 },
      { nodeId: 9, parentId: 7 },
      { nodeId: 10, parentId: 0 },
      { nodeId: 11, parentId: 10 },
      { nodeId: 12, parentId: 10 },
    ]);
  });

  it("tree method findIndex", () => {
    expect(() => t.findIndex(6)).toThrow(/参数类型/);
    expect(t.findIndex((n) => n.nodeId === 0)).toBe(0);
    expect(t.findIndex((n) => n.nodeId === 6)).toBe(7);
    expect(t.findIndex((n) => n.nodeId === 13)).toBe(-1);
  });

  it("tree method find", () => {
    expect(() => t.find(6)).toThrow(/参数类型/);
    expect(t.find((n) => n.nodeId === 0)).toEqual({
      nodeId: 0,
      parentId: undefined,
    });
    expect(t.find((n) => n.nodeId === 6)).toEqual({
      nodeId: 6,
      parentId: 4,
    });
    expect(t.find((n) => n.nodeId === 13)).toBeNull();
  });

  it("tree method findParent", () => {
    expect(t.findParent((n) => n.nodeId === 9)).toEqual({
      nodeId: 7,
      parentId: 4,
    });
    expect(t.findParent((n) => n.nodeId === 0)).toBeNull();
  });

  it("tree method findAncestors", () => {
    expect(t.findAncestors((n) => n.nodeId === 9)).toEqual([
      {
        nodeId: 0,
        parentId: undefined,
      },
      {
        nodeId: 4,
        parentId: 0,
      },
      {
        nodeId: 7,
        parentId: 4,
      },
    ]);
    expect(t.findAncestors((n) => n.nodeId === 0)).toEqual([]);
    expect(t.findAncestors((n) => n.nodeId === 111)).toEqual([]);
  });
});
