import { equals } from "@/geometry/utils";

function getClosestPairByExhaustion(points) {
  let minDistance = Infinity;
  let closestPair = [null, null, minDistance];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const distance = points[i].getDistanceP(points[j]);
      if (distance < minDistance) {
        minDistance = distance;
        closestPair = [points[i], points[j], minDistance];
      }
    }
  }
  return closestPair;
}

// 记min(X)为区域X内的Closest Pair的距离
// A区域和B区域合并起来以后，只需要查找[-min(A, B), min(A, B)]矩形范围内的点集（记为C）,合并后的结果就是min(A, B, C)
// 初始时，按x（或y）轴排序输入points
function getClosestPairByDivideAndConquer(rawpoints) {
  function partition(points, left, right) {
    const mid = Math.floor((left + right) / 2);
    if (mid > left) {
      const minA = partition(points, left, mid);
      const minB = partition(points, mid, right);
      const minAB = Math.min(minA, minB);
      const xmid = points[mid].x;
      const C = [points[mid]];
      for (let i = mid - 1; i >= left; i--) {
        if (xmid - points[i].x <= minAB) {
          C.push(points[i]);
        } else {
          break;
        }
      }
      for (let i = mid + 1; i <= right; i++) {
        if (points[i].x - xmid <= minAB) {
          C.push(points[i]);
        } else {
          break;
        }
      }
      return Math.min(minAB, getClosestPairByExhaustion(C)[2]);
    } else {
      return points[left].getDistanceP(points[right]);
    }
  }

  return partition(
    [...rawpoints].sort((a, b) => a.x - b.x),
    0,
    rawpoints.length - 1
  );
}

function getClosestPairByDP(points) {
  let mind = points[0].getDistanceP(points[1]);
  const lastPoints = [points[0], points[1]];
  for (let i = 2; i < points.length; i++) {
    mind = Math.min(
      Math.min.apply(
        null,
        lastPoints.map((p) => p.getDistanceP(points[i]))
      ),
      mind
    );
    lastPoints.push(points[i]);
  }
  return mind;
}

export {
  getClosestPairByExhaustion,
  getClosestPairByDivideAndConquer,
  getClosestPairByDP,
};
