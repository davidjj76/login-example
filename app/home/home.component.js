(function() {
    'use strict';

    angular
    .module('home')
    .component('home', {
        templateUrl: 'home/home.template.html',
        controller: [
            '$rootScope',
            'User',
            'Flash',
            function HomeController($rootScope, User, Flash) {
                var self = this;

                self.user = null;
                self.users = [];

                (function initController() {
                    loadCurrentUser();
                    loadUsers();
                })();
 				
 				function loadCurrentUser() {
                    // Carga los datos del usuario actual
            		User.GetByUsername($rootScope.globals.currentUser.username)
                		.then(function (response) {
                    		self.user = response;
                	});
        		}

        		function loadUsers() {
                    // Obtenemos 10 usuarios
        			User.Get(10)
        				.then(function(response) {
                            if(response.success) {
                                self.users = response.results;
                            }
                            else {
                                Flash.Error(response.message);
                            }
        			});
        		}
            }
        ]
    });
})();
