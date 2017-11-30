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