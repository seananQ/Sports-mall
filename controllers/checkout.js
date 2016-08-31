/**
 * Created by hxsd on 2016/6/2.
 */
angular.module("checkout",[])
    .controller("ckController",function($scope,shopCart){
    $scope.cart = shopCart.findAll();   // cart数据，所有商品信息

    // 计算总金额
    $scope.moneyTotal = function(){
        var total = 0;      // 保存商品的总金额

        // 遍历cart数组，统计商品总金额
        for(var i=0;i<$scope.cart.length;i++){
            total += $scope.cart[i].product.price * $scope.cart[i].number;
        }
        return total;
    };

    // 删除一条记录
    $scope.remove = function(item){
        shopCart.remove(item.product.name); // 根据名称删除商品
    };
});