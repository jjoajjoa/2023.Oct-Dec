var express = require('express');
var router = express.Router();
var db = require("../db");

//장바구니 등록
router.post("/insert", function(req, res) {
    const uid = req.body.uid;
    const bid = req.body.bid;

    //중복등록 안되게 하려고
    let sql = 'select count(*) cnt from cart where uid=? and bid=?';
    db.get().query(sql, [uid, bid], function(err, rows) {
        const count = rows[0].cnt;
        if(count==0) { //장바구니에 없으면 인서트
            sql = 'insert into cart(uid, bid) values(?, ?)';
            db.get().query(sql, [uid, bid], function(err) {
                res.send("0");
            });
        } else { //이미 있으면 업데이트
            sql = 'update cart set qnt=qnt+1 where uid=? and bid=?';
            db.get().query(sql, [uid, bid], function(err) {
                res.send("1");
            });
        }
    })
});

//장바구니목록페이지로
router.get("/list", function(req, res) {
    res.render("index", {title:"장바구니", pageName:"users/cart.ejs"});
});

//장바구니목록json
router.get("/list.json", function(req, res) {
    const uid = req.query.uid;
    const sql = 'select *, qnt*price as sum, format(qnt*price, 0) as fmtsum from view_cart where uid=?';
    db.get().query(sql, [uid], function(err, rows) {
        res.send(rows);
    });
});

//장바구니삭제
router.post("/delete", function(req, res) {
    const cid = req.body.cid;
    const sql = 'delete from cart where cid=?';
    db.get().query(sql, [cid], function(err, rows) {
        res.sendStatus(200);
    });
});

//수량변경됐을때
router.post("/update", function(req, res) {
    const cid = req.body.cid;
    const qnt = req.body.qnt;
    const sql = 'update cart set qnt=? where cid=?';
    db.get().query(sql, [qnt, cid], function(err, rows) {
        res.sendStatus(200);
    });
});

module.exports = router;