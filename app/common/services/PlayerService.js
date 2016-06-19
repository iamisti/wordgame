(function(){
    'use strict';

    function PlayerService(PlayerModelFactory){
        var service = this;
        var player;
        
        service.setPlayer = setPlayer;
        service.getPlayer = getPlayer;

        function setPlayer(name){
            player = PlayerModelFactory.getPlayer(name);

            firebase.database().ref()
                .child('/players')
                .push(player.toDto())
                .then(function(){
                    player.setSaved(true);
                });
        }

        function getPlayer() {
            return player;
        }

        /*
        var users = {
            '12234': {
                'name': 'Iamisti',
                //top 10
                'highscores': [
                    {
                        score: 123,
                        date: 121212214235434
                    }
                ]
            }
        };

        //top 10
        var highscores = {
            '234565': {
                name: 'Iamisti',
                score: 124,
                date: 1234567877676
            }
        }
        */
    }

    angular
        .module('wordGame.common')
        .service('PlayerService', ['PlayerModelFactory', PlayerService]);
}());