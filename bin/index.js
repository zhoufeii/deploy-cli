#!/usr/local/bin/node

// const program = require('commander');
// const chalk = require('chalk') //命令行颜色
// const ora = require('ora') // 加载流程动画
// const spinner_style = require('../src/spinner_style') //加载动画样式
// const shell = require('shelljs') // 执行shell命令
// const nodeSSH = require('node-ssh') // ssh连接服务器
// const inquirer = require('inquirer') //命令行交互
// const zipFile = require('compressing') // 压缩zip
// const fs = require('fs') // nodejs内置文件模块
// const path = require('path') // nodejs内置路径模块
// const SSH = new nodeSSH()

// const { log } = console;

// const commonLog = (text) => log(chalk.cyanBright(`${text}`))
// const successLog = (text) => log(chalk.greenBright(`Success: ${text}`))
// const errorLog = (text) => log(chalk.redBright(`Error: ${text}`))
// const tipsLog = (text) => log(chalk.yellowBright(`Tips: ${text}`))

// let CONFIG = {}; // 目标项目配置文件
// let BUILD_DIR = ''; // 用户指定的打包文件夹名称
// let BUILD_DIR_PATH = '';  // 打包文件夹的绝对路径
// let BUILD_ZIP_PATH = '';  // 打包文件夹压缩包的绝对路径
// let USER_CONFIG = {} // 获取用户选择的项目配置 development/production

// // 线上执行命令函数
// const runCommandFn = async (command) => {
//   const result = await SSH.exec(command, [], {
//     cwd: USER_CONFIG.PATH
//   })
//   // commonLog(result)
// }

// // 发布程序函数
// const runUploadTask = async () => {
//   tipsLog('欢迎使用 @zhoufei 自动部署工具')
//   //打包
//   await compileDist()
//   //压缩
//   await zipDist()
//   //连接服务器上传文件
//   await uploadZipBySSH()
//   successLog('部署成功!')
//   process.exit()
// }

// // 定义当前版本
// program
//   .version(require('../package.json').version)
//   .usage('[projectPath]')

// // 解析命令行参数
// program.parse(process.argv)

// const projectPath = process.argv[2] || '';
// if (!projectPath) {
//   errorLog('请输入项目的绝对路径 (在命令行中进入需要部署的项目的根目录并输入 pwd 查看)');
//   return;
// }

// try {
//   CONFIG = require(`${projectPath}/deploy.config.js`)
//   successLog('获取项目配置文件成功！')
// } catch (error) {
//   errorLog(error)
//   errorLog('请在项目根目录添加 deploy.config.js 配置文件, 参考说明文档中的配置')
//   process.exit() // 结束流程
// }

// // 项目打包
// const compileDist = async () => {
//   const loading = ora(commonLog(`项目开始打包`)).start()
//   loading.spinner = spinner_style[USER_CONFIG.LOADINGSTYLE || 'bouncingBar']
//   shell.cd(projectPath)
//   const res = await shell.exec('npm run build') //执行打包命令
//   loading.stop()
//   if (res.code === 0) {
//     successLog(`项目打包成功!`)
//   } else {
//     errorLog('项目打包失败, 请重试!')
//     process.exit() // 结束流程
//   }
// }

// // 压缩打包文件夹
// const zipDist = async () => {
//   commonLog('开始压缩打包文件夹')
//   try {
//     await zipFile.zip.compressDir(BUILD_DIR_PATH, BUILD_ZIP_PATH)
//     successLog('压缩成功!')
//   } catch (error) {
//     errorLog(error)
//     errorLog('压缩失败!')
//     process.exit() // 结束流程
//   }
// }

// // 连接服务器
// const connectSSH = async () => {
//   commonLog('正在连接服务器')
//   // const loading = ora(commonLog('正在连接服务器')).start()
//   // loading.spinner = spinner_style[USER_CONFIG.LOADINGSTYLE || 'bouncingBar']
//   const LOGIN_KEY = USER_CONFIG.PASSWORD ? 'password' : 'privateKey'
//   const LOGIN_VAL = USER_CONFIG.PASSWORD || USER_CONFIG.PRIVATE_KEY
//   const props = {
//     host: USER_CONFIG.HOST,
//     port: USER_CONFIG.PORT,
//     username: USER_CONFIG.USER_NAME,
//     [LOGIN_KEY]: LOGIN_VAL,
//   }
//   try {
//     await SSH.connect(props)
//     successLog('SSH连接成功!')
//   } catch (error) {
//     errorLog(error)
//     errorLog('SSH连接失败! (可能原因: 1:密码不对, 2:PRIVATE_KEY 本机私钥地址不对, 3:服务器未配置本机公钥')
//     process.exit() // 结束流程
//   }
//   // loading.stop()
// }

// // 上传压缩包到服务器
// const uploadZipBySSH = async () => {
//   await connectSSH()
//   commonLog('准备上传文件')
//   // const loading = ora(commonLog('准备上传文件')).start()
//   // loading.spinner = spinner_style[USER_CONFIG.LOADINGSTYLE || 'bouncingBar']

//   try {
//     await SSH.putFiles([{
//       local: BUILD_ZIP_PATH,
//       remote: USER_CONFIG.PATH + `/${BUILD_DIR}.zip`
//     }])
//     successLog('上传成功!')
//     // loading.text = ''
//     commonLog('准备解压文件')
//     await runCommandFn(`unzip ./${BUILD_DIR}.zip`) //解压
//     successLog('解压成功!')
//     // loading.stop();

//     await runCommandFn(`rm -rf ${USER_CONFIG.PATH}/${BUILD_DIR}.zip`) //解压完删除线上压缩包
//     successLog('删除线上压缩包成功!')

//     await runCommandFn(`rm -rf ${USER_CONFIG.PATH}/static`)  // 删除static静态文件目录
//     successLog('删除static成功!')

//     await runCommandFn(`mv -f ${USER_CONFIG.PATH}/${BUILD_DIR}/*  ${USER_CONFIG.PATH}`)
//     successLog('移出到目标文件成功!')

//     await runCommandFn(`rm -rf ${USER_CONFIG.PATH}/${BUILD_DIR}`) //移出后删除打包文件夹
//     successLog(`删除${BUILD_DIR}文件夹成功!`)
//     SSH.dispose() //断开连接
//   } catch (error) {
//     errorLog(error)
//     errorLog('上传失败!')
//     process.exit() // 结束流程
//   }
// }

// // 检查配置函数
// const checkConfig = (conf) => {
//   const checkArr = Object.entries(conf)
//   checkArr.map(it => {
//     const key = it[0]
//     if (key === 'PATH' && conf[key] === '/') { //上传zip前会清空目标目录内所有文件
//       errorLog('PATH 不能是服务器根目录!')
//       process.exit() // 结束流程
//     }
//     if (!conf[key]) {
//       errorLog(`配置项 ${key} 不能为空`)
//       process.exit() // 结束流程
//     }
//   })
// }

// // 执行交互后 启动发布程序
// inquirer
//   .prompt([{
//     type: 'list',
//     message: '请选择发布环境',
//     name: 'env',
//     choices: [{
//       name: '开发/测试环境',
//       value: 'development'
//     }, {
//       name: '生产环境',
//       value: 'production'
//     }]
//   }])
//   .then(answers => {
//     USER_CONFIG = CONFIG[answers.env]
//     BUILD_DIR = USER_CONFIG['BUILD_DIR'];
//     BUILD_DIR_PATH = path.resolve(__dirname, `${projectPath}/${BUILD_DIR}`)
//     BUILD_ZIP_PATH = path.resolve(__dirname, `${projectPath}/${BUILD_DIR}.zip`)
//     checkConfig(USER_CONFIG) // 检查
//     runUploadTask() // 发布
//   })

const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
// const packageJson = require('../package.json');
const deployPath = path.join(process.cwd(), './deploy');
const deployConfigPath = `${deployPath}/deploy.config.js`; //``;
const { checkNodeVersion, checkDeployConfig, tipsLog, errorLog } = require('../utils/index');

// const version = packageJson.version;
// const requiredNodeVersion = packageJson.engines.node;

const versionOptions = ['-V', '--version'];

// checkNodeVersion(requiredNodeVersion, 'fe-deploy');

const program = require('commander');

program
  // .version(version)
  .command('init')
  .description('初始化部署相关配置')
  .action(() => {
    require('../lib/init')();
  });

const agrs = process.argv.slice(2);

const firstArg = agrs[0];

// 非version选项且有配置文件时，进入部署流程
if (!versionOptions.includes(firstArg) && fs.existsSync(deployConfigPath)) {
  deploy();
}

// 无参数时默认输出help信息
if (!firstArg) {
  program.outputHelp();
}

// 部署流程
function deploy() {
  // 检测部署配置是否合理
  const deployConfigs = checkDeployConfig(deployConfigPath);
  if (!deployConfigs) {
    process.exit(1);
  }

  console.log(tipsLog('\n ===== 欢迎使用 @zhoufei 自动部署工具 ===== \n'))

  // 注册部署命令
  deployConfigs.forEach(config => {
    const { command, projectName, name } = config;
    program
      .command(`${command}`)
      .description(`${tipsLog(projectName)}项目${tipsLog(name)}部署`)
      .action(() => {
        inquirer.prompt([
          {
            type: 'confirm',
            message: `确认将 ${tipsLog(projectName)} 项目部署到 ${tipsLog(name)} 吗？`,
            name: 'sure'
          }
        ]).then(answers => {
          const { sure } = answers;
          if (!sure) {
            process.exit(1);
          }
          if (sure) {
            if (name.includes('线上') || name.includes('生产') || name.includes('production') || name.includes('online') || name.includes('prod')) {
              inquirer.prompt([
                {
                  type: 'confirm',
                  message: `即将部署到${errorLog(projectName)}，请注意代码是否已经过测试！`,
                  name: 'sure'
                }
              ]).then(answers => {
                const { sure } = answers;
                if (!sure) {
                  process.exit(1);
                }
                if (sure) {
                  const deploy = require('../lib/deploy');
                  deploy(config);
                }
              })
            }
            const deploy = require('../lib/deploy');
            deploy(config);
          }
        });

      });
  });
}

// 解析参数
program.parse(process.argv);
