//模块下面去定义自定义指令，自定义指令载入模板，在任意的controller下面去应用
/*[function(){}]声明显式的形式，由于这边没有要声明的依赖变量，所以没写，否则如下：
  ["$scope",function($scope){}]
*/
/*restrict限制它是什么样的指令
   A:属性指令<div app-head></div>
   E:标签指令<app-head></app-head>
   C:类指令即样式<div class='app-head'></div>
   M:注释指令<!-- directive:app-head -->
*/
//在html中是不用识别大小写，如app-head，在js中把-的后一个字母写成大写即可
/*通过指令名app-head写成appHead，即directive("appHead",[function(){}])
用来连接main.html中的<div app-head></div>
再通过templateUrl:"view/template/head.html"用来连接js对应的html
*/
angular.module("app").directive("appHead",[function(){
	return {
		//由于main.html中<div app-head></div>是属性指令，所以选A
		//replace:true表示把外层的div元素替换掉，换成此js对应的html中的内容
		restrict:"A",
		replace:true,
		templateUrl:"view/template/head.html"
	}
}])