// 静态文件使用强缓存的时候，使用sha256生成消息摘要hash
import * as fs from 'fs';
import * as path from 'path';
import { createHash as createHash$2 } from 'node:crypto';
import { omit } from 'lodash-es';

interface StaticCacheInfo {
  fileName: string;
  filePath: string;
  hash: any;
  cont: Buffer;
  reg: RegExp | undefined;
}

interface Options {
  dirname: string | string[];
  root: string;
}

async function generateStaticCacheInfoList(options: Options) {
  const infoList = [];
  const { dirname, root } = options;
  async function loop(dirname) {
    const listOfFiles = await fs.promises.readdir(dirname);
    for (const fileName of listOfFiles) {
      const filePath = path.join(dirname, fileName);
      const file = await fs.promises.stat(filePath);
      if (file.isDirectory()) {
        await loop(fileName);
      } else {
        const info: StaticCacheInfo = await genStaticCacheInfo(
          filePath,
          fileName,
          options
        );
        infoList.push(info as never);
      }
    }
  }
  const dirList: string[] = typeof dirname === 'string' ? [dirname] : dirname;
  for await (const dir of dirList) {
    loop(path.join(root, dir)).catch((err) => {
      console.error(err);
    });
  }
  return infoList;
}
async function genStaticCacheInfo(
  filePath,
  fileName,
  options
): Promise<StaticCacheInfo> {
  const cont = await fs.promises.readFile(filePath);
  const hash = createHash$2('sha256').update(cont).digest('hex');
  const info: StaticCacheInfo = {
    fileName,
    filePath,
    hash,
    cont,
    reg: new RegExp(
      `${filePath.substring(options.root.length).replace(/\\+/g, '/')}`,
      'g'
    ),
  };
  return info;
}

function renameStaticFile(filePath: string, hash: string) {
  return filePath.replace(
    /([^.\/\\]+)(\.[^.]+)$/,
    `$1-${hash.substring(0, 8)}$2`
  );
}

export async function staticCache(options: Options) {
  const staticCacheInfoList: StaticCacheInfo[] =
    await generateStaticCacheInfoList(options);
  // console.log(staticCacheInfoList)
  return {
    name: 'vite-plugin-static-cache',
    enforce: 'pre',
    transform(src, id) {
      let cont = src;
      if (staticCacheInfoList.length >= 0) {
        for (const info of staticCacheInfoList) {
          // console.log(info.reg)
          cont = cont.replace(info.reg, (match) => {
            // console.log(`${match}?${info.hash.substring(0, 8)}`);
            return `${match}?h=${info.hash.substring(0, 8)}`;
          });
        }
      }
      return {
        code: cont,
        map: null,
      };
    },
    closeBundle: {
      sequential: true,
      async handler() {
        // 静态资源信息列表，上传到服务器，下次部署时进行比对
        await fs.promises.writeFile(
          `dist/staticCacheLast.json`,
          JSON.stringify(
            staticCacheInfoList.map((s) => omit(s, ['reg', 'cont']))
          )
        );
      },
    },
  };
}

export const staticCacheDir: string | string[] = 'fonts';

export default function configStaticCachePlugin() {
  return staticCache({
    dirname: staticCacheDir,
    root: 'public',
  });
}
