/**
Database agroup all methods and configuration for Database controller.

@class DataBaseCtrl
@constructor
*/

(function () {
	'use strict';

	app.controller('DataBaseCtrl', DataBaseCtrl);
	
	DataBaseCtrl.$inject = ['$scope', 
							'$rootScope', 
							'$firebaseArray', 
							'APP_SETTINGS', 
							'PostsService', 
							'DTOptionsBuilder', 
							'DTColumnDefBuilder', 
							'$modal'];

	function DataBaseCtrl($scope, $rootScope, $firebaseArray, APP_SETTINGS, PostsService, DTOptionsBuilder, DTColumnDefBuilder, $modal) {
		var ref = new Firebase(APP_SETTINGS.FIREBASE_URL + '/posts');
		ref.orderByKey().limitToLast(25);

		/**
		The set up of options of data table
		@property $scope.dtOptions
		*/
		$scope.dtOptions = DTOptionsBuilder
		.newOptions()
		.withPaginationType('full_numbers')
		.withBootstrap();

		/**
		The set up of data table columns
		@property $scope.dtColumnDefs
		*/
		$scope.dtColumnDefs = [
			DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1).notSortable(),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4).notSortable(),
			DTColumnDefBuilder.newColumnDef(5),
			DTColumnDefBuilder.newColumnDef(6),
			DTColumnDefBuilder.newColumnDef(7).notSortable(),
			DTColumnDefBuilder.newColumnDef(8).notSortable(),
			DTColumnDefBuilder.newColumnDef(9).notSortable(),
			DTColumnDefBuilder.newColumnDef(10).notSortable(),
			DTColumnDefBuilder.newColumnDef(11).notSortable()
		];

		$scope.page = {
			title: 'DataBase',
			subtitle: 'Place subtitle here...'
		};
		
		$scope.posts = [];

		activate();
		updatePosts();

		/**
		@method deletePost
		@param post {Object} The post to be deleted
		*/
		$scope.deletePost = function(post){
			var modalInstance = $modal.open({
				templateUrl: 'myViews/modal-delete.html',
				controller: 'ModalCtrl',
				backdropClass: 'splash splash-1 splash-ef-1',
				windowClass: 'splash splash-1 splash-ef-1',
				resolve: {
					post: function () {
						return post;
					}
				}
			});
  		}

		/**
		@method editPost
		@param post {Object} The post to be edited
		*/
  		function editPost(post){
			//TODO
		}

		/**
		@method viewPost
		@param post {Object} The post to be viewed
		*/
		$scope.viewPost = function(post){
			var modalInstance = $modal.open({
				templateUrl: 'myViews/modal-view.html',
				controller: 'ModalCtrl',
				backdropClass: 'splash splash-1 splash-ef-1',
				windowClass: 'splash splash-1 splash-ef-1',
				resolve: {
					post: function () {
						return post;
					}
				}
			});
		}

		/**
		@method sharePost
		@param post {Object} The post to be shared
		*/
		$scope.sharePost = function(post){
			var modalInstance = $modal.open({
				templateUrl: 'myViews/modal-share.html',
				controller: 'ModalCtrl',
				backdropClass: 'splash splash-1 splash-ef-1',
				windowClass: 'splash splash-1 splash-ef-1',
				resolve: {
					post: function () {
						return post;
					}
				}
			});
		}

		/**
		@method updatePosts
		@param post {Object} The post to be updated
		*/
		function updatePosts(post){
			PostsService.update();
		}

		/**
		@method activate
		*/
		function activate() {
			$scope.posts = $firebaseArray(ref);
		}

		/**
		@method detailPost
		@param post {Object} The post to be detailed
		*/
		function detailPost(post){
			//TODO
		}
	}
})();