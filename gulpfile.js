/*
gulp常见api: 
src读取文件或文件夹
dest生成文件也就是写文件
watch监控文件
task定制任务
pipe用流的方式来处理文件
*/

var gulp = require("gulp");
//模块化管理插件,可以加载package.json文件中所有的gulp模块
var $ = require("gulp-load-plugins")();
var open = require("open");

//定义目录路径
var app = {
	//源代码，文件目录
	srcPath:"src/",
	//文件整合之后的目录
	devPath:"build/",
	//项目，发布线上生产部署
	prdPath:"dist/"
};

//通过bower安装的插件，需要拷贝到devPath prdPath中
gulp.task("lib",function(){
	//gulp.src()输出符合所提供的匹配模式或匹配模式的数组的文件
	//  /**/*代表读取bower_components下面所有文件
	//如果只对其中的js文件进行读取，就可以写成/**/*.js
	//gulp.dest()能被pipe进来，并将会写文件,重新输出所有数据

	//读取bower_components下所有js文件，先拷贝到整合目录并重命名，
	//再拷贝到生产目录并重命名vendor
	gulp.src("bower_components/**/*.js")
	.pipe(gulp.dest(app.devPath + "vendor"))
	.pipe(gulp.dest(app.prdPath + "vendor"))
	.pipe($.connect.reload());//构建好,文件更改后自动刷新 并执行启动服务重新打开浏览器
})

//将源码src中的所有html文件拷贝到devPath prdPath中
gulp.task("html",function(){
	gulp.src(app.srcPath + "**/*.html")
	.pipe(gulp.dest(app.devPath))
	.pipe(gulp.dest(app.prdPath))
	.pipe($.connect.reload());
})

//将模拟的json 文件 拷贝到 devPath prdPath中
gulp.task("json",function(){
	gulp.src(app.srcPath + "data/**/*.json")
	.pipe(gulp.dest(app.devPath + "data"))
	.pipe(gulp.dest(app.prdPath + "data"))
	.pipe($.connect.reload());
})

//将index.less文件拷贝到 devPath prdPath中，index.less引入了所有的其他的less
gulp.task("less",function(){
	/*遍历src文件夹下style文件夹中的index.less文件，将它进行less预编译之后，
	送到build文件夹下，新建的css文件夹的index.css下，同步对index.css进行压缩，
	送到dist上线文件夹下，新建的css文件夹的index.css中
	*/
	//gulp-pulmber作用是当我们的js或者css发生错误时,不会立即中断我们的线程
	gulp.src(app.srcPath + "style/index.less")
	.pipe($.plumber())
	.pipe($.less())
	.pipe(gulp.dest(app.devPath + "css"))
	.pipe($.cssmin())
	.pipe(gulp.dest(app.prdPath + "css"))
	.pipe($.connect.reload());
})

//拷贝js文件将所有的源文件中的js文件整合成index.js然后拷贝过去
gulp.task("js",function(){
	/*遍历src文件夹下script文件夹中的所有.js文件，把它们concat合并成index.js文件,
	送到build文件夹下，新建的js文件夹的index.js下，同步对index.js进行uglify压缩，
	送到dist上线文件夹下，新建的js文件夹的index.js中
	*/
	gulp.src(app.srcPath + "script/**/*.js")
	.pipe($.plumber())
	.pipe($.concat("index.js"))
	.pipe(gulp.dest(app.devPath + "js"))
	.pipe($.uglify())
	.pipe(gulp.dest(app.prdPath + "js"))
	.pipe($.connect.reload());
})

//拷贝 压缩 图片，最后放到发布目录下
gulp.task("image",function(){
	/*遍历src文件夹下image文件夹中的所有文件，
	送到build文件夹下，新建的image文件夹下，同步所有图片进行imagemin压缩，
	送到dist上线文件夹下，新建的image文件夹中
	*/
	gulp.src(app.srcPath + "image/**/*")
	.pipe(gulp.dest(app.devPath + "image"))
	.pipe($.imagemin())
	.pipe(gulp.dest(app.prdPath + "image"))
	.pipe($.connect.reload());
})

//如果要打包文件时，只需要执行build任务就可以执行所有任务，即生成build和dest文件夹下所有文件
gulp.task("build",["lib","html","json","less","js","image"])

//编写服务，启动服务器，要写build不然不会编译
gulp.task("server",["build"],function(){
	//连接服务器：根目录指定路径；浏览器默认刷新；端口号1234
	$.connect.server({
		root:[app.devPath],
		livereload:true,
		port:1234
	});
	// 在 命令工具中执行 gulp server  就相当于是启动了服务

	open("http://localhost:1234");//自动打开浏览器这个网址

	//构建文件，我们希望更改了文件，就自动编译，并且打包等然后打开浏览器
	gulp.watch("bower_components/**/*",["lib"]);
	gulp.watch(app.srcPath + "**/*.html",["html"]);
	gulp.watch(app.srcPath + "data/**/*.json",["json"]);
	gulp.watch(app.srcPath + "style/**/*.less",["less"]);
	//watch启动监听器，只要改变src文件夹中script文件夹下的js，都会执行js这个任务
	gulp.watch(app.srcPath + "script/**/*.js",["js"]);
	gulp.watch(app.srcPath + "image/**/*",["image"]);
})

//默认执行的任务，直接执行 gulp变行了，都编写完成后在终端上执行gulp就可以了。
gulp.task("default",["server"]);

//清除旧文件，每次更新的时候，即把build和dest文件夹删除
gulp.task("clean",function(){
	//删除build和dist文件夹
	gulp.src([app.devPath,app.prdPath])
	.pipe($.clean())
})

//注：build生成所有文件 clean删除所有文件