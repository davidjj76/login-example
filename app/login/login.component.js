(function() {
    'use strict';

    angular
    .module('login')
    .component('login', {
        templateUrl: 'login/login.template.html',
        controller: [
            '$location',
            'Authentication',
            'Flash',
            function LoginController($location, Authentication, Flash) {
                var self = this;
                self.login = login;

                (function initController() {
                    Authentication.ClearCredentials();
                })();

                function login() {
                    self.dataLoading = true;
                    Authentication.Login(self.username, self.password, function(response) {
                        if (response.success) {
                            Authentication.SetCredentials(self.username, self.password);
                            $location.path('/');
                        } else {
                            Flash.Error(response.message);
                            self.dataLoading = false;
                        }
                    });
                };
            }
        ]
    });
})();
