(function () {
    'use strict';

    function appRun($rootScope, $state, PlayerService, LOGIN_STATES) {

        //TODO: $transitionProvider might be a better choise to handle?
        $rootScope.$on('$stateChangeStart', checkPlayerBeforeStateChanges);

        function checkPlayerBeforeStateChanges(event, toState, toParams) {
            if (toState.isAuthenticationRequired === true && !PlayerService.getPlayer()){
                event.preventDefault();
                $state.go(LOGIN_STATES.LOGIN);
            }
        }
    }

    angular
        .module('wordGame')
        .run(['$rootScope', '$state', 'PlayerService', 'LOGIN_STATES', appRun]);
})();