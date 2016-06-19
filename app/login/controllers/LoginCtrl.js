(function(){
    'use strict';

    function LoginCtrl($state, PlayerService, GAME_STATES){
        var vm = this;

        vm.submitLogin = submitLogin;

        function submitLogin(){
            //TODO set user by name, if user exists, show them the highest score somewhere

            PlayerService.setPlayer(vm.playerName);
            
            $state.go(GAME_STATES.GAME);
        }
    }

    angular
        .module('wordGame.login')
        .controller('LoginCtrl', ['$state', 'PlayerService', 'GAME_STATES', LoginCtrl]);
}());