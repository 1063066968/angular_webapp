angular.module("app").controller("positionCtrl",["$q","$scope","$http","$state","cache",function($q,$scope,$http,$state,cache){
	//调用cache.js写的缓存
//	cache.put("to","you");
//	cache.remove("to");
	$scope.isLogin = false;
	function getPosition(){
		var def = $q.defer();
		//用$state获取路由参数，url后面的id变量即router.js中后面带的id
		$http({
			url:"/data/position.json?id="+$state.params.id,
			method:"get"
		}).then(function successCallback(response){
			//console.log(response);
			$scope.position = response.data;
			def.resolve(response.data);
		},function errorCallback(err){
			def.reject(err);
		})
		return def.promise;
	}
	function getCompany(id){
		$http({
			url:"/data/company.json?id="+id,
			method:"get"
		}).then(function successCallback(response){
			$scope.company = response.data;
		})
	}
	//getPosition().then(function(){},function(){})前一个function对应成功的情况，后一个对应失败的情况，没有意外失败的就可以不写
	getPosition().then(function(obj){
		console.log(obj);
		getCompany(obj.companyId);
	})
}])
//这里面有一个先后顺序，先获取到职位信息，然后才能知道职位对应的是哪个公司，也就是先要获取companyId，然后根据这个id才能知道是哪家公司
//这也就是链式调用，通过$q来实现promise思想解决延迟加载对象的服务

