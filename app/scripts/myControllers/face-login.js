/**
Login agroup all methods and configuration for login.

@class LoginCtrl
@constructor
*/

(function() {
    'use strict';

    app.controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$rootScope', 'APP_SETTINGS', '$window', '$state'];

    function LoginCtrl($scope, $rootScope, APP_SETTINGS, $window, $state) {
        var FB = $window.FB;
    	var ref = new Firebase(APP_SETTINGS.FIREBASE_URL);

        /**
        This method will conect the user to application through the facebook.
        @method doFacebookLogin
        */
        $scope.doFacebookLogin = function() {
            ref.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    console.log("Falha no login!!", error);
                }else{
                    $rootScope.user = {
                        name: authData.facebook.displayName,
                        email: authData.facebook.email,
                        image: authData.facebook.profileImageURL,
                        accessToken: authData.facebook.accessToken
                    };

                    FB.init({
                        appId         : '683141025153544',
                        status        : true, 
                        xfbml         : true,
                        cookie        : true,
                        status        : true,
                        authResponse  : {
                          accessToken   : $rootScope.user.accessToken
                        },
                        version       : 'v2.4'
                    });
                    $state.go('app.dashboard');
                    $scope.$apply();
                }
            }, {
                scope: "email"
            });
        }
        
        /**
        @method logout
        */
        $rootScope.logout = function() {
            ref.unauth();
            $rootScope.user = null;
            $rootScope.pages = [];
            $rootScope.posthacked = [];

            localStorage.removeItem("firebase:session::facehack");
            $state.go('core.login');
        }
    }
})();  