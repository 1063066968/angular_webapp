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