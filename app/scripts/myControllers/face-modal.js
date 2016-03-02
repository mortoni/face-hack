/**
Modal will control all modals.

@class ModalCtrl
@constructor
*/

(function(){
    'use strict';

    app.controller('ModalCtrl', ModalCtrl);

    ModalCtrl.$inject = ['$scope', 
    					 'post', 
    					 '$firebaseArray', 
    					 'APP_SETTINGS', 
    					 '$modalInstance', 
    					 'toastr',
						 'toastrConfig',
						 '$rootScope'];

    function ModalCtrl($scope, post, $firebaseArray, APP_SETTINGS, $modalInstance, toastr, toastrConfig, $rootScope){
    	/**
		The post to be manipulated by methods
		@property $scope.post
		*/
		$scope.post = post;
		var openedToasts = [];

		/**
		This method will call a Toast in case of sucess action

		@method successToast
		@param msg {String} Message to be displayed.
		*/
		function successToast(msg){
			var toast = toastr['success'](msg, 'Success', {
            	iconClass: 'toast-success bg-success'
          	});
	        openedToasts.push(toast);
		}

		/**
		@method delete
		*/
		$scope.delete = function(){
			var itemRef = new Firebase(APP_SETTINGS.FIREBASE_URL + '/posts/' + post.$id);
  			itemRef.remove();
  			$rootScope.postCount = $rootScope.postCount - 1;
  			$modalInstance.dismiss('cancel');
  			successToast('The item was deleted');
		}

		/**
		@method cancel
		*/
		$scope.cancel = function(){
			$modalInstance.dismiss('cancel');
		}

		/**
		@method share
		*/
		$scope.share = function(){

			FB.api('/me/feed', 
				   'post', 
				   { message: $scope.post.message}, 
			function(response) {
			  if (!response || response.error) {
			    alert('Error occured');
			  } else {
			  	successToast('Shared cool bro!');
			    $modalInstance.dismiss('cancel');
			  }
			});
		}
	}
})();