var app = angular.module('photoApp', []);

app.controller('PhotoListController', function($scope, $http) {
	var photoListUrl = "https://jsonplaceholder.typicode.com/photos";
	var commentsUrl = "https://jsonplaceholder.typicode.com/comments";
	
	var page = 0;
    
	$scope.showPhoto = function(photo) {
		$('#modalPhoto .modal-body .photo').empty();
		$('#modalPhoto .modal-body .photo').append('<img width="400" height="400">');
		$('#modalPhoto .modal-body .photo').append('<p>');

		$http.get(commentsUrl + "?postId=" + photo.id).then(function(response) {
			$scope.comments = response.data;
		});

		$('#modalPhoto').modal("show");

		$('#modalPhoto').on('shown.bs.modal', function () {
			$('#modalPhoto .modal-body img').attr('src', photo.url);
			$('#modalPhoto .modal-body p').html(photo.title);
		})
    };

	$scope.maisPhotos = function(photo) {
		page++;
		$scope.photos = $scope.allPhotos.slice(page, page + 10);
	};

	$scope.getInfo = function() {
		var firstPhoto = page * 10;
		return "De " + (firstPhoto + 1) + " a " + (firstPhoto + 10);
	};

	$http.get(photoListUrl).then(function(response) {
		$scope.allPhotos = response.data;
		var firstPhoto = page * 10;
		$scope.photos = $scope.allPhotos.slice(firstPhoto, firstPhoto + 10);
	});
});
