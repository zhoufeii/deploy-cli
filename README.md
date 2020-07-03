# zf-deploy-cli
前端轻量化部署脚手架，支持测试、线上等多环境部署，支持环境配置扩展，配置好后仅需一条命令即可完成整个部署流程。

## git地址：
https://github.com/Oligocalse/deploy-cli

## npm地址：
https://www.npmjs.com/package/deploy-cli

## 适用对象
目前还在采用手工部署又期望快速实现轻量化部署的小团队或者个人项目。

## 使用指南
https://github.com/Oligocalse/deploy-cli/master/README.md

## 前提条件
能通过ssh连上服务器即可

## 安装
全局安装zf-deploy-cli
```
npm i zf-deploy-cli -g
```
<!-- 查看版本，表示安装成功。

![安装zf-deploy-cli](./imgs/安装deploy.png) -->

## 使用
### 1.初始化部署模板
```
deploy init
```

<!-- ![初始化](./imgs/初始化.png) -->

### 2.配置部署环境
部署配置文件位于deploy文件夹下的`deploy.config.js`,
一般包含`dev`（开发环境）和`prod`（线上环境）两个配置，再有多余的环境配置形式与之类似，只有一个环境的可以删除另一个多余的配置（比如只有`prod`线上环境，请删除`dev`开发环境配置）。

具体配置信息请参考配置文件注释：
```
module.exports = {
  privateKey: '', // 本地私钥地址，位置一般是 /Users/xxx/.ssh/id_rsa 或 C:/Users/xxx/.ssh/id_rsa
  passphrase: '', // 本地私钥密码，非必填，有私钥则配置
  projectName: 'my-project', // 项目名称
  dev: { // 开发环境
    name: '开发环境',
    script: "npm run build", // 开发环境打包脚本
    host: '', // 开发服务器地址
    port: 22, // ssh port，一般默认22
    username: 'root', // 登录服务器用户名
    password: '', // 登录服务器密码，使用ssh登录可不填
    distPath: 'dist',  // 本地打包后生成的打包文件夹
    webDir: '',  // 开发环境服务器项目存放地址
  },
  prod: {  // 线上环境
    name: '线上环境',
    script: "npm run build", // 线上环境打包脚本
    host: '', // 开发服务器地址
    port: 22, // ssh port，一般默认22
    username: 'root', // 登录服务器用户名
    password: '123456', // 登录服务器密码，使用ssh登录可不填
    distPath: 'dist',  // 本地打包后生成的打包文件夹
    webDir: '' // 线上环境项目存放目录
  }
  // 其它的环境按照这个格式写即可
}
```

### 3.查看部署命令
配置好`deploy.config.js`，运行
```
deploy --help
```
<!-- 查看部署命令

![部署命令](./imgs/部署命令.png) -->

### 4.开发环境部署
开发环境部署采用的时`dev`的配置
```
deploy dev
```
先有一个确认，确认后进入部署流程，完成6步操作后，部署成功！！！

<!-- ![测试环境部署](./imgs/测试环境部署.png) -->

### 5.线上环境部署
线上环境部署采用的时`prod`的配置
```
deploy prod
```
部署流程和开发环境相同

<!-- ![线上环境部署](./imgs/线上环境部署.png) -->
