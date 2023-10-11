var express = require('express');
var router = express.Router();

/* 도서검색 페이지 출력하기 위한 라우터 */
router.get('/', function(req, res, next) {
  res.render('index', {title:"도서검색", pageName:"books/search.ejs"});
});

module.exports = router;