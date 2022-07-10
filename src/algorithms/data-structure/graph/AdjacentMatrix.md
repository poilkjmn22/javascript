## 2022-07-10 19:37:32
### 邻接矩阵的初始化：1.当dataSourceType = 'adjacentList'时, 需提供所有顶点-邻接表的数组，内部会按照顺序维护顶点列表； [verticeData, [adjacentList]], verticeData为顶点数据,adjacentList为该顶点的领接顶点列表，会以id标识每一个顶点；加权图需在options中配置，并且权值默认为Infinity,权值统一读取verticeData的weight字段;
