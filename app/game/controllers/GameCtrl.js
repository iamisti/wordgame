(function(){
    'use strict';

    function GameCtrl(PlayerService, GameService){
        var vm = this;

        vm.getRandomWord = getRandomWord;
        vm.player = PlayerService.getPlayer();

        getRandomWord();

        function getRandomWord(){
            GameService.getWord().then(function(word){
                vm.word = word;
                vm.mangledWord = word.getMangledWord();
            });
        }
    }

    angular
        .module('wordGame.game')
        .controller('GameCtrl', ['PlayerService', 'GameService', GameCtrl]);
}());