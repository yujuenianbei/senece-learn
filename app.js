var plugin = function(option){
    var seneca = this;
    // 添加产品
    seneca.add({area:'product',action:'add'},function(args,done){
        // var products= this.make("products");
        // products.name = "name";
        // products.price = 1111;
        // products.save$(function(err,product){
        //     done(err,products.data$(false));
        // })
            // 新增
        var apple = seneca.make$('products')
        apple.name  = 'Pink Lady'
        apple.price = 1.99
        apple.save$(function(err,apple){
        if( err ) return console.log(err);
        console.log( "apple = "+apple  )
        })
    })
    // 获取所有列表
    seneca.add({area:"product",action:"fetch"},function(args,done){
        var products = this.make("products");
        products.list$({},done);
    })
}

module.exports = plugin;

var seneca = require("seneca")();
seneca.use(plugin);
seneca.use("mongo-store",{
    name:"seneca",
    host:"127.0.0.1",
    port:"27017"
});

seneca.ready(function(err){
    seneca.act('role:web',{use:{
        prefix:'/products',
        pin:{area:'product',action:'*'},
        map:{
            fetch:{GET:true},
            add:{POST:true}
        }
    }});
    var express = require('express');
    var app = express();
    app.use(require("body-parser").json());

    // seneca和express集成
    app.use(seneca.export('web'));
    app.listen(3000);
})