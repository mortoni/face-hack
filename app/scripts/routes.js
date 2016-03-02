(function(){
  'use strict';

  app.config(['uiSelectConfig', function (uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
  }])

  //angular-language
  .config(['$translateProvider', function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'languages/',
      suffix: '.json'
    });
    $translateProvider.useLocalStorage();
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy(null);
  }])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/core/login');

    $stateProvider

    .state('app', {
      abstract: true,
      url: '/app',
      templateUrl: 'views/tmpl/app.html'
    })
    //dashboard
    .state('app.dashboard', {
      url: '/dashboard',
      controller: 'SearchCtrl',
      templateUrl: 'myViews/dashboard.html',
      resolve: {
        plugins: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([
            'scripts/vendor/datatables/datatables.bootstrap.min.css',
            'scripts/vendor/datatables/datatables.bootstrap.min.css'
          ]);
        }]
      }
    })
	// app dashboard hacked page
    .state('app.hack', {
      url: '/hack',
      controller: 'HackPageCtrl',
      templateUrl: 'myViews/hack-page.html'
    })
	// app get page
    .state('app.get', {
      url: '/get',
      controller: 'PageGetCtrl',
      templateUrl: 'myViews/get-page.html',
      resolve: {
        plugins: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([
            'scripts/vendor/datatables/ColReorder/css/dataTables.colReorder.min.css',
            'scripts/vendor/datatables/ColReorder/js/dataTables.colReorder.min.js',
            'scripts/vendor/datatables/Responsive/dataTables.responsive.css',
            'scripts/vendor/datatables/Responsive/dataTables.responsive.js',
            'scripts/vendor/datatables/ColVis/css/dataTables.colVis.min.css',
            'scripts/vendor/datatables/ColVis/js/dataTables.colVis.min.js',
            'scripts/vendor/datatables/TableTools/css/dataTables.tableTools.css',
            'scripts/vendor/datatables/TableTools/js/dataTables.tableTools.js',
            'scripts/vendor/datatables/datatables.bootstrap.min.css'
          ]);
        }]
      }		
    })
	.state('app.get.page', {
      url: '/get/:pageId',
      controller: 'PageGetCtrl',
      templateUrl: 'myViews/get-page.html',
      resolve: {
        plugins: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([
            'scripts/vendor/datatables/ColReorder/css/dataTables.colReorder.min.css',
            'scripts/vendor/datatables/ColReorder/js/dataTables.colReorder.min.js',
            'scripts/vendor/datatables/Responsive/dataTables.responsive.css',
            'scripts/vendor/datatables/Responsive/dataTables.responsive.js',
            'scripts/vendor/datatables/ColVis/css/dataTables.colVis.min.css',
            'scripts/vendor/datatables/ColVis/js/dataTables.colVis.min.js',
            'scripts/vendor/datatables/TableTools/css/dataTables.tableTools.css',
            'scripts/vendor/datatables/TableTools/js/dataTables.tableTools.js',
            'scripts/vendor/datatables/datatables.bootstrap.min.css'
          ]);
        }]
      }		
    })

    // app dashboard hacked page
    .state('app.database', {
      url: '/database',
      controller: 'DataBaseCtrl',
      templateUrl: 'myViews/database.html'
    })
    //app core pages (errors, login,signup)
      .state('core', {
      abstract: true,
      url: '/core',
      template: '<div ui-view></div>'
    })
    //login
    .state('core.login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'myViews/login.html'
    })
    //page 404
    .state('core.page404', {
      url: '/page404',
      templateUrl: 'views/tmpl/pages/page404.html'
    })
    //page 500
    .state('core.page500', {
      url: '/page500',
      templateUrl: 'views/tmpl/pages/page500.html'
    })
    //page offline
    .state('core.page-offline', {
      url: '/page-offline',
      templateUrl: 'views/tmpl/pages/page-offline.html'
    })
    //locked screen
    .state('core.locked', {
      url: '/locked',
      templateUrl: 'views/tmpl/pages/locked.html'
    })
    
    //search results
    .state('app.pages.search-results', {
      url: '/search-results',
      controller: 'SearchResultsCtrl',
      templateUrl: 'views/tmpl/pages/search-results.html',
      resolve: {
        plugins: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([
            'scripts/vendor/slider/bootstrap-slider.js'
          ]);
        }]
      }
    })
    //profile page
    .state('app.pages.profile', {
      url: '/profile',
      controller: 'ProfileCtrl',
      templateUrl: 'views/tmpl/pages/profile.html',
      resolve: {
        plugins: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([
            'scripts/vendor/filestyle/bootstrap-filestyle.min.js'
          ]);
        }]
      }
    });
  }]);      
})();