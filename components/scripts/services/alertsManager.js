'use strict';

angular.module('shopping-cart')
    .factory('alertsManager', ['$rootScope', '$timeout', function($rootScope, $timeout) {
        var messageTimer = false,
            displayDuration = 8000;

        $rootScope.alertMessage = {};
        $rootScope.showAlert = false;

        return {
            addAlert: function(message, type) {
                if (messageTimer) {
                    $timeout.cancel(messageTimer);
                }

                $rootScope.showAlert = true;
                $rootScope.alertMessage = {type: type, message: message};

                messageTimer = $timeout(function () {
                    $rootScope.alertMessage = {};
                    $rootScope.showAlert = false;
                }, displayDuration);
            },
            closeAlert: function() {
                $rootScope.alertMessage = {};
                $rootScope.showAlert = false;
                $timeout.cancel(messageTimer);
            }
        };
    }]);