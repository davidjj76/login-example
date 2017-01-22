(function() {
    'use strict';

    angular
    .module('core.user')
    .factory('User', [
        '$http',
        '$q',
        '$timeout',
        function User($http, $q, $timeout) {

            // datos del usuario hardcoded
            var authUser = {
                name: 'admin',
                password: 'admin'
            }

            var service = {};

            service.Get = Get;
            service.GetByUsername = GetByUsername;

            return service;

            function Get(users) {
                return $http.get('https://randomuser.me/api/?results=' + users + '&nat=es')
                    .then(handleSuccess, handleError('Error getting users'));
            }

            function GetByUsername(username) {
                return checkUser(username)
                    .then(handleSuccess, handleError('Error getting user by username'));
            }

            // private functions
            function checkUser(username) {
                // chequea que el usuario coincicde con el hardcoded
                // mediante timeout y promesa para simular una llamada ajax
                return $q(function(resolve, reject) {
                    setTimeout(function() {
                        if (username === authUser.name) {
                            resolve({ data: authUser });
                        } else {
                            reject();
                        }                        
                    }, 1000);
                })
            }

            function handleSuccess(res) {
                return res.data;
            }

            function handleError(error) {
                return function() {
                    return { success: false, message: error };
                };
            }
        }
    ]);
})();
