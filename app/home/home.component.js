(function() {
    'use strict';

    angular
    .module('home')
    .component('home', {
        templateUrl: 'home/home.template.html',
        controller: [
            '$rootScope',
            'User',
            function HomeController($rootScope, User) {
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
                		.then(function (user) {
                    		self.user = user;
                	});
        		}

        		function loadUsers() {
                    // Obtenemos 10 usuarios
        			User.Get(10)
        				.then(function(users) {
        					self.users = users.results;
        			});
        		}
            }
        ]
    });
})();
