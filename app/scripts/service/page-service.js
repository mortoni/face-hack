(function() {
	'use strict';

	app.service('PageService', PageService);

	PageService.$inject = ['$rootScope', 'APP_SETTINGS', '$firebaseArray'];
		
	function PageService($rootScope, APP_SETTINGS, $firebaseArray){
        var vm = this;
		var ref = new Firebase(APP_SETTINGS.FIREBASE_URL + 'pages');
        
        if(!vm.pagesOld)
            vm.pagesOld = [];

        //ref.orderByKey().limitToLast(25);
        //var query = ref.orderByChild("timestamp").limitToLast(25);

        activate();

        function activate() {
            vm.pagesOld = $firebaseArray(ref);
        }

        vm.pages = function(){
        	return $firebaseArray(ref);
        }

        //not working
        vm.updatePages = function(){
            //vm.teste = $firebaseArray(ref);
            ref.orderByKey().limitToLast(25);
            var groups = $firebaseArray(ref);
        	vm.pagesOld.forEach(function(entry) {
        		var refPage = new Firebase(APP_SETTINGS.FIREBASE_URL + '/posts/'+entry.$id);

                FB.api(
                  "/" + entry.id + "?fields=likes,picture,about,name",      
                  function (response) {
                    if (response && !response.error) {
                        refPost.update({ image: response.likes});
            			refPost.update({ likes: response.picture.data.url});
                    }
            	});
            });
        }

        vm.pageToObject = function(page){
        	var data = {
                id: page.id,
                name: page.name,
                image: page.picture,
                likes: page.likes
            };

            return data;
        }
	}
})();