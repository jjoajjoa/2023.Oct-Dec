var express = require('express');
var router = express.Router();
var db = require("../db");
var multer = require("multer");
const { route } = require('.');


//도서 이미지파일 업로드함수
var upload = multer({
    storage:multer.diskStorage({
        destination:(req, file, done) => {
            done(null, './public/upload/book')
        },
        filename:(req, file, done) => {
            var fileName=Date.now() + ".jpg";
            done(null, fileName);
        }
    })
});

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
    const key = req.query.key;
    const query = '%' + req.query.query + '%';
    const sql = 'select * from books where ' + key + ' like ? order by bid desc limit ?, 5';
    db.get().query(sql, [query, start], function(err, rows) {
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
    const key = req.query.key;
    const query = '%' + req.query.query + '%';
    const sql = 'select count(*) total from books where ' + key + ' like ? ';
    db.get().query(sql, [query], function(err, rows) {
        res.send(rows[0]);
    });
});

//도서 삭제하는 //프론트쪽에서 삭제할 아이디를 이쪽으로 보내줌
router.post("/delete", function(req, res) {
    const bid = req.body.bid;
    const sql = "delete from books where bid = ?";
    db.get().query(sql, [bid], function(err, rows) {
        if(err) console.log("!!!!도서삭제: ", err);
        res.sendStatus(200);
    });
});

//도서정보 페이지 이동 (관리자용)
router.get("/read", function(req, res) {
    const bid = req.query.bid;
    //포스트에서 보내준 bid값이 여기로 넘어옴
    const sql = "select *, format(price, 0) fmtprice, date_format(regdate, '%Y-%m-%d') fmtdate from books where bid = ?";
    db.get().query(sql, [bid], function(err, rows) {
        if(err) console.log("!!!!도서정보: ", err);
        res.render("index", {title:"도서정보", pageName:"books/read.ejs", book:rows[0]});
    });
});

//도서정보 수정하는 페이지로 이동하는
router.get("/update", function(req, res) {
    const bid = req.query.bid;
    const sql = "select *, format(price, 0) fmtprice, date_format(regdate, '%Y-%m-%d') fmtdate from books where bid = ?";
    db.get().query(sql, [bid], function(err, rows) {
        if(err) console.log("!!!!도서정보: ", err);
        res.render("index", {title:"정보수정", pageName:"books/update.ejs", book:rows[0]});
    });
});

//도서정보 수정하는 DB
router.post("/update", function(req, res) {
    const bid = req.body.bid;
    const title = req.body.title;
    const price = req.body.price;
    const authors = req.body.authors;
    const publisher = req.body.publisher;
    const contents = req.body.contents;
    //console.log(bid, title, price, authors, publisher, contents);
    const sql = "update books set title=?, price=?, authors=?, publisher=?, contents=? where bid=?";
    db.get().query(sql, [title, price, authors, publisher, contents, bid], function(err, rows) {
        if(err) console.log("!!!!수정오류: ", err);
        res.redirect("/books/read?bid=" + bid);
    })
})

//도서썸네일 업로드함수
router.post("/upload", upload.single("file"), function(req, res) {
    if(req.file) {
        const bid = req.body.bid;
        //console.log("!!!!파일이름: ", req.file.filename, "  ", bid);
        const image = "/upload/book/" + req.file.filename;
        const sql = "update books set image=? where bid=?"
        db.get().query(sql, [image, bid], function(err, rows) {
            if(err) console.log("!!!!이미지업로드오류: ", err);
            res.redirect("/books/read?bid=" + bid);
        });
    }
});

//도서메인에서 정보페이지로 (사용자용)
router.get('/info', function(req, res) {
    const bid = req.query.bid;
    const sql = 'select*, format(price, 0) fmtprice, date_format(regdate, "%Y-%m-%d") fmtdate from books where bid=?';
    db.get().query(sql, [bid], function(err, rows) {
        res.render('index', {title:'도서정보', pageName:'books/info.ejs', book:rows[0]});
    });
});

//좋아용 추가
router.post('/like/insert', function(req, res){
    const bid=req.body.bid;
    const uid=req.body.uid;
    const sql='insert into favorite(bid, uid) values (?,?)';
    db.get().query(sql, [bid, uid], function(err){
        res.sendStatus(200);
    });
});

//좋아용 취소
router.get('/like/delete', function(req, res){
    const bid=req.query.bid;
    const uid=req.query.uid;
    const sql='delete from favorite where bid=? and uid=?';
    db.get().query(sql, [bid, uid], function(err){
        res.sendStatus(200);
    });
});

//조아용 총몇개인지랑 누가 눌렷는지
router.get("/like/check", function(req, res) {
    const uid = req.query.uid;
    const bid = req.query.bid;
    let sql = 'select count(*) fcnt, ';
    sql += '(select count(*) from favorite where bid=? and uid=?) ucnt '
    sql += 'from favorite where bid=?'

    db.get().query(sql, [bid, uid, bid], function(err, rows) {
        if(err) console.log("조아용체크!", err);
        res.send(rows[0]);
    });
});






module.exports = router;