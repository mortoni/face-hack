/**
PageGet Controller that will configure pages that got hack.

@class PageGetCtrl
@constructor
*/

(function () {
	'use strict';

	app.controller('PageGetCtrl', PageGetCtrl);
	
	PageGetCtrl.$inject = ['$scope', '$rootScope', 'APP_SETTINGS', 'PostsService', 'DTOptionsBuilder', 'DTColumnDefBuilder'];

	function PageGetCtrl($scope, $rootScope, APP_SETTINGS, PostsService, DTOptionsBuilder, DTColumnDefBuilder) {
		var ref = new Firebase(APP_SETTINGS.FIREBASE_URL + '/posts');

		/**
		The set up of options of data table
		@property $scope.dtOptions
		*/
		$scope.dtOptions = DTOptionsBuilder.newOptions().withBootstrap();
		
		/**
		The set up of data table columns
		@property $scope.dtColumnDefs
		*/
		$scope.dtColumnDefs = [
		  DTColumnDefBuilder.newColumnDef(0),
		  DTColumnDefBuilder.newColumnDef(1).notSortable(),
		  DTColumnDefBuilder.newColumnDef(2),
		  DTColumnDefBuilder.newColumnDef(3),
		  DTColumnDefBuilder.newColumnDef(4)
		];
		
		$scope.page = {
          title: 'Hack',
          subtitle: 'Place subtitle here...'
        };

        if(!$scope.pageViwed)
            $scope.pageViwed = [];

        /**
		@method viewPost
		@param post {Object} The post to be viewed
		*/
        $scope.viewPost = function(post){
        	$scope.postViwed = post;
        }

        /**
		@method viewPage
		@param page {Object} The page to be viewed
		*/
		$scope.viewPage = function(page){
			$scope.pageViwed = page;
		}

		/**
		@method deletePage
		@param page {Object} The page to be deleted
		*/
		$scope.deletePage = function(page){
			var result = confirm("Want to delete this item?");

			if(result){
				$rootScope.pages.splice($rootScope.pages.indexOf(page), 1);
			}
		}

		/**
		@method resume
		@param page {Object} The page to be resume
		*/
		$scope.resume = function(page){
			page.stat = 'resume';        	      
		}

		/**
		@method pause
		@param page {Object} The page to be pause
		*/
		$scope.pause = function(page){
			page.stat = 'pause';
		}

		/**
		This method will be called each 5 second, updating content of each feed hacked of those resumed pages 
		@method setInterval
		*/
		setInterval(function() {
		    $scope.progress = moment().minute();
        	var flag = true;

            $rootScope.pages.forEach(function(page) {
                if(page.stat == "resume"){

                	FB.api(
		                "/"+page.id+"/feed?fields=message,full_picture,link,source,type,created_time,shares,comments.summary(true),likes.summary(true)&limit=1",
		                function (response) {
		                    if (response && !response.error) {
		                    	var post = PostsService.post(response.data[0], page);

				                if(post){
				                	if(((post.type == 'photo') || (post.type == 'link') || (post.type == 'video'))){
					                	flag = true;

					                	if($rootScope.posthacked.length != 0){
					                		$rootScope.posthacked.forEach(function(e) {
					                			if(e.id == post.id){	                        
					                				flag = false;
					                				updatePost(e, post);
					                			}
					                		}); 
					                		if(flag){	                            		
					                			if(PostsService.isPostHourAgo(post)){
					                				$rootScope.posthacked.push(post);
					                				$rootScope.$apply();
					                			}
					                		}
					                	}else{	                
					                		if(PostsService.isPostHourAgo(post)){
					                			$rootScope.posthacked.push(post);
					                			$rootScope.$apply();		                        	
					                		}
					                	}
					                }
			                	}                
		                    }
		                }
		            );       
                }
            });  
		}, 5000);

		/**
		@method updatePost
		@param e {Object} The index of selected post
		@param post {Object} The post to be updated
		*/
        function updatePost(e, post){
        	var i = $rootScope.posthacked.indexOf(e);

        	if (typeof post.comments.summary.total_count !== 'undefined')
				$rootScope.posthacked[i].comments.summary.total_count = post.comments.summary.total_count;
			if (typeof post.likes.summary.total_count !== 'undefined')
				$rootScope.posthacked[i].likes.summary.total_count = post.likes.summary.total_count;
			if (typeof post.shares !== 'undefined')
				$rootScope.posthacked[i].shares.count = post.shares.count;
			$rootScope.$apply();
        }

        
	}
})();