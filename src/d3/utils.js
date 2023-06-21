function addEventToText(
  svg,
  eventType,
  cb,
  text = "click on this text to update the chart with new data values(once)."
) {
  return svg
    .append("text")
    .attr("x", "30")
    .attr("y", "30")
    .text(text)
    .on(eventType, cb);
}

function defineRectClipPath(svg, w, h, padding, url) {
  svg
    .append("clipPath")
    .attr("id", url)
    .append("rect")
    .attr("x", padding)
    .attr("y", padding)
    .attr("width", w - padding * 3)
    .attr("height", h - padding * 2);
}

export { addEventToText, defineRectClipPath };
