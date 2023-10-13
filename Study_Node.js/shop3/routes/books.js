var express = require('express');
var router = express.Router();

var db = require("../db");

/* 도서검색 페이지 출력하기 위한 라우터 */
router.get('/', function(req, res, next) {
    res.render('index', {title:"도서검색", pageName:"books/search.ejs"});
});

//도서검색결과저장
router.post('/search/insert', function(req, res) {
    const title = req.body.title;
    const authors = req.body.authors;
    const price = req.body.price;
    const publisher = req.body.publisher;
    const image = req.body.thumbnail;
    const contents = req.body.contents;
    const isbn = req.body.isbn;
    // console.log(title, authors, price, publisher, image, contents);

    //처음에 먼저 isbn 정보가 있는지 먼저 체크하고 없으면 추가하기
    const sql1 = "select * from books where isbn=?"
    db.get().query(sql1, [isbn], function(err, rows) {
        if (rows.length > 0) {
            res.send("1"); //isbn 값이 있을때
        } else {
            const sql = "insert into books(title, authors, price, publisher, image, contents, isbn) values(?, ?, ?, ?, ?, ?, ?)";
            db.get().query(sql, [title, authors, price, publisher, image, contents, isbn], function(err, rows) {
                if(err) console.log("!!!!도서저장오류: ", err);
                res.send("0"); 
            }); 
        }
    });
});

//도서목록 JSON 가져오는 
router.get("/list.json", function(req, res) {
    const page = req.query.page;
    const start = (parseInt(page)-1) *5;
    const sql = "select * from books order by bid desc limit ?, 5";
    db.get().query(sql, [start], function(err, rows) {
        if(err) console.log("!!!!!도서목록jon: ", err);
        res.send(rows);
    });
});

//책 간직함으로 이동하는
router.get("/list", function(req, res) {
    res.render("index", {title:"도서목록", pageName:"books/list.ejs"});
});

//보관 책 갯수를 확인하는
router.get("/count", function(req, res) {
    const sql = "select count(*) total from books"
    db.get().query(sql, function(err, rows) {
        res.send(rows[0]);
    });
});

module.exports = router;