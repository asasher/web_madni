angular.module('madniFurnitures',[])
.controller('Main',['$scope','$interval','$sce',function ($scope, $interval, $sce) {
	imgDir = 'img/';
	imgExt = '.jpg';
	$scope.items = [{		
		type: 'img',
		name: 'bed01',
		text: "Amazing bedroom featuring modern outlook but with a hunt of tradition."
	},		
	{		
		type: 'img',
		name: 'bed02',
		text: "Minimalistic yet modern bedroom set."
	},		
	{
		type: 'map',
		name: 'map',
		text: '4-B Wahat Road, Lahore <br> \
		<br> \
		<strong>Phone: </strong>042-5865565, 5831015 <br> \
		<br> \
		<strong>Email: </strong>madnifurniture@yahoo.com'
	}];	

	for(var i = 0; i < $scope.items.length; i++)
	{
		$scope.items[i].text = $sce.trustAsHtml($scope.items[i].text);
	}

	$scope.getPath = function(name) {
		return imgDir + name + imgExt;
	}

	$scope.idx = 0;
	$scope.isRotating = true;

	$scope.next = function () {
		$scope.idx = ($scope.idx + 1) % $scope.items.length;
	}

	$scope.prev = function () {
		$scope.idx = ($scope.idx - 1) % $scope.items.length;
	}

	$scope.rotate = function () {
		if($scope.isRotating) {
			$scope.next();
		}
	}

	$interval($scope.rotate,5000);
	
}]);