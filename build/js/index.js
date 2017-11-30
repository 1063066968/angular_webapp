//引入ui.router模块，多个模块以,相隔
angular.module("app",["ui.router","ngCookies"]);

//config文件夹下的router.js放置全局配置文件
//controller文件夹下放置各个路由对应的配置文件
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


//对app.js中的ui.router模块进行配置
//通过angular.module("app")进行引入，再通过config方法进行配置路由模块
//放全局的配置文件
angular.module("app").config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
	/*$stateProvider声明页面的路由，用它来配置路由
	 * state中的main就是主页面的id，唯一标识id
	 * */
	$stateProvider.state("main",{
		// 有三个参数
		// 1.url后面就是页面的hash值 可以传参url:"/main/:id"
		// 2.指定页面放在view下面
		// 3.页面的逻辑放在controller中，命名:页面名+Ctrl，这里声明了controller，后面就需要调用，否则报错
		
		/*url后面可以接以下写法进行页面传参数
		(1)'/home':只匹配对应的路由'/home'    
		(2)'/user/:id'、'/user/{id}' 代表/之后传入的参数，比如'/user/1234'表示1234作为参数传入页面
		或是'/messages?before&after':表示?之后传参，多个参数用&连接
		
		那么页面又如何来接收参数呢？
		1.用指令的方式 ui-sref
		<a ui-sref="main"></a> 如果跳转main页面就这么写
		<a ui-sref="main({id:1234})"></a> 如果跳转main页面带参数就这么写，传入一个函数，以对象的形式书写
		2.用js脚本的方式
		$state.go("main",{id:1234},{location:"replace"});第三个参数表示消除当前路径，即跳转后返回，就不会再返回到当前页面
		这种方式传入页面，怎么来获取参数呢？两种方式
		$state.params.id 表示$state服务下的params下就会有所有的属性
		$stateParams.id  表示$stateParams下面会有所有的属性
		*/
		
		url:"/main",
		templateUrl:'view/main.html',
		controller:"mainCtrl"	
	}).state("position",{
		url:"/position/:id",
		templateUrl:"view/position.html",
		controller:"positionCtrl"
	}).state("company",{
		url:"/company/:id",
		templateUrl:"view/company.html",
		controller:"companyCtrl"
	}).state("search",{
		url:"/search",
		templateUrl:"view/search.html",
		controller:"searchCtrl"
	}).state("login",{
		url:"/login",
		templateUrl:"view/login.html",
		controller:"loginCtrl"
	}).state("register",{
		url:"/register",
		templateUrl:"view/register.html",
		controller:"registerCtrl"
	}).state("me",{
		url:"/me",
		templateUrl:"view/me.html",
		controller:"meCtrl"
	}).state("favorite",{
		url:"/favorite",
		templateUrl:"view/favorite.html",
		controller:"favoriteCtrl"
	}).state("post",{
		url:"/post",
		templateUrl:"view/post.html",
		controller:"postCtrl"
	});
	// $urlRouterProvider作用:页面的默认跳转
	$urlRouterProvider.otherwise("main");
}])
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


angular.module("app").directive("appCompany",[function(){
	return {
		restrict:"A",
		replace:true,
		scope:{
			com:"="
		},
		templateUrl:"view/template/company.html"
	}
}])
angular.module("app").directive("appFoot",[function(){
	return {
		//由于main.html中<div app-foot></div>是属性指令，所以选A
		//replace:true表示把外层的div元素替换掉，换成此js对应的html中的内容
		restrict:"A",
		replace:true,
		templateUrl:"view/template/foot.html"
	}
}])
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
angular.module("app").directive("appPositionClass",[function(){
	return {
		restrict:"A",
		replace:true,
		scope:{
			com:"="
		},
		templateUrl:"view/template/positionClass.html",
		link:function($scope){
			$scope.showPositionList = function(idx){
				$scope.positionList = $scope.com.positionClass[idx].positionList;
				$scope.isActive = idx;
			}
			//监听scope对象的属性com，当属性变化时，传入函数
			$scope.$watch("com",function(newVal){
				if(newVal){
					$scope.showPositionList(0);
				}
			})		
		}
	}
}])
angular.module("app").directive("appPositionInfo",[function(){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"view/template/positionInfo.html",
		scope:{
			isActive:"=",
			isLogin:"=",
			pos:"="
		},
		link:function($scope){
			$scope.imagePath = $scope.isActive ? "image/star-active.png" : "image/star.png";
		}
	}
}])
//当使用replace为true时，保证模板的根元素只有一个元素
angular.module("app").directive("appPositionList",[function(){
	return {
		//由于main.html中<div app-head></div>是属性指令，所以选A
		//replace:true表示把外层的div元素替换掉，即把父元素替换，换成此js对应的html中的内容，且模板中只能有一个根元素
		restrict:"A",
		replace:true,
		templateUrl:"view/template/positionList.html",
		//有了这个就可以让主页面的控制器即mainCtrl共享$scope的数据，相当于暴露了一个接口
		//因此这里是data那么它对应的list就相当于也是data，在html页面也要相应改成list
		scope:{
			data:'=',
			filterObj:"="
		}
	}
}])

//replace为true时，就会把template模板内容直接替换掉，前提是模板内容中必须有一个根元素，而不会有并列元素
//当为false时，会把自定义指令内容插入到模板内容中

//transclude:true表示内嵌html，并且在template中的根元素下有标签<div ng-transclude></div>，才会生效内嵌

//让指令暴露一组接口，让其他的指令或者控制器调用
//这个scope可以是true，可以是false，也可以是一个对象，默认是false
//false表示这个自定义指令可以直接用控制器$scope下面挂载的东西，缺点是指令不能复用
//true进行绑定后，当自定义指令中$scope的值发生变化，不会影响控制器controller中的$scope的值
//scope:{
//	aa:"@",  @代表直接接收字符串   后面可以跟字符变量，三个都可以，不写就默认
//	bb:"=",  =传入的是变量，比如传入父控制器中的某个变量值
//	cc:"&"   &传入的是回调函数
//}
//<span aa="AA"></span>  默认情况下，但如果写成@abc,也改成<span abc="AA"></span>
//<span cc="click(id)"></span>  指令中template中写上<div ng-click="cc({id:2})"></div>
//并且controller控制器中$scope.click = funtion(f){console.log(f)}就会打印出2


angular.module("app").directive("appSheet",[function(){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"view/template/sheet.html",
		scope:{
			list:"=",
			visible:"=",
			select:"&"
		}
	}
}])

angular.module("app").directive("appTab",[function(){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"view/template/tab.html",
		scope:{
			list:"=",
			tabClick:"&"
		},
		link:function($scope){
			$scope.click = function(tab){
				$scope.selectId = tab.id;
				$scope.tabClick(tab);
			}
		}
	}
}])

angular.module("app").filter("filterByObj",[function(){
	//返回的是一个函数，第一个参数是一个数据，第二个参数是要过滤的对象
	return function(list,obj){
		var result = [];
		angular.forEach(list,function(item){
			var isEqual = true;
			for(var e in obj){
				if(item[e]!==obj[e]){
					isEqual = false;
				}
			}
			if(isEqual){
				result.push(item);
			}
		})
		return result;
	}
}])
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