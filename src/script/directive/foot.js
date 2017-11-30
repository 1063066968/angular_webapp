angular.module("app").directive("appFoot",[function(){
	return {
		//由于main.html中<div app-foot></div>是属性指令，所以选A
		//replace:true表示把外层的div元素替换掉，换成此js对应的html中的内容
		restrict:"A",
		replace:true,
		templateUrl:"view/template/foot.html"
	}
}])