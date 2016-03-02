/**
HackPage agroup all methods and configuration for those hacked pages.

@class HackPageCtrl
@constructor
*/

(function(){
    'use strict';

    app.controller('HackPageCtrl', HackPageCtrl);

    HackPageCtrl.$inject = ['$scope', '$rootScope', 'ngProgressFactory', 'ipsumService'];

    function HackPageCtrl($scope, $rootScope, ngProgressFactory, ipsumService){

    	function genBrick() {
      var height = ~~(Math.random() * 500) + 100;
      var id = ~~(Math.random() * 10000);
      return {
        src: 'http://lorempixel.com/g/720/' + height + '/?' + id,
        title: ipsumService.randomMi()+ipsumService.words(1)+' '+ipsumService.randomMi()+ipsumService.words(1),
        content: ipsumService.sentences(2)
      };
    }

    $scope.bricks = [
      genBrick(),
      genBrick(),
      genBrick(),
      genBrick(),
      genBrick(),
      genBrick(),
      genBrick(),
      genBrick(),
      genBrick(),
      genBrick()
    ];












    	$scope.contained_progressbar = ngProgressFactory.createInstance();

		if($rootScope.selectedPage){
			$scope.page = {
			  title: $rootScope.selectedPage.name,
			  subtitle: 'Place subtitle here...'
			};
			
			activate();
		}
		/**
		Will activate progress bar and then will bring all content of pages.
		@method activate
		*/
		function activate(){
			$scope.contained_progressbar.setParent(document.getElementById('demo_contained'));
            $scope.contained_progressbar.setColor('red');
            $scope.contained_progressbar.setAbsolute();
            $scope.contained_progressbar.start();

			if(!$scope.pagehacked){
				$scope.pagehacked = [];
			}
            FB.api(
                "/"+$rootScope.selectedPage.id+"/feed?fields=message,full_picture,link,source,type,created_time,shares,comments.summary(true),likes.summary(true),description&limit=100&since=15-08-05",
                function (response) {
                	$scope.contained_progressbar.complete();
                    if (response && !response.error) {
                        $scope.datahacked = response.data;
						$scope.datahacked.forEach(function(page) {
							if(page.type == 'link' || 
							   page.type == 'photo' ||
							   page.type == 'video'){
							
								if (typeof page.shares === 'undefined'){
									page.shares = [];
									page.shares.count = 0;
								}
								$scope.pagehacked.push(page);
							}
						});
                        $scope.$apply();
                }
            });
		}
	}
	
})();	