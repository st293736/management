var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var goods = Schema({
	//id
	goodsId:Number,
	//商品名称
	goodsName:String,
	//商品编号
	goodsNum:String,
	//商品价格
	goodsPrice:String,
	//是否上架
	goodsRack:Boolean,
	//是否精品
	goodsFine:Boolean,
	//是否新品
	goodsNew:Boolean,
	//是否热销
	goodsSale:Boolean,
	//推荐排序
	goodsRank:Number,
	//库存
	goodsCount:Number,
	//虚拟销量
	goodsAcura:Number,
	//标志位
	flag:String,
	//时间戳
	create_Date:{type:Date,default:Date.now}
});
var goodsModel = mongoose.model("article",goods);
module.exports = goodsModel;