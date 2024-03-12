import { Scene } from "@antv/l7";
import { L7Layer } from "@antv/l7-leaflet";

const _addLayer = Scene.prototype.addLayer;
Scene.prototype.addLayer = function (layer) {
  try {
    layer.on("inited", () => {
      console.log(layer);
      this.mapService.map.fire("layeradd", { layer, isL7Layer: true });
    });
  } catch (e) {
    console.warn(e);
  }
  _addLayer.call(this, layer);
};

function addL7Layer(options = {}) {
  const l7layer = new L7Layer(options).addTo(this);
  const scene = l7layer.getScene();
  return scene;
}

export { addL7Layer };
