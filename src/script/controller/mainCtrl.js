//在router.js中配置一个路由，路由声明了一个controller，所以这里需要调用，否则会报错
//引入模块之后，跟一个controller函数，函数第一个参数是它的名字，然后跟$scope服务

//angular.module("app").controller('mainCtrl', ['$scope', function($scope){
//	$scope.list = [{
//		id:"1",
//		name:"销售",
//		imageUrl:"image/company-3.png",
//		companyName:"千度",
//		cityName:"上海",
//		industry:"互联网",
//		date:"2016-06-01 11:05"
//	},{
//		id:"2",
//		name:"WEB前端",
//		imageUrl:"image/company-1.png",
//		companyName:"慕课网",
//		cityName:"北京",
//		industry:"互联网",
//		date:"2016-06-01 01:05"
//	}]
//}])
//上面这种是死数据写法，如果要请求后台数据，用$http方式请求

angular.module("app").controller('mainCtrl', ['$scope','$http', function($scope,$http){
	//1.5.8的写法
//	$http({
//		url:"/data/positionList.json",
//		method:"get"
//	}).success(function(resp){
//		console.log(resp);
//	})
	//通过查官方api，发现使用的1.6.6版本的$http写法更改了
	$http({
		url:"/data/positionList.json",
		method:"get"
	}).then(function successCallback(response){
		//console.log(response);
		//这边其实是不用打印的，在控制台的Network中点击文件XHR选择json文件，点击Preview就可以查看
		//console.log(response.data);
		$scope.list = response.data;
	})
}])