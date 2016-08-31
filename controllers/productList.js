/**
 * Created by hxsd on 2016/6/1.
 */
// 注册一个控制器
angular.module("myapp")
    .constant("activeClass", "btn-primary") // 定义一个常量
    .constant("pageCount",3)    // 页面大小
    // 依赖注入外部的常量
    .controller("productListCtrl", function ($scope, activeClass,pageCount) {
        var selectedCategory = null;    // 保存当前的商品类别

        // 当单击类别按钮时
        $scope.selectCategory = function (categoryName) {
            selectedCategory = categoryName;    // 保存传过来的被单击的那个类别的名称
            $scope.currentPage = 1;     // 恢复当前页码为默认1
            //alert(selectedCategory);
        };

        // 自定义一个过滤器函数 - 返回true或false
        // 函数的参数，是filter过滤的数组元素
        $scope.categoryFilter = function (item) {
            return selectedCategory == null || selectedCategory == item.category;
            //if(selectedCategory == null){
            //    // 说明选择的是"首页"按钮
            //    return true;
            //}else if(selectedCategory == item.category){
            //    // 如果当前选中的类别和当前正在过滤判断的商品的类别一致
            //    return true;    // 让这个商品显示
            //}else{
            //    return false;
            //}
        };

        // 自定义一个函数: 返回一个合适的class名称
        $scope.activeClass = function (categoryName) {
            // 如果当前的类别是被选中的类别，就返回"btn-primary"；否则，返回""
            //return selectedCategory == categoryName ? "btn-primary" : "";
            return selectedCategory == categoryName ? activeClass : "";
        };

        // 定义用于分页的变量
        $scope.currentPage = 1; // 当前页码
        $scope.pageSize = pageCount;    // 每页显示商品的数量(页面大小)

        // 分页按钮单击响应事件，参数为当前要求显示的页码数
        $scope.selectPage = function(page){
            $scope.currentPage = page;  // 将当前页面改为传过来要显示的页面
        };

        // 高亮显示 - 获取active class，参数为页码数
        $scope.activePageClass = function(page){
            return $scope.currentPage == page ? activeClass : "";
        };
    });