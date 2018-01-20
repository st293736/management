$(function(){
	var pageNums = $(".pageNum option:checked").text();
	var keyword = "";
		ajax();
		$(".num").change(function(){
			// console.log($(".num").val());
		//更改每一页后加载
		$("tr:gt(0)").remove();
	      	ajax();
		})
		//第一页的点击事件
		$(".firstPage").click(function(){
			//当前显示出的在哪一页
			$("tr:gt(0)").remove();
			pageNums = 1;
			$(".pageNum option").eq(0).attr("selected");
			$(".pageNum option:gt(0)").attr("selected","");
			ajax();
		})
		//末页的点击事件
		$(".end").click(function(){
			$("tr:gt(0)").remove();
			pageNums = $(".pageNum option").length;
			ajax();
		})

		//select的改变事件
		$("select").change(function(){
			$("tr:gt(0)").remove();
			pageNums = $(".pageNum option:checked").text();
			$(".rank").html(pageNums);
			// console.log(pageNum);
			ajax();
		})
		//上一页的点击事件
		$(".up").click(function(){
			pageNums = parseInt($(".rank").html()) - 1;
			console.log(pageNums);
			// console.log(parseInt($(".pageNum option:checked").text()) - 1);
			/*var pagea = pageNums + 1
			if(pagea == 1){
				pagea = 0
			}else{
				pagea -= 2;
			}*/
			/*$(".pageNum option").eq(pageNums).removeAttr("selected");
			$(".pageNum option").eq(pageNums-1).siblings().attr("selected",true);*/
			$(".pageNum option").eq(pageNums - 1).attr("selected","selected");
			$(".pageNum option").eq(pageNums).attr("selected","");
			$("tr:gt(0)").remove();
			$(".rank").html(pageNum);
			ajax();
		})
		//下一页点击事件
		$(".down").click(function(){
			$("tr:gt(0)").remove();
			pageNums = parseInt($(".pageNum").val()) + 1;
			// console.log(parseInt($(".pageNum option:checked").text()) + 1);
			 $(".pageNum option").eq(pageNums - 1).attr("selected",true);
			/*$(".pageNum option:checked").removeAttr("selected");
			$(".pageNum option:checked").attr("selected","selected");*/
			// console.log(pageNums);
			$(".pageNum option").eq(pageNums - 1 ).siblings().attr("selected",false);
			$(".rank").html(pageNum);
			ajax();	
		})
		//关键字搜索
		$(".btn").click(function(){
			$("tr:gt(0)").remove();
			pageNum = 1;
			keyword = $("#part").val();
			// console.log(keyword);
			ajax();
		})
		//点击编辑按钮
		$(".edit").each(function(index,value){
			$(this).click(function(){
				// alert(index);
			});
		})
		var str = "";
		var pdName = "";
		//点击删除按钮
		$(".trash").each(function(index,value){
			$(this).click(function(){
				$(this).parents("tr").remove();
				 pdName = $(this).parent("td").siblings("td:eq(1)").html();
				ajax();
			})	
		})
	function ajax(){
		$.ajax({	
			url:"/ListAction",
			type:"post",
			async : false,
			data:{
					//删除时的编号
					// strNum:str,
					//被删除商品的名字
					pdName:pdName,
					//关键字
					name : keyword,
					//每一页显示的个数
					rank : $(".num").val(),
					//选择的页数
					pageNum : pageNums
				},
				success:function(res){
					console.log(res);
					$(".rank").html(res.pageNum);
					tr(res);
					$("num").val(res.rank);
				//显示页面数据
					// console.log(res.total);
					//计算页数
					pageNum = Math.ceil(res.total / parseInt($(".num").val()));
					// console.log(pageNum)
					//获取当前option 的个数
					var option = $(".pageNum option").length;
					  // console.log(option);
					var len = pageNum - 1;
					// console.log(pageNum,option);
					if(pageNum > option){
					         for(var i = option + 1;i <=pageNum; i++){
					         	// console.log(pageNum);
					         	var ops = $("<option>");
					         	$(ops).attr("value",i);
					         	$(ops).text(i);
					         	$(".pageNum").append(ops);
					         }
					}else{
						// console.log(len);
						// console.log($(".pageNum option:gt("+len+")");
						$(".pageNum option:gt("+len+")").remove();
					}
					$(".total").html(res.total);
					$(".page").html(pageNum);
				}
			})
	}
	function tr(res){
		// console.log(res.data[0].goodsSale);
		var arr = res.data;
		// console.log(arr);
		var len = res.data.length;
		for(var i = 0; i < len;i ++){
			var str = `<tr class = "items">
					<td><input type="checkbox"/><span class="IdNum">`+ i +`</span></td>
					<td>${arr[i].goodsName}</td>
					<td>${arr[i].goodsNum}</td>
					<td>${arr[i].goodsPrice}</td>
					<td class="judg">${arr[i].goodsRack}</td>
					<td class="judg">${arr[i].goodsFine}</td>
					<td class="judg">${arr[i].goodsNew}</td>
					<td class="judg">${arr[i].goodsSale}</td>
					<td>${arr[i].goodsRank}</td>
					<td>${arr[i].goodsCount}</td>
					<td>${arr[i].goodsAcura}</td>
					<td>
						<a href="#"><img src="../images/icon_view.gif"/></a>
						<a href="#" class = "edit"><img src="../images/icon_edit.gif"/></a>
						<a href="#"><img src="../images/icon_copy.gif"/></a>
						<a href="#" class="trash"><img src="../images/icon_trash.gif"/></a>
					</td>
				</tr>`
			$(".datas").append(str);
		}
		$(".judg").each(function(index,value){
			// console.log($(".judg").html())
			// console.log(typeof $(".judg").html());				
			var img = $("<img/>");
			if($(this).html() == "true"){
				$(this).html("");
				$(img).attr("src",'../images/yes.gif');
			}else{
				$(this).html("");
				$(img).attr("src",'../images/no.gif');
			}
			$(this).append(img);
		})
	}

})