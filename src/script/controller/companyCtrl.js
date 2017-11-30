angular.module("app").controller("companyCtrl",["$scope","$http","$state",function($scope,$http,$state){
	$http({
		url:"/data/company.json?id="+$state.params.id,
		method:"get"
	}).then(function successCallback(response){
		$scope.company = response.data;
		
//		//下面几行，讲解$on $emit $broadcast的用法
//		//向子页面广播
//		$scope.$broadcast('abc',{id:1});
//		
//		//接收子页面向上广播的值，放里面没有生效，同样是因为还没有初始化完成，所以要放外面
//		//$scope.$on("cba",function(event,data){
//		//	console.log(event,data);
//		//})
	})
//	//下面这个放在外面，接收不到广播的事件，需要放在$http请求的里面，起到一个延时的作用
//	//$boradcast向下进行广播，在company主页面广播给headBar页面
//	//$scope.$broadcast('abc',{id:1});
//	
//	//接收子页面向上广播的值 
//	$scope.$on("cba",function(event,data){
//		console.log(event,data);
//	})
}])