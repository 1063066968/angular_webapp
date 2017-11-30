//创建的服务，在控制台Application中Cookies查看，由positionCtrl.js调用写入和删除的方法
//创建一个服务service方法
angular.module("app").service("cache",["$cookies",function($cookies){
	this.put = function(key,value){
		$cookies.put(key,value);
	}
	this.get = function(key){
		return $cookies.get(key);
	}
	this.remove = function(key){
		$cookies.remove(key);
	}
}])

////另一种方法：工厂的服务模式
//angular.module("app").factory("cache",["$cookies",function($cookies){
//	//factory相对于service的优势在于，它可以在return之前声明var obj = {};这样一个私有的对象，而service不行
//	//并且factory要返回一个对象，而service直接是这个函数就行了
//	return {
//		put:function(key,value){
//			$cookies.put(key,value);
//		},
//		get:function(key){
//			return $cookies.get(key);
//		},
//		remove:function(key){
//			$cookies.remove(key);
//		}
//	}
//}])