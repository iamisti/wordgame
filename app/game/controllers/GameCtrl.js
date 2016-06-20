(function(){
    'use strict';

    function GameCtrl($scope, $interval, PlayerService, WordService, HighScoreService){
        var vm = this;

        vm.getRandomWord = getRandomWord;
        vm.startGame = startGame;

        vm.player = PlayerService.getPlayer();
        vm.guessedWord = '';
        vm.mistakes = 0;
        vm.currentPoints = 0;
        vm.timeToPlayInSeconds = 15;
        vm.isGameRunning = false;

        startGame();

        $scope.$watch('vm.guessedWord', function(newGuess, oldGuess){
            if(!oldGuess || !newGuess){
                return;
            }

            if(vm.word.getWord() === vm.guessedWord){
                appendScoreAndGetNewWord();
                return;
            }

            var diff = oldGuess.length - newGuess.length;

            //TODO: valid word comparism would be required here,
            // since user can select multiple characters and delete it with one keypress
            // Revise diff mechanism logic later if there is a better way to check it.
            if(diff >= 0){
                vm.mistakes++;
            }
        });
        
        function appendScoreAndGetNewWord(){
            vm.currentPoints += vm.word.getWordScore(vm.mistakes);

            getRandomWord();
        }

        function startGame(){
            vm.isGameRunning = true;

            getRandomWord();

            vm.secondsRemained = vm.timeToPlayInSeconds;

            $interval(function(){
                vm.secondsRemained--;

                if(vm.secondsRemained == 0){
                    endGameAndStoreResults();
                }
            }, 1000, vm.timeToPlayInSeconds);
        }
        
        function endGameAndStoreResults(){
            vm.isGameRunning = false;

            vm.player.addScore(vm.currentPoints);
            
            PlayerService.updatePlayer(vm.player);
            HighScoreService.addHighScore(vm.player.getName(), vm.player.getLastHighScore());
        }

        function getRandomWord(){
            vm.guessedWord = '';
            vm.mistakes = 0;

            WordService.getWord().then(function(word){
                vm.word = word;
                vm.mangledWord = word.getMangledWord();
            });
        }
    }

    angular
        .module('wordGame.game')
        .controller('GameCtrl', ['$scope', '$interval', 'PlayerService', 'WordService', 'HighScoreService', GameCtrl]);
}());