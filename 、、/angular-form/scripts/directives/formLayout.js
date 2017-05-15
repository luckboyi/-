/**
 * Created by yangyulong on 16/1/29.
 */
angular.module('form.layout', [])
    /**
     * 表单布局可以配置的服务
     */
    .provider('formLayout', function () {
        /**
         * 表单布局的模板
         * @type  {{labeltext}} 生成 dom 元素后要替换的 label 值, 不可变
         * @type {{itemsKey}} angular 编译 dom 要绑定的值, 不可变
         * @type {{text: string, password: string, radio: string, email: string, tel: string, url: string, number: string, checkbox: string, range: string, time: string, date: string, datetime: string, search: string, select: string, textarea: string}}
         */
        var elementTemplate = {
            text : '<div class="form-group">\
                            <label class="control-label">#labeltext#</label>\
                            <input type="text" class="form-control" name="{{itemsKey}}" ng-model="vm.{{itemsKey}}"/>\
                        </div>',
            password : '<div class="form-group">\
                              <label class="control-label">#labeltext#</label>\
                              <input type="password" class="form-control" name="{{itemsKey}}" ng-model="vm.{{itemsKey}}" />\
                          </div>',
            radio : '<div  class="form-group"> \
                           <label class="control-label">#labeltext#</label> \
                            <div>\
                                <label class="radio-inline" ng-repeat="(key, val) in options[\'{{itemsKey}}\']">\
                                <input type="radio" name="{{itemsKey}}" value="{{key}}" ng-model="vm.{{itemsKey}}" />{{val}}\
                                </label>\
                            </div>\
                        </div>',
            email : '<div class="form-group">\
                            <label class="control-label">#labeltext#</label>\
                            <input type="email" class="form-control" name="{{itemsKey}}" ng-model="vm.{{itemsKey}}" />\
                        </div>',
            tel : '<div class="form-group">\
                            <label class="control-label">#labeltext#</label>\
                            <input type="tel" class="form-control" name="{{itemsKey}}" ng-model="vm.{{itemsKey}}" />\
                        </div>',
            url : '<div class="form-group">\
                            <label class="control-label">#labeltext#</label>\
                            <input type="url" class="form-control" name="{{itemsKey}}" ng-model="vm.{{itemsKey}}" />\
                        </div>',
            number : '<div class="form-group">\
                            <label class="control-label">#labeltext#</label>\
                            <input type="number" class="form-control" name="{{itemsKey}}" ng-model="vm.{{itemsKey}}" />\
                        </div>',
            checkbox : '<div class="form-group">\
                                <label class="control-label">#labeltext#</label>\
                                <div>\
                                <label class="checkbox-inline" ng-repeat="(key, val) in options[\'{{itemsKey}}\']">\
                                <input type="checkbox" name="{{itemsKey}}" value="{{key}}" ng-model="vm.{{itemsKey}}[key]" />{{val}}\
                                </label>\
                                </div>\
                          </div>',
            range : '<div class="form-group">\
                                <label class="control-label">#labeltext#</label>\
                                <input type="range" name="{{itemsKey}}" ng-model="vm.{{itemsKey}}" />\
                          </div>',
            time  : '<div class="form-group">\
                                <label class="control-label">#labeltext#</label>\
                                <input type="text" name="{{itemsKey}}" class="form-control" ng-model="vm.{{itemsKey}}" />\
                          </div>',
            date : '<div class="form-group">\
                                <label class="control-label">#labeltext#</label>\
                                <input type="text" name="{{itemsKey}}" class="form-control" ng-model="vm.{{itemsKey}}" />\
                          </div>',
            datetime : '<div class="form-group">\
                                <label class="control-label">#labeltext#</label>\
                                <input type="text" name="{{itemsKey}}"  class="form-control" ng-model="vm.{{itemsKey}}" />\
                          </div>',
            search : '<div class="form-group">\
                                <label class="control-label">#labeltext#</label>\
                                <input type="search" name="{{itemsKey}}"  class="form-control" ng-model="vm.{{itemsKey}}" />\
                          </div>',
            select : '<div class="form-group">\
                                <label class="control-label">#labeltext#</label>\
                                <select class="form-control" name="{{itemsKey}}" ng-model="vm.{{itemsKey}}" convert-to-number multiple>\
                                    <option ng-repeat="(key, val) in options[\'{{itemsKey}}\']" value="{{key}}">{{val}}</option>\
                                </select>\
                          </div>',
            textarea : '<div class="form-group">\
                                <label class="control-label">#labeltext#</label>\
                                <textarea class="form-control" name="{{itemsKey}}" ng-model="vm.{{itemsKey}}"></textarea>\
                            <div>'
        };

        /**
         * 配置模板
         * @param configTmpl
         */
        this.configTmpl = function (configTmpl) {
            if (!angular.isObject(configTmpl)){
                throw  '传入的配置项必须是一个对象';
            }
            angular.extend(this.elementTemplate, configTmpl);
        };

        /**
         * 获取模板的内容
         * @returns {*}
         */
        this.getTmpl = function  () {
            return this.elementTemplate
        };

        this.$get = function () {
            // 放回当前的模板
            return elementTemplate;
        }
    });

angular.module('form.layout')
    /**
     * 定义表单布局的指令
     */
    .directive('formLayout', ['$http', 'formLayout', function ($http, formLayout) {
        return {
            restrict : 'AE',
            replace : true,
            scope : {
                formlayouturl : "=",
                vm : "=",
                items : "="
            },
            require : '^?formLayout',
            //priority: 500,
            controller : function ($scope, $compile) {
                var tmplObj = formLayout;
                var options = $scope.options = [];
                var tp = '';
                function reloadElem (elem, itemsKey, itemsVal) {
                    tp += tmplObj[itemsVal.attr.type].replace(/{{itemsKey}}/g, itemsKey).replace(/#labeltext#/, itemsVal.labeltext);
                }

                this.compileLayout = function (elem, attr) {
                    angular.forEach($scope.items, function (itemsVal, itemsKey) {

                        if ('radio' == (itemsVal.attr.type).trim().toLowerCase()
                            || 'checkbox' == (itemsVal.attr.type).trim().toLowerCase()
                            || 'select' == (itemsVal.attr.type).trim().toLowerCase()){
                            var arr = [];
                            options[itemsKey] = itemsVal.attr.option;
                            $scope.vm[itemsKey] = arr; //itemsVal.attr.value;

                        }else{
                            $scope.vm[itemsKey] = itemsVal.attr.value;
                        }
                        reloadElem(elem, itemsKey, itemsVal);
                    });
                };

                /**
                 * 将渲染后的模板重新编译到 dom 元素中
                 * @param elem
                 */
                this.compileElem  = function (elem) {
                    var el = $compile(tp)($scope);
                    elem.append(el);
                }
            },

            link : function (scope, elem, attr, ctrl) {
                $http.get(scope.formlayouturl).success(function (successData, status, hraders, config) {
                    if (!successData.code){
                        scope.items = successData.data;
                        ctrl.compileLayout(elem, attr);
                        ctrl.compileElem(elem);
                    }else{
                        throw '获取数据失败';
                    }
                });

            }
       }
    }]);
