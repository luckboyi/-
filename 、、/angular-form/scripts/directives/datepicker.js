/**
 * 自定义日历组件
 * 此组件依赖ui.bootstrap组件
 * @author yangyulong
 * @date 2015.12.22
 */

/**
 * 使用方法：
 * 将<hxsd-datepicker picker="datepickerjkhdtime" values="hxsd.jkhdtime"></hxsd-datepicker>嵌入到所需要的html文件中
 * datepickerjkhdtime 的值是您在设置的配置参数（具体的配置参数可以参考以下源代码）
 * values="hxsd.jkhdtime" 中values是此指令绑定到项目中的参数，hxsd.jkhdtime参数可以根据具体的项目中的命名需求更改
 * 此插件不支持日期过滤器（由于ui-bootstrap不支持）
 * @param  {[type]} 'hxsd.datepicker' [description]
 * @param  {[type]} ['ui.bootstrap']  [description]
 * @return {[type]}                   [description]
 */
angular.module('hxsd.datepicker', ['ui.bootstrap'])
    //指令
    .directive('hxsdDatepicker', function ($filter) {
        return {
            //日历的内部scope
            scope : {
                picker:'=picker',
                dt:'=values'
            },
            restrict : 'AE',
            replace : true,
            templateUrl : './tmpl/datepicker.html',
            controller : 'datepickerctrl',
            link : function (scope, elem, attrs) {
                //定义一些事件的绑定
                // console.log(attrs);
               
            }
        }
    })
    //控制器
    .controller('datepickerctrl', ['$scope','$filter', function($scope, $filter){
        console.log($scope.picker);
        //这里统一配置日历插件的参数
        var pickerConfig = $scope.pickerConfig = {};

        //设置日历组件默认不展开
        pickerConfig.status = {
           opened: false
        };
        //日历图标打开事件
        pickerConfig.open = function(){
            pickerConfig.status = {
                opened : true
            };
        };
        //默认将不显示时间图标
        pickerConfig.showtimetext = false;
        //传入自定义的样式类 
        pickerConfig.customClass = null;

        //点击清楚按钮后将选择的时间清空
        pickerConfig.clear = function(){
            pickerConfig.dt = null;
        };

        // 是否显示周末
        if(!pickerConfig.isShowWeeks){
            pickerConfig.show = {
                weeks:true
            }
        }else{
            pickerConfig.show = {
                weeks:false
            }
        }

        // 是否允许选择周末
        if(pickerConfig.isSelectWeekend){
            pickerConfig.disabled = function(date, mode) {
               return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
               // return false;
            };
        };

        // 设定日历组件最小的可以选择的时间
        pickerConfig.minDate = '1970-1-1';
        pickerConfig.toggleMin = function() {
           pickerConfig.minDate = pickerConfig.minDate ? null : new Date();
        };

        // 设定日历组件最大的可以选择的时间
        pickerConfig.maxDate = '2020-12-31';
        pickerConfig.toggleMax = function(){
            pickerConfig.maxDate = pickerConfig.maxDate ? pickerConfig.maxDate : new Date();
        }

        //设置日期的格式化
        pickerConfig.dateOptions = {
           formatYear: 'yyyy',
           startingDay: 1,
           formatDayTitle: 'yyyy-MM-dd'
        };
        //设置时间格式
        pickerConfig.formats = ['yyyy-MM-dd', 'YYYY/MM/DD', 'YYYY.DD.MM', 'shortDate'];
        pickerConfig.format = pickerConfig.formats[0];

        //汉化部分按钮的文字
        pickerConfig.closeText = '关闭';
        pickerConfig.currentText = '今天';
        pickerConfig.clearText = '清除';

        //初始化日历的时间
        pickerConfig.dt = new Date();
        pickerConfig.setDate = function(year, month, day) {
            pickerConfig.dt = new Date(year, month, day);
        };

        $scope.dt = $filter('date')(pickerConfig.dt, 'yyyy-MM-dd');
        //将用户传递的配置文件和默认的配置文件合并
        angular.extend(pickerConfig, $scope.picker);
    }]);
