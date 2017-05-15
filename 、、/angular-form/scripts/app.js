/**
 * Created by yangyulong on 16/1/29.
 */
/**
 * 加载所有的依赖
 * @type {module}
 */
var formLayoutApp = angular.module('app',  ['ngRoute', 'w5c.validator', 'hxsd.datepicker', 'form.layout']);

formLayoutApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : './tmpl/formLayout.html',
            controller : 'formLayoutCtrl'
        })
        .otherwise(
            {redirectTo:'/'}
        );
});

/**
 * form-layout 服务
 * 配置 form-layout 的模板
 */
formLayoutApp.config(['formLayoutProvider', function (formLayoutProvider) {
    //var tmpl = {
    //    text:'<div>hehhe</div>',
    //};
    //formLayoutProvider.configTmpl(tmpl);
    //console.log(formLayoutProvider.elementTemplate);
}]);