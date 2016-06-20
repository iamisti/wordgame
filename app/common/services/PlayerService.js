(function(){
    'use strict';

    function PlayerService(PlayerModelFactory){
        var service = this;
        var player;
        
        service.setPlayer = setPlayer;
        service.getPlayer = getPlayer;
        service.updatePlayer = updatePlayer;

        function setPlayer(name){
            player = PlayerModelFactory.getPlayer(name);

            var request = firebase.database().ref()
                .child('/players')
                .push(player.toDto());

            request.then(function(){
                player.setSaved(true);
                player.setId(request.key);
            });
        }

        function updatePlayer(playerModel){
            var update = {};

            update['/players/' + playerModel.getId()] = playerModel.toDto();

            var request = firebase.database().ref().update(update);
        }

        function getPlayer() {
            return player;
        }
    }

    angular
        .module('wordGame.common')
        .service('PlayerService', ['PlayerModelFactory', PlayerService]);
}());