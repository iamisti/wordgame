(function(){
    'use strict';

    function PlayerService(PlayerModelFactory){
        var service = this;
        var player;
        
        service.setPlayer = setPlayer;
        service.getPlayer = getPlayer;

        function setPlayer(name){
            player = PlayerModelFactory.getPlayer(name);
        }

        function getPlayer() {
            return player;
        }
    }

    angular
        .module('wordGame.common')
        .service('PlayerService', ['PlayerModelFactory', PlayerService]);
}());