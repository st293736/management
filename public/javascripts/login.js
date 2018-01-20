//验证码62
code();
function code(){
	var str = "abcdefjhigklmnopqrstuvwxyzABCDEFJHIGKLMNOPQRSTUVWXYZ0123456789";
	var str1 = "";
	for(var i = 0;i < 4;i ++){
		var num = Math.floor(Math.random() * 61);
		str1 += str.charAt(num);
	}
	$(".codeImg").html(str1);
	return str1;
}
$(".codeImg").click(function(){
	code();
})
var str2 = code().toUpperCase();
//验证登录
var onoff = false;
$(".btn").click(function(){
	/*console.log(str2);
	console.log($("#code").val().toUpperCase());*/
	if($("#username").val() =="" && $("#code").val() == ""){
		// console.log($("#username").val());
		// console.log($("#code").val());
		alert("管理员账号或验证码不能为空");
		onoff = false;
	}else if($("#username").val() ==""){
		// console.log($("#username").val());
		alert("管理员账号不能为空");
		// onoff = false;
	}else if($("#code").val().toUpperCase() != str2){
		
		if($("#code").val().toUpperCase() == ""){
			onoff = false;
			alert("验证码不能为空");
		}else{
			onoff = false;
			alert("验证码输入错误");
			str2 = code().toUpperCase();
		}
	}else{
		onoff = true;
		if(onoff == true){
			// location.href = "index";
		}
	}
})
//保存登录信息
var use = "";
$("#save").click(function(){
	if($(this).prop("checked")){
		use += $("#username").val() + ":" + $("#pwd").val();
		$.cookie("userMes",use,{expires:7,path:"/"});
//		console.log(use);
	}
})
