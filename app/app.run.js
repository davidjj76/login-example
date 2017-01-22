(function() {
    'use strict';

    angular
    .module('app')
    .run(['$rootScope', '$location', '$cookies', '$http',
        function run($rootScope, $location, $cookies, $http) {
        	// recupera datos del ususario logado al refrescar
            $rootScope.globals = $cookies.getObject('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
            }

        	// redirecciona a la vista de login si el usuario no está logado o 
        	// se intenta acceder a una página restringida
            $rootScope.$on('$locationChangeStart', function(event, next, current) {
                var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
                var loggedIn = $rootScope.globals.currentUser;
                if (restrictedPage && !loggedIn) {
                    $location.path('/login');
                }
            });
        }
    ]);
})();
