少一个node_modules文件夹，需要自己通过gulp init来初始化安装

首先安装node和npm
npm i -g cnpm 安装cnpm
cnpm i -g bower安装bower依赖管理工具
切换到目录，然后通过bower init初始化，生成bower.json
bower install --save angular通过bower安装angular，一定要--save，不然不会安装到本地
npm install -g cnpm --registry=https://registry.npm.taobao.org安装gulp
cnpm i -g gulp全局安装gulp
cnpm i --save-dev gulp本地安装gulp
cnpm i --save-dev gulp-clean gulp-concat……安装这些插件
另外中途增加安装bower install --save angular-validation不是angular自带的插件
最后gulp即可

