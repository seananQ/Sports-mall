/**
 * Created by hxsd on 2016/6/2.
 */
// 创建一个新的模块mycart
var mycart = angular.module("myCart",[]);

// 在这个模块中，创建一个单例的购物车对象
// 创建这样的service，有三个方法：service,provider,factory
// 其中，factory是一个工厂方法
angular.module("myCart").factory("shopCart",function(){

    var cart = [];  // 相当于购物车中的购物筐

    // 返回一个对象-购物车
    return {
        // 定义一个方法/函数，向购物车中增加商品
        add: function(product){
            var flag = false;   // 标志变量

            // 先判断购物车中，是否有该商品
            for(var index=0;index<cart.length;index++){
                // 按商品的名称进行比较
                if(cart[index].product.name == product.name){
                    flag = true;
                    // 如果找到了，则修改该item对象中的number值所代表的数量(++)
                    cart[index].number++;
                    break;
                }
            }

            // 如果没有，创建一个item对象，然后将该item添加到购物筐数组中
            if(!flag){
                var item = {};
                item.product = product;
                item.number = 1;
                // 将该item放入购物筐
                cart.push(item);
            }
        },

        // 定义一个方法：从购物车中删除指定的商品-按名称
        remove: function(name){
            // 遍历购物筐，找到要删除的元素，从数组当中移除
            for(var index=0;index<cart.length;index++){
                if(cart[index].product.name == name){
                    cart.splice(index,1);
                    break;
                }
            }
        },

        // 按名称查询购物车中指定商品的信息 --
        find: function(name){},

        // 查询购物车中所有商品的方法
        findAll: function(){
            return cart;
        },

        // 清空购物车
        clear: function(){
            cart.length = 0;
        }
    };
});

// 在这个模块中，再定义一个控制器(MVC - C-... V-.html M-购物车中的数据)
// 分析：这个控制器要提供两个方法：1)获取购物车中商品的数量；2)获取购物车中商品的总金额；
angular.module("myCart").controller("cartController",function($scope,shopCart){
    // 拿到购物车中所有的商品信息
    var cart = shopCart.findAll();

    // 方法一：获取购物车中商品的数量
    $scope.countTotal = function(){
        var total = 0;      // 保存商品的总数量

        // 遍历cart数组，统计商品总数量
        for(var i=0;i<cart.length;i++){
            total += cart[i].number;
        }
        return total;
    };

    // 方法二：获取购物车中商品的总金额
    $scope.moneyTotal = function(){
        var total = 0;      // 保存商品的总金额

        // 遍历cart数组，统计商品总金额
        for(var i=0;i<cart.length;i++){
            total += cart[i].product.price * cart[i].number;
        }
        return total;
    };
});