(function () {
	app.constant('APP_SETTINGS', {
        "FIREBASE_URL": "https://facehack.firebaseio.com/"
        
    });
    app.run(function ($rootScope, APP_SETTINGS, PostsService, PageService, $firebaseArray, $state, $stateParams) {
        $rootScope.user = null;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        var posts = [];
        
        var ref = new Firebase(APP_SETTINGS.FIREBASE_URL + 'configuration');
        var ref2 = new Firebase(APP_SETTINGS.FIREBASE_URL + '/posts');
        ref.orderByKey().limitToLast(25);

        if(!$rootScope.posthacked)
            $rootScope.posthacked = [];
        if(!$rootScope.pages)
            $rootScope.pages = [];
        if(!$rootScope.pagesInDB)
            $rootScope.pagesInDB = [];
        if(!$rootScope.configuration)
            $rootScope.configuration = [];
        if(!$rootScope.postCount)
            $rootScope.postCount = 0;

        activate();
        //PageService.updatePages();
        

        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
          if ($rootScope.user == null) {
              $state.go('core.login');
          }    
          event.targetScope.$watch('$viewContentLoaded', function () {

            angular.element('html, body, #content').animate({ scrollTop: 0 }, 200);

            setTimeout(function () {
              angular.element('#wrap').css('visibility','visible');

              if (!angular.element('.dropdown').hasClass('open')) {
                angular.element('.dropdown').find('>ul').slideUp();
              }
            }, 200);
          });
          $rootScope.containerClass = toState.containerClass;
        }); 

        function activate() {
            $rootScope.pagesInDB = PageService.pages();
            $rootScope.configuration = $firebaseArray(ref);

            
            posts = $firebaseArray(ref2);

            posts.$loaded().then(function(posts) {
                $rootScope.postCount = posts.length;
            });
        }

        var d = new Date();
        var secondsPastHour = d.getMinutes()*60 + d.getSeconds();
        var intervalId = setInterval( saveDB, 60*60*1000 - secondsPastHour*1000 );
        //var intervalId = setInterval( saveDB, 5000 );
        
        function saveDB(){
            clearInterval( intervalId );
            setInterval( saveDB, 60*60*1000 );
            PostsService.save();
            //$rootScope.postCount = $rootScope.postCount + 1;
            $rootScope.posthacked = [];
        }     
    });
})();