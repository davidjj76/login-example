(function() {
	'use strict';

	angular
	.module('app')
	.config(['$routeProvider', '$locationProvider',
		function config($routeProvider, $locationProvider) {
			$locationProvider.hashPrefix('!');

			// rutas permitidas
			$routeProvider
				.when('/', {
					template: '<home></home>'
				})
				.when('/login', {
					template: '<login></login>'
				})
				.otherwise('/login');
		}
	]);
})();
