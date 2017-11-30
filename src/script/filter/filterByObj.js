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