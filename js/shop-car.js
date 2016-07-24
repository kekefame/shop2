var goods=[
	{name:'新西兰进口苹果',price:'52',url:'./img/1.jpg'},
	{name:'新西兰绿奇异果',price:'45',url:'./img/2.jpg'},
	{name:'美国车厘子8.5R',price:'87',url:'./img/3.jpg'},
	{name:'澳大利亚橙 ',price:'24',url:'./img/4.jpg'},
	{name:'美国青蛇果',price:'25',url:'./img/5.jpg'},
	{name:'进口葡萄柚',price:'26',url:'./img/6.jpg'}
]
var app=angular.module('car',[]);
app.controller('shop',function($scope){
	$scope.goods=goods;
	$scope.buy=[];
	// 购买按钮
	$scope.buyBtn=function(i){
		var b=$scope.buy
		if (b.length>0){
			var flag=true;
			angular.forEach(b,function(obj,j){
				if ($scope.goods[i].name==obj.name)
					{
						b[j].num++;
						flag=false;
					};
			})
			if (!flag) {
				return;
			};
		};
		var o={};
		o.name=$scope.goods[i].name;
		o.price=$scope.goods[i].price;
		o.url=$scope.goods[i].url;
		o.num=1;
		$scope.buy.push(o);
	}
	// 添加
	/*$scope.add=function(i){
		$scope.buy[i].num++;
	}*/
	$scope.add=function(name){
		angular.forEach($scope.buy,function(o,i){
			if (o.name==name){
				$scope.buy[i].num++;
			}
		})
		
	}
	// 数量减
	$scope.jian=function(name){
		angular.forEach($scope.buy,function(o,i){
			if (o.name==name){
				$scope.buy[i].num--;
				if ($scope.buy[i].num<=0){
					var s=confirm('是否删除')
					if(s){
						$scope.del(i);
					}else{
						$scope.buy[i].num=0;
					}
				}
			}
		})
		
	}
	// 删除
	/*$scope.del=function(i){
		$scope.buy.splice(i,1);
	}*/
	$scope.del=function(name){
		angular.forEach($scope.buy,function(o,i){
			if (o.name==name)
			{
				$scope.buy.splice(i,1);
			}
		})
		
	}
	// 总价
	$scope.sum=function(){
		var z=0;
		angular.forEach($scope.buy,function(obj,i){
			z+=obj.num*obj.price;

		})
		return z;
	}
	// 排序
	$scope.or=false;
	$scope.order=function(key){
		$scope.or=!$scope.or;
		$scope.n=key;
	}
})



/*
ng-change
*/



/*关于总价排序问题*/
第一步:再给数据加一个sum属性
o.sum=o.price*o.num;
/*$scope.$watch('buy',function(newVal,oldVal){
	for (var i = 0; i < newVal.length; i++){
		newVal[i].sum=newVal[i].price*newVal[i].num;
	}

},true);*/


/*知识点总结
1、关于数据双向绑定检测
	$scope.aa=10; 自动变  只更新属性上面的值不对他进行操作
	$scope.bb=20; 自动变
	//注意
	$scope.cc=$scope.aa*$scope.bb 
		——不是直接修改属性而是借助于其他属性,不能自动变
			救助于$scope.$watch('检测的数据',function(newVal,oldVal){
					当数据发生变化时执行的回调函数;
			},true)

			//回调函数的第二个参数如果为true可进行深层次判断

*/