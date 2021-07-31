const HIDDEN_PROPERTIES = {
  position: "absolute",
  visibility: "hidden",
  display: "block"
};
function getDimensions(element) {
  const previous = {};
  for (let key in HIDDEN_PROPERTIES) {
    previous[key] = element.style[key];
    element.style[key] = HIDDEN_PROPERTIES[key];
  }
  
  const result = {
    width: element.offsetWidth,
    height: element.offsetHeight
  };
  
  for (let key in HIDDEN_PROPERTIES) {
    element.style[key] = previous[key];
  }
  return result;
};

export {
  getDimensions,
}
