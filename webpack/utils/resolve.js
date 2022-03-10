const path = require('path');
const variable = require('./variable');
const { SRC_PATH, ROOT_PATH } = variable;

module.exports = {
  //适用于指定在导入语句没有带文件后缀时，可以按照配置的列表，自动补上后缀，将使用频率高的放在前面、同时后缀列表也要尽可能的少，减少没有必要的匹配。同时，我们在源码中写带入语句的时候，尽量带上后缀，避免查找过程。
  extensions: ['.tsx', '.ts', '.js', '.json'],
  // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
  // __dirname 表示当前工作目录，也就是项目根目录
  modules: [path.resolve(ROOT_PATH, 'node_modules')],
  // 查找 package.json main
  // mainFields 字段用于配置第三方模块使用哪个入口文件，为了减少搜索的步骤，在明确第三方模块的入口文件描述字段时，可以直接设置为具体值。
  // 由于大部分第三方模块都会 main 字段去描述入口文件，所以，可以直接使用 ['main'] 作为入口文件的描述字段，以减少搜索步骤（但是需要一一排查每一个安装的三方依赖，避免导致其无法正常使用）。
  mainFields: ['main'],
  // noParse 配置的意思是让 webpack 忽略没有模块化的文件，比如 JQuery。这样就不需要对文件递归解析处理，提高构建速度。需要注意的是，被忽略掉的文件中如果包含 import、require、define 等模块化语句时，在构建产物中会包含浏览器无法解析的模块化语句。
  // DllPlugin
  alias: {
    '@': SRC_PATH,
    '@images': path.resolve(SRC_PATH, 'assets/images'),
  },
};
