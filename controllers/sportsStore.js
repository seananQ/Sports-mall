/**
 * Created by hxsd on 2016/6/1.
 */
// 向主模块注册一个控制器
// 注意：这里是引用已经创建好的模块，所以不要使用[]
angular.module("myapp")
    .constant("categoriesUrl", "categories.json")    // 定义URL常量
    .constant("productsUrl", "products.json")    // 定义URL常量
    .constant("orderUrl", "order2.json")    // 定义URL常量
    .controller("sportsStoreCtrl", function ($scope, $http,$location, categoriesUrl, productsUrl, orderUrl, shopCart) {
        // 准备商品的模拟数据 - 包含商品分类和商品明细
        $scope.data = {};
        $scope.data.shipping = {}; // 这个对象用来保存收货人信息

        // http请求服务器端商品数据
        $http.get(categoriesUrl).success(function (responseData) {
            $scope.data.categories = responseData;
        });

        $http.get(productsUrl).success(function (responseData) {
            $scope.data.products = responseData;
        });

        // 发送订单的方法。发送的内容有两部分组成：
        // 1) 购物车中的商品信息; 2)用户的收货信息；
        $scope.sendOrder = function () {
            var order = angular.copy($scope.data.shipping);   // 拷贝数据
            order.products = shopCart.findAll();

            $http.post(orderUrl, order)     // promise
                .success(function (responseData) {
                    // 存储订单号
                    $scope.data.shipping.orderId = responseData.orderId;
                    // 清空购物车
                    shopCart.findAll().length = 0;
                })
                .error(function (err,status) {
                    // 存储错误信息
                    $scope.data.shipping.orderError = status;
                })
                .finally(function(){
                    // 跳转到thankYou.html页面
                    $location.path("complete");
                });
        };

        // 将商品加入购物车
        $scope.addToCart = function (product) {
            shopCart.add(product);
        };
    });