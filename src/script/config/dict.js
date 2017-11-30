//这种用value定义全局变量的方法在1.6.3以上就不能使用了
//定义dict全局变量，同时进行初始化
//.value()创建一个全局变量dict，给它一个空{}
//.run 设置全局变量的方式,全局配置的方法，用value初始化了全局变量dict，那么在run中就要引入，否则报错
angular.module("app").value('dict',{}).run(["$http","dict",function($http,dict){
	$http({
		url:"data/city.json",
		method:'get'
	}).then(function successCallback(response){		
		dict.city = response.data;
	});
	
	$http({
		url:"data/salary.json",
		method:"get"
	}).then(function successCallback(response){
		dict.salary = response.data;
	});
	
	$http({
		url:"data/scale.json",
		method:"get"
	}).then(function successCallback(response){
		dict.scale = response.data;
	});
}])

//第二种方法用$rootScope定义全局变量
//angular.module("app").run(["$http","$rootScope",function($http,$rootScope){
//	$rootScope.dict = {};
//	$http({
//		url:"data/city.json",
//		method:'get'
//	}).then(function successCallback(response){		
//		$rootScope.dict.city = response.data;
//	});
//	
//	$http({
//		url:"data/salary.json",
//		method:"get"
//	}).then(function successCallback(response){
//		$rootScope.dict.salary = response.data;
//	});
//	
//	$http({
//		url:"data/scale.json",
//		method:"get"
//	}).then(function successCallback(response){
//		$rootScope.dict.scale = response.data;
//	});
//}])

