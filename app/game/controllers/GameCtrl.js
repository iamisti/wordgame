(function(){
    'use strict';

    function GameCtrl(PlayerService){
        var vm = this;

        vm.player = PlayerService.getPlayer();
    }

    angular
        .module('wordGame.game')
        .controller('GameCtrl', ['PlayerService', GameCtrl]);
}());