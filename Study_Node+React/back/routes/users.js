var express = require('express');
var router = express.Router();

var db = require("../db");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//로그인 체크
router.post("/login", function (req, res) {
    const uid = req.body.uid;
    const upass = req.body.upass;
    const sql = 'select * from users where uid=?';

    db.get().query(sql, [uid], function (err, rows) {
        if (rows.length > 0) {
            if (rows[0].upass == upass) {
                res.send("1");
            } else {
                res.send("2");
            }
        } else {
            res.send("0");
        };
    });
});

//사용자 정보 읽기
router.get("/read/:uid", function(req, res) { //localhost:5000/users/read/red
    const uid = req.params.uid;
    const sql = 'select *, date_format(regdate, "%Y년%m월%d일 %T") fmtdate, date_format(modidate, "%Y년%m월%d일 %T") fmtmodi from users where uid=?';
    db.get().query(sql, [uid], function(err, rows) {
        res.send(rows[0])
    });
});

//사용자 정보 수정
router.post("/update", function(req, res) {
    const uname = req.body.uname;
    const phone = req.body.phone;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const uid = req.body.uid;
    const sql = 'update users set uname=?, phone=?, address1=?, address2=?, modidate=now() where uid=?';
    db.get().query(sql, [uname, phone, address1, address2, uid], function(err, rows) {
        if(err) {
            res.send("0");
        } else {
            res.send("1");
        };
    });
});

module.exports = router;
