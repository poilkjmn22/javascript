const mapConfig = {
  center: [39.92, 116.46], // Beijing
  zoom: 10,
  maxZoom: 18,
  tiandituKey: "1165f5fbb77c230014e6af5b634ac947", // replace with your Tianditu key
};

// 业务内网网站部署在10地址上，业务外网网站部署在192地址上
const env = location.host.startsWith("10") ? "业务内网" : "业务外网";
let arcgisOrigin = "https://mapser02.nsbd.cn";
if (env === "业务内网") {
  arcgisOrigin = "https://10.100.121.4";
}
const layersConfig = {
  tianditu: function addBasemapTiantitu(mapInstance, L) {
    L.tileLayer
      .chinaProvider("TianDiTu.Satellite.Map", {
        key: mapConfig.tiandituKey,
        name: "天地图(影像)",
        maxZoom: 18,
        minZoom: 5,
      })
      .addTo(mapInstance);
    // L.tileLayer
      // .chinaProvider("TianDiTu.Normal.Map", {
        // key: mapConfig.tiandituKey,
        // name: "天地图(矢量)",
        // maxZoom: 18,
        // minZoom: 5,
      // })
      // .addTo(mapInstance);
    // L.tileLayer
      // .chinaProvider("TianDiTu.Normal.Annotion", {
        // key: mapConfig.tiandituKey,
        // name: "天地图(矢量注记)",
        // maxZoom: 18,
        // minZoom: 5,
      // })
      // .addTo(mapInstance);
  },
  arcgis: function addBasemapArcgis(mapInstance, L) {
    const tiles = [
      {
        url:
          arcgisOrigin +
          "/arcgis/rest/services/Basemap/NSBD_Image_Basemap_L0_L9/MapServer",
        minZoom: 0,
        maxZoom: 18,
        maxNativeZoom: 9,
        crs: L.CRS.EPSG4326,
      },
      {
        url:
          arcgisOrigin +
          "/arcgis/rest/services/Basemap/NSBD_Image_Basemap_L10_L15/MapServer",
        minZoom: 11,
        maxZoom: 18,
        maxNativeZoom: 14,
        crs: L.CRS.EPSG4326,
      },
      {
        url:
          arcgisOrigin +
          "/arcgis/rest/services/Basemap/NSBD_Image_Basemap_L16_L19/MapServer",
        minZoom: 16,
        maxZoom: 18,
        crs: L.CRS.EPSG4326,
      },
    ];
    tiles.forEach((tile) => {
      L.esri.tiledMapLayer(tile).addTo(mapInstance);
    });
  },
};
export { mapConfig, layersConfig };
