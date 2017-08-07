import yargs from 'yargs'; //处理命令行参数
//option代表命令行选项部分
const args = yargs
    .option('production', {
        boolean: true,//参数为布尔类型
        default: false,//默认false，开发环境
        describe: 'min all scripts'//描述
    })//区分开发环境和线上环境

    .option('watch', {
        boolean: true,
        default: false,
        describe: 'watch all scripts'
    })//是否监听修改的文件

    .option('verbose', {
        boolean: true,
        default: false,
        describe: 'log'
    })//是否需要详细输出命令行执行日志

    .option('sourcemaps', {
        boolean: true,
        describe: 'force the creation of sourcemaps'
    })//源映射>>>>供将压缩文件恢复到源文件原始位置的映射代码的方式。这意味着你可以在优化压缩代码后轻松的进行调试。

    .option('port', {
        string: true,
        default: 3001,
        describe: 'server port'
    })//监听的端口号
    .argv;//表示对输入的命令行的内容以字符串的形式进行解析
export default args;