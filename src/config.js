// 配置参考文件  实际配置文件需要用户在自己项目根目录 添加 deploy.config.js
module.exports = Object.freeze({
  development: {  // 开发&测试环境
    HOST: 'xxx.xxx.xx.xxx', // ssh地址 服务器地址
    USER_NAME: 'root', // ssh 用户名
    PORT: 8888,
    //登录方式 (二选一, 不用的方式注释掉)
    //方式一 用秘钥登录服务器(推荐),
    PRIVATE_KEY: 'C:/Users/Administrator/.ssh/id_rsa' || '/Users/Administrator/.ssh/id_rsa',
    //方式二 用密码连接服务器
    // PASSWORD: '',
    PATH: '/dev/frontend', // 需要上传的服务器目录地址 如 /usr/local/nginx/html/prodName
    LOADINGSTYLE: 'bouncingBar', //(可选) 默认为 bouncingBar. 加载动画有 dots 至 dots12, line, pipe, star, arrow 至 arrow4 等
    BUILD_DIRNAME: 'dist',  // 打包完成后的文件夹名称
  },
  production: { // 生产环境
    HOST: 'xxx.xxx.xx.xxx',
    USER_NAME: 'root',
    PORT: 8888,
    PRIVATE_KEY: 'C:/Users/Administrator/.ssh/id_rsa' || '/Users/Administrator/.ssh/id_rsa',
    PATH: '/production/frontend',
    LOADINGSTYLE: 'pipe',
    BUILD_DIRNAME: 'dist',
  }
})
