import gulp from "gulp";
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from "gulp-imagemin";
import { resolve } from "path";
import { program } from "commander";
program
  .option("-s, --source <source>", "源文件", "")
  .option("-l, --level <level>", "压缩等级", "")
  .parse();
const options = program.opts();

export default () =>
  gulp
    .src([
      "../src/assets/**/*.jpg",
      "../src/assets/**/*.png",
      "../src/assets/**/*.svg",
      "../src/assets/**/*.gif",
    ])
    .pipe(
      imagemin(
        [
          gifsicle({ interlaced: true }),
          mozjpeg({ quality: 75, progressive: true }),
          optipng({ optimizationLevel: 5 }),
          svgo({
            plugins: [
              {
                name: "removeViewBox",
                active: true,
              },
              {
                name: "cleanupIDs",
                active: false,
              },
            ],
          }),
        ],
        { verbose: true }
      )
    )
    .pipe(gulp.dest((dir) => resolve(dir.dirname, "../")));

const minimg = () =>
  gulp
    .src(resolve(options.source))
    .pipe(
      imagemin(
        [
          gifsicle({ interlaced: true }),
          mozjpeg({ quality: 75, progressive: true }),
          optipng({
            optimizationLevel: options.level ? parseInt(options.level) : 5,
          }),
          svgo({
            plugins: [
              {
                name: "removeViewBox",
                active: true,
              },
              {
                name: "cleanupIDs",
                active: false,
              },
            ],
          }),
        ],
        { verbose: true }
      )
    )
    .pipe(gulp.dest((dir) => resolve(dir.dirname, "../")));
export { minimg };
