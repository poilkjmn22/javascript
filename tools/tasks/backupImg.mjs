import gulp from "gulp";
import rename from "gulp-rename";

import gulpRemove from "gulp-remove";
import { resolve } from "path";

const DIST = "bak";

const { manifest, remove } = gulpRemove("js", DIST);

const removeImgBak = () =>
  gulp
    .src("../src/assets/images/*.bak")
    .pipe(manifest())
    .pipe(gulp.dest(DIST))
    .on("end", function () {
      // 所有文件都编译完了
      remove();
    });

const backupImg = () =>
  gulp
    .src([
      "../src/assets/**/*.jpg",
      "../src/assets/**/*.png",
      "../src/assets/**/*.svg",
      "../src/assets/**/*.gif",
    ])
    .pipe(
      rename((path) => ({
        ...path,
        extname: path.extname + ".bak",
      }))
    )
    .pipe(
      gulp.dest((dir) => {
        return resolve( dir.dirname, '../')
      })
    );

export { removeImgBak, backupImg };
