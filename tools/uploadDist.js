const Client = require('ssh2-sftp-client');
const path = require('path')

const serverConfig = {
  host : '10.129.77.24',
  port: 22,
  username: 'hxct123',
  password: 'SLASD4567$'
}

function put(localPath,romotePath){
    let sftp = new Client();
    sftp.connect(serverConfig).then(() => {
        return sftp.put(localPath,romotePath);
    }).then(() =>{
        console.log(localPath + "上传完成");
        sftp.end()
    }).catch((err) => {
        console.log(err, 'catch error');
    });
}
// 把上面的配置换成自己的
put(path.resolve( './dist/index.html' ), '/home/hxct123/platform/dist')
