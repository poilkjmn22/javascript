import gulp from "gulp";

import imgmin, {minimg} from "./tasks/imgmin.mjs";
import { backupImg, removeImgBak } from "./tasks/backupImg.mjs";
function _imgmin(cb) {
  imgmin();
  cb();
}
function _minimg(cb) {
  minimg();
  cb();
}

function _backupImg(cb) {
  backupImg();
  cb();
}

function _removeImgBak(cb) {
  removeImgBak();
  cb();
}

// export default gulp.series( _backupImg, _imgmin);
export {
  _minimg
};
