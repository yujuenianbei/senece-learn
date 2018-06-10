var seneca = require("seneca")();

seneca.add('role:api,cmd:do',function(args,done){
    done(null,{bar:'test'});
});
seneca.act({role:'web'},{use:{
    prefix:'/myapi',
    pin:{role:'api',cmd:'*'},
    map:{
        do:{GET:true}
    }
}})
var express = require('express')
var app =express();
app.use(seneca.export('web'))
app.listen(3000)
