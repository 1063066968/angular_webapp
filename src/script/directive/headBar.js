angular.module("app").directive("appHeadBar",[function(){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"view/template/headBar.html",
		scope:{
			text:'@'
		},
		link:function($scope){
			$scope.back = function(){
				window.history.back();
			}
//			//下面几行，讲解$on $emit $broadcast的用法
//			//有时候写一个函数广播了，也定义了接收的函数，可是为什么没有生效呢，
//			//可能就是接收方还没有初始化完成，这就是一个坑,$on是接收的函数
//			$scope.$on('abc',function(event,data){
//				console.log(event,data);
//			})
//			//$emit向上广播，在子页面headBar向主页面company广播
//			$scope.$emit('cba',{name:2});
		}
	}
}])