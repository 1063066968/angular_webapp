//第二种引入全局变量的方式，那么这里也要引入dict
angular.module("app").controller("searchCtrl",["$scope","$http","dict",function($scope,$http,dict){
	$scope.name = '';
	$scope.search = function(){
		$http({
			url:"data/positionList.json?name="+$scope.name,
			method:"get"
		}).then(function successCallback(response){
			$scope.positionList = response.data;
		})
	}
	$scope.search();//调用search函数初始化页面
	$scope.sheet = {};
	$scope.tabList = [{
		id:"city",
		name:"城市"
	},{
		id:"salary",
		name:"薪水"
	},{
		id:"scale",
		name:"公司规模"
	}]
	var tabId = '';
	$scope.filterObj = {};
	$scope.tClick = function(id,name){
		tabId = id;
		//console.log(id,name);
		//console.log(dict);
		//console.log($scope.sheet);
		//当点击城市时，展示的就是城市的列表
		$scope.sheet.list = dict[id];
		$scope.sheet.visible = true;
	}
	$scope.sClick = function(id,name){
		//console.log(id,name);
		if(id){
			angular.forEach($scope.tabList,function(item){
				if(item.id === tabId){
					item.name = name;
				}
			})
			//这里tabId + 'Id'是因为控制台返回的结果是cityId
			$scope.filterObj[tabId + 'Id'] = id;
		}else{
			delete $scope.filterObj[tabId + 'Id'];
			angular.forEach($scope.tabList,function(item){
				if(item.id === tabId){
					switch(item.id){
						case 'city':
							item.name="城市";
							break;
						case 'salary':
							item.name="薪水";
							break;
						case 'scale':
							item.name="公司规模";
							break;
						default:
					}
				}
			})
		}
	}
}])

//dict.js第二种定义全局变量的方式，那么这边引入的也是$rootScope
//angular.module("app").controller("searchCtrl",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
//	$scope.name = '';
//	$scope.search = function(){
//		$http({
//			url:"data/positionList.json?name="+$scope.name,
//			method:"get"
//		}).then(function successCallback(response){
//			$scope.positionList = response.data;
//		})
//	}
//	$scope.search();//调用search函数初始化页面
//	$scope.sheet = {};
//	$scope.tabList = [{
//		id:"city",
//		name:"城市"
//	},{
//		id:"salary",
//		name:"薪水"
//	},{
//		id:"scale",
//		name:"公司规模"
//	}]
//	$scope.tClick = function(id,name){
//		console.log(id,name);
//		console.log($rootScope.dict);
//		console.log($scope.sheet);
//		//当点击城市时，展示的就是城市的列表
//		$scope.sheet.list = $rootScope.dict[id];
//		$scope.sheet.visible = true;
//	}
//}])

