var express = require('express');
var router = express.Router();
var adminModel = require("../model/admin");
var goodsModel = require("../model/goods");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//登录页面
router.get('/login', function(req, res, next) {
  res.render('login', {});
});
router.get('/home', function(req, res, next) {
  res.render('home', {});
});
router.get('/subIndex1', function(req, res, next) {
  res.render('subIndex1', {});
});
router.get('/productList', function(req, res, next) {
  res.render('productList', {});
});
router.get('/addProduct', function(req, res, next) {
  res.render('addProduct', {});
});
router.get('/error', function(req, res, next) {
  if(req.session == null || req.session.username == null){
            res.redirect("/login.ejs");
  }
  res.render('error', {});
});

router.post('/ListAction', function(req, res, next) {
            //关键字
            var name = req.body.name;
            console.log(name);
            //被删除商品的名字
            var pdName = req.body.pdName;
            //每页显示的个数
            var rank = req.body.rank || 5;
            rank = parseInt(rank);
            // console.log(rank);
            //选择的页数
            var pageNum = req.body.pageNum || 10;
            pageNum = parseInt(pageNum);
            // console.log(pageNum);
          //遍历数据查看有多少条数据
          goodsModel.count({flag:"on"},function(err,count){
                  // console.log(count);
                  // console.log(name);
                  
                  goodsModel.update({goodsName:pdName},{$set:{flag:"off"}},function(){

                           var query = goodsModel.find({goodsName:{$regex:name},flag:"on"}).skip((pageNum - 1) * (rank)).limit(rank);
                     	query.exec(function (err,docs2){
                            //docs2[0].flag = "off";
                            //console.log(docs2[0].flag);
                            var result3 = {
                                  total : count,
                                  data : docs2,
                                  rank : rank,
                                  pageNum : pageNum
                            };
                            res.json(result3);
                    })
              })
                 
          })
});
//添加商品
router.post('/addAction', function(req, res, next) {
        //商品名
      var name = req.body.name;
      console.log(name);
      //货号
      var num=req.body.num;
      console.log(num);
      //价格
      var price=req.body.price;
      console.log(price);
      //是否上架
      var scheck=req.body.scheck;
      console.log(scheck);
      //是否精品
      var jcheck=req.body.jcheck;
      console.log(jcheck);
      //是否新品
      var xcheck=req.body.xcheck;
      console.log(xcheck);
      //是否热销
      var rcheck=req.body.rcheck;
      console.log(rcheck);
      //推荐排序
      var sort = req.body.sort;
      console.log(sort);
      //库存
      var inventory=req.body.inventory;
      console.log(inventory);
      //虚拟销量
      var virtualSale = req.body.virtualSale;
      console.log(virtualSale);
      //标志位
      var flag = req.body.flag;
      console.log(flag);
      var result = {
             code : 200,
             message:"商品信息保存成功"
      }
      var gm= new goodsModel();
      gm.goodsName = name;
      gm.goodsNum = num;
      gm.goodsPrice = price;
      gm.goodsRack = scheck;
      gm.goodsFine = jcheck;
      gm.goodsNew = xcheck;
      gm.goodsSale = rcheck;
      gm.goodsRank = sort;
      gm.goodsCount = inventory;
      gm.goodsAcura = virtualSale;
      gm.flag = flag;
      gm.save(function(err){
          if(err){
            result.code = -109;
            res.message = "商品信息保存失败";
          }
          res.json(result);
      })
})
//获取管理员登录信息
router.post('/loginAction', function(req, res, next) {
       var username = req.body.username;
       var pwd = req.body.pwd;
       console.log(req.body.username);
       console.log(req.body.pwd);
       var result = {
       	code:1,
       	message:"接收到登录信息"
       };
       adminModel.find({username:username,pwd:pwd},function(err,docs){
       	if(docs.length <= 0){
       		result.code = -109;
       		result.message = "该用户未注册";
       	}else{
                      req.session.username = username;
              }
       	res.json(result);
       })
});
//跳转到主页
router.get('/index', function(req, res, next) {
  res.render('index', {});
});
module.exports = router;
