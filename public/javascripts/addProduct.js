$(function(){
//确定点击事件
var name = "";
var num = "";
var price = "";
var scheck = "false";
$(".scheck").click(function(){
             if($(".scheck").prop("checked",true)){
		scheck = 'true';
              }
})
var jcheck="false";
$(".jcheck").click(function(){
	if($(".jcheck").prop("checked",true)){
		jcheck = 'true';
	}
})
var xcheck = "false";
$(".xcheck").click(function(){
            if($(".xcheck").prop("checked",true)){
		xcheck = 'true';
	}
})
var rcheck = "false";
$(".rcheck").click(function(){
	         if($(".rcheck").prop("checked",true)){
		rcheck = 'true';
	          }
	})
var inventory = 0;
var virtualSale = 0;
$(".subSuer").click(function(){
	//商品名
	name = $(".pName").val();
	console.log("商品名"+name);
	//商品货号
	 num = $(".pNum").val();
	console.log("货号"+num);
	//价格
	price = $(".pPrice").val();
	console.log("价格" + price);
	//是否上架
	// scheck = 'false';
	// console.log("上架" + scheck);
	//是否是精品
	// jcheck = 'false';
	//是否新品
	// xcheck = 'false'
	// console.log(xcheck);
	//是否热销
	// rcheck = 'false';
	// console.log("热销" + rcheck);
	//库存
	inventory =$(".inventory").val();
	console.log("库存" + inventory)
	//虚拟销量
	 virtualSale = $(".virtualSale").val();
	console.log("虚拟销量" + virtualSale);
	ajax();
})
//点击事件
$("#box>ul>li").each(function(index,value){
	$(this).click(function(){
//		console.log(index);
//		console.log($("#box .subPage"));
		$("#box .subPage").eq(index).css("display","block");
		$("#box .subPage").eq(index).siblings().css("display","none")
		$(this).css("background","white");
		$(this).children("a").css({
			"color":"#192e32",
			"font-size":"12px",
			"font-weight" : "bold"
		}),
		$(this).siblings().css("background","#efefef");
		$(this).siblings().children("a").css({
			"color":"#787878",
			"font-weight":"normal",
			"font-size" : "14px"
		})
	})
});
var sort =0;
function ajax(){
	$.ajax({
		url:"addAction",
		type:"post",
		data:{
			//商品名
			name:name,
			//货号
			num:num,
			//价格
			price:price,
			//是否上架
			scheck:scheck,
			//是否精品
			jcheck:jcheck,
			//是否新品
			xcheck:xcheck,
			//是否热销
			rcheck:rcheck,
			//推荐排序
			sort:100,
			//库存
			inventory:inventory,
			//虚拟销量
			virtualSale:virtualSale,
			//标志
			flag:"on"
		},
		success:function(res){
			console.log(res);
		}
	})
}
})