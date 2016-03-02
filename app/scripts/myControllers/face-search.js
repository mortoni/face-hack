/**
Search will manipulate all information to be serached and after.

@class SearchCtrl
@constructor
*/

(function(){
    'use strict';

    app.controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$scope', '$rootScope', 'APP_SETTINGS', '$firebaseArray', '$modal', '$state'];

    function SearchCtrl($scope, $rootScope, APP_SETTINGS, $firebaseArray, $modal, $state){
        var ref = new Firebase(APP_SETTINGS.FIREBASE_URL + 'pages');

        $scope.page = {
          title: 'Dashboard',
          subtitle: 'Place subtitle here...'
        }; 
   
        FB.api(
            "/me",
            function (response) {
              if (response && !response.error) {
                $scope.facebookUser = response;
                $scope.$apply();
            }
        }); 

        /**
        @method infoPage
        @param page {Object} The page to be informed
        */
        $scope.infoPage = function(page){
            var modalInstance = $modal.open({
                templateUrl: 'myViews/modal-infoPage.html',
                controller: 'ModalCtrl',
                backdropClass: 'splash splash-1 splash-ef-1',
                windowClass: 'splash splash-1 splash-ef-1',
                resolve: {
                    page: function () {
                        return page;
                    }
                }
            });
        };
		
        /**
        This method will search for pages
        @method searchPage
        */
        $scope.searchPage = function() {    
			FB.api(
                  "/search?q=" + $scope.pageName + "&type=page&limit=24",      
                  function (response) {
                    if (response && !response.error) {
                        $rootScope.pageFind = response.data;

                        angular.forEach($rootScope.pageFind, function(val, key) {
                            FB.api(
                                "/"+val.id+"/?fields=likes,picture,about",      
                                function (response) {
                                    $('#progress1').hide();

                                    if (response && !response.error) {
                                        $scope.pageInf = response;
                                        $rootScope.pageFind[key].likes = response.likes;
                                        $rootScope.pageFind[key].picture = response.picture.data.url;
                                        $rootScope.pageFind[key].about = response.about;
                                        $scope.pagehacked = null;
                                        $scope.$apply();
                                    }
                                });
                        });
                        $scope.$apply();
                    }
                });
        };

        /**
        This method will put the page on hackpage list and then send to hack page
        @method hackPage
        @param page {Object} The page to be hacked
        */
        $scope.hackPage = function(page) {
			$rootScope.selectedPage = page;
            $state.go('app.hack');
        };

        /**
        This method will spy the selected page
        @method getPage
        @param page {Object} The page to be spy
        */
        $scope.getPage = function(page) {  
            var flag = true;

            $rootScope.pages.forEach(function(entry) {
                if(entry.id == page.id)
                    flag = false;
            });

            if(flag){
                page.intervalId = null;
                page.stat = 'pause';
                $rootScope.pages.push(page);
				$state.go('app.get');
            }else{
				$state.go('app.get.page'); 
            }
        };
	};
})();