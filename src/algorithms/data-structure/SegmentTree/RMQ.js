const MAX_N = Infinity;
class RQM {
  constructor(arr) {
    this.arr = arr;
    this.dat = [];
    this.n = 1;
    this.init(arr);
    for (let i = 0; i < arr.length; i++) {
      this.update(i, arr[i]);
    }
  }
  init(arr) {
    const _n = arr.length;
    while (this.n < _n) {
      this.n *= 2;
    }
    for (let i = 0; i < 2 * this.n - 1; i++) {
      this.dat[i] = MAX_N;
    }
  }
  // 把第k个值[0, str.length)更新为a
  update(_k, a) {
    let k = _k + this.n - 1; // dat中的叶子结点
    this.dat[k] = a;
    // 向上更新
    while (k > 0) {
      k = parseInt((k - 1) / 2);
      this.dat[k] = Math.min(this.dat[k * 2 + 1], this.dat[k * 2 + 2]);
    }
  }
  // 求[a, b)区间内的最小值
  query(a, b) {
    // 在外部调用时，用query(a, b, 0, 0, n)
    const recurr = (a, b, k, l, r) => {
      if (a >= r || b <= l) {
        return MAX_N;
      }
      if (a <= l && b >= r) {
        return this.dat[k];
      } else {
        const vl = recurr(a, b, k * 2 + 1, l, (l + r) / 2);
        const vr = recurr(a, b, k * 2 + 2, (l + r) / 2, r);
        return Math.min(vl, vr);
      }
    };
    return recurr(a, b, 0, 0, this.arr.length);
  }
}

export default RQM;
