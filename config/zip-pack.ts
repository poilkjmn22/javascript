import { staticCacheDir } from './static-cache';
import zipPack from 'vite-plugin-zip-pack';

export default function configZipPackPlugin() {
  return zipPack({
    inDir: 'dist',
    outDir: './',
    outFileName: 'dist.zip',
    filter(fileName, filePath, isDirectory) {
      const dirs =
        typeof staticCacheDir === 'string' ? [staticCacheDir] : staticCacheDir;
      const regCache = new RegExp(`dist[/\\\\](${dirs.join('|')})`);
      if (regCache.test(filePath)) {
        return false;
      }
      return true;
    },
  });
}
