import angular from 'angular';
import ngChromaModule from '../src/index.js';

angular.module('testApp', [ngChromaModule]).
controller('testCtrl', ['$scope', function($scope) {
  $scope.customColors = [
    '#ff0000',
    '#0000ff',
  ];
}]);
