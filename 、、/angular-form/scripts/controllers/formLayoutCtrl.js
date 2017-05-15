/**
 * Created by yangyulong on 16/1/29.
 */

formLayoutApp.controller('formLayoutCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.apptitle = "form 表单自动布局";
    $scope.formLayoutUrl = './doc/formlayout.json';
    var items = $scope.items = {};
    var vm = $scope.vm = {};
    //日历插件的配置项,可以统一配置，也可以单独配置每一个
    // 上线申请时间的日历组件配置
    $scope.datepicker = {
        'maxDate'      : '2015-12-31',
        'closeText'    : 'close',
        'showtimetext' : true
    };

    $scope.showVal = function () {
        items = $scope.items;
        console.log($scope.vm);
    };
}]);
