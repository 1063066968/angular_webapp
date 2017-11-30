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

