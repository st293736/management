
$(".nav1 li").each(function(index,value){
	$(this).on({
		"mouseover" : function(){
			$(this).css("background","#404040");
		},
		"mouseout" : function(){
			$(this).css("background","#303030");
		}
	})
})
$(".nav2 li").each(function(){
	$(this).on({
		"mouseover" : function(){
			$(this).css("background","#454545");
		},
		"mouseout" : function(){
			$(this).css("background","#575757");
		}
	})
})
$(".list-sun li").each(function(){
	$(this).on({
		"mouseenter" : function(){
			$(this).css("backgroundColor","#454545");
		},
		"mouseleave" : function(){
			$(this).css("backgroundColor","#575757");
		}
	})
})
var num = 1;
$(".list-sun>li").click(function(){
		num ++;
		if(num % 2== 0){
			$(this).children(".subList").css("display","block");
			$(this).removeClass("bgY").addClass("bgN");
		}else{
			$(this).children(".subList").css("display","none");
			$(this).removeClass("bgN").addClass("bgY");
		}
		$(".subList li").each(function(){
			$(this).on({
				"mouseover" : function(){
					$(this).css("background","#797979");
					$(this).children("a").css("color","white");
				},
				"mouseout" : function(){
					$(this).css("background","#575757");
					$(this).children("a").css("color","#d7d7d7");	
				},
				"click" : function(event){
					$(this).css("background","#797979");
					$(this).children("a").css("color","white");
					event.stopPropagation();
				}
			})
		})
	})
