import { LineLayer, PolygonLayer } from "@antv/l7";
import { L7Layer } from "@antv/l7-leaflet";

const addLineLayer = (url, mapInstance) => {
  const l7layer = new L7Layer({ logoVisible: false }).addTo(mapInstance);
  const scene = l7layer.getScene();
  const image = require("@/assets/map/water-arrow.svg");
  scene.addImage("arrow", image);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const layer = new LineLayer({})
        .source(data)
        .size(3)
        .shape("line")
        .texture("arrow")
        .color("rgb(22,119,255)")
        .animate({
          interval: 1, // interval
          duration: 1, // duration, delay
          trailLength: 2, // streamline length
        })
        .style({
          opacity: 0.6,
          lineTexture: true, // Enable line mapping function
          iconStep: 10, // Set the spacing of the texture
          borderWidth: 0.4, //The default value is 0, the maximum valid value is 0.5
          borderColor: "#fff", // Default is #ccc
        });
      scene.addLayer(layer);
    });
};

const addPolygonLayer = (url, mapInstance) => {
  const l7layer = new L7Layer({ logoVisible: false }).addTo(mapInstance);
  const scene = l7layer.getScene();
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const layer = new PolygonLayer({})
        .source(data)
        .shape("fill")
        .color("rgb(22,119,255)")
        .style({
          opacity: 0.6,
        });
      scene.addLayer(layer);
    });
};

export { addLineLayer, addPolygonLayer };
