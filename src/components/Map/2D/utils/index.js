import { onMounted, ref, getCurrentInstance } from "@vue/composition-api";
import * as THREE from "three";

const earthRadius = 6371;

function getMapInstance() {
  const map = ref(null);
  const vueInstance = getCurrentInstance();
  map.value = vueInstance.setupContext.attrs.map;
  return map;
}

function lngLat2WebMercator(lnglat) {
  let x = (lnglat[0] * 20037508.34) / 180;
  let y =
    Math.log(Math.tan(((90 + lnglat[1]) * Math.PI) / 360)) / (Math.PI / 180);
  y = (y * 20037508.34) / 180;
  return [x, y];
}
function webMercator2LonLat(x, y) {
  lon = (x / 20037508.34) * 180;
  lat = (y / 20037508.34) * 180;
  lat =
    (180 / Math.PI) *
    (2 * Math.atan(Math.exp((lat * Math.PI) / 180)) - Math.PI / 2);
  return [lon, lat];
}

function lngLat2Coord(lnglat) {
  const spherical = new THREE.Spherical(
    earthRadius,
    THREE.MathUtils.degToRad(lnglat[1]),
    THREE.MathUtils.degToRad(lnglat[0])
  );
  let vector3 = new THREE.Vector3().setFromSpherical(spherical);
  return vector3;
}

export { getMapInstance, lngLat2WebMercator, webMercator2LonLat, lngLat2Coord };
