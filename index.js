// console.log("hello world");
// console.log("2 + 5 = "+ (2+5));

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const configDB = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'dbdemo',
    multipleStatements: true
};
const mysql = require("mysql");
const conn = mysql.createConnection(configDB);

app.listen(PORT, function () {
    console.log("Server is running...");
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", function (req, res) {
    res.send("hello world");
});

app.get("/api/products", function (req, res) {
    // var p = {
    //     "name" : "iphone x",
    //     "price" : 1000
    // }
    // res.send(p);
    var sql = "select * from products";
    conn.query(sql, function (err, data){
        if(err) res.send("404 not found");
        else res.send(data);
    })
});
app.get("/api/categories", function (req, res) {
    var sql = "select * from categories";
    conn.query(sql, function (err, data){
        if(err) res.send("404 not found");
        else res.send(data);
    })
});


app.get("/api/products/detail", function (req, res) {
   var id = req.query.id;
    var sql = `select * from products where id = ${id}`;
    conn.query(sql, function (err, data){
        if(err) res.send(err);
        else if(data.length >0)
            res.send(data[0]);
        else res.send ("404 not found");
    })
});

app.get("/api/products/search", function (req, res) {
    var name = req.query.name;
    var sql = `select * from products where name like '%${name}%'`;
    conn.query(sql, function (err, data){
        if(err) res.send(err);
        else if(data.length >0)
            res.send(data[0]);
        else res.send ("404 not found");
    })
});

app.get("/api/products/category", function (req, res) {
    var cat = req.query.category_id;
    var sql = `select * from products where category_id = ${cat}`;
    conn.query(sql, function (err, data){
        if(err) res.send(err);
        else if(data.length >0)
            res.send(data[0]);
        else res.send ("404 not found");
    })
});

app.get("/api/products/home", function (req, res) {
    var sql = `select * from products; select * from categories`;
        conn.query(sql,function (err,data){
            if(err) res.send(err);
            else  res.send(data);
    })
});