const ww = async () => {
  const a = await new Promise((res) => res(3));
  console.log(a);
};

module.exports = ww;
