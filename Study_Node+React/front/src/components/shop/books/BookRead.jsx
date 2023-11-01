import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Row, Col, Spinner, Card, Button } from 'react-bootstrap';

const BookRead = () => {
    const ref_file = useRef(null);
    const [loading, setLoading] = useState(false);

    const { bid } = useParams(); //비구조할당
    const [book, setBook] = useState({
        bid: "",
        title: "",
        authors: "",
        price: "",
        fmtprice: "",
        contents: "",
        publisher: "",
        image: "", //파일이름
        isbn: "",
        regdate: "",
        fmtdate: "",
        file: null, //진짜파일
        fcnt: 0,
        ucnt: 0,
        rcnt: 0
    })
    const { file, title, authors, price, fmtprice, contents, publisher, image, isbn, regdate, fmtdate,
        fcnt, ucnt, rcnt} = book; //비구조할당

    const getBook = async () => {
        setLoading(true);
        const res = await axios.get("/books/read/" + bid);
        setBook(res.data);
        setLoading(false);
    };
    useEffect(() => { getBook(); }, [])

    const onChageFile = (e) => {
        setBook({
            ...book,
            image: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        });
    };

    const onUpdateImage = async () => {
        if (!file) {
            alert("변경할 이미지를 선택하세욧!");
        } else {
            if (window.confirm("이미지를 변경하시겟슴까?")) {
                const formData = new FormData();
                formData.append("file", file) //"file"이 백에서 받는거
                formData.append("bid", bid);
                const res = await axios.post("/books/update/image", formData);
                if(res.data===0) {
                    alert("이미지 변경 실패 ㅜㅜ");
                } else {
                    alert("이미지 변경 성공!!!");
                    getBook();
                };
            };
        };
    };

    if (loading) return <div className='text-center my-5'><Spinner variant='danger' /></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서 정보</h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <Card className='p-3'>
                        <Row>
                            <Col md={3}>
                                <div className='mt-1'>
                                    <img onClick={() => ref_file.current.click()}
                                        src={image || "http://via.placeholder.com/170x250"}
                                        width="100%" className='bookPhoto' />
                                    <input ref={ref_file} type='file' onChange={onChageFile} style={{ display: "none" }} />
                                </div>
                                <Button onClick={onUpdateImage} size='sm mt-2 w-100'>이미지 수정</Button>
                            </Col>
                            <Col className='px-3'>
                                <h3>{title}</h3>
                                <hr />
                                <div>[저　자] {authors}</div>
                                <div>[출판사] {publisher}</div>
                                <div>[ISBN] {isbn}</div>
                                <div>[가　격] {fmtprice}원</div>
                                <div>[등록일] {fmtdate}</div>
                                <hr/>
                                <div> [ucnt] {ucnt} </div>
                                <div> [fcnt, 총좋아수] {fcnt} </div>
                                <div> [rcnt, 총댓글수] {rcnt} </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                                <div>{contents}···</div>
                            </Col>
                        </Row>
                        <div className='text-center my-3'>
                            <NavLink to={`/books/update/${bid}`}><Button className='ms-3' size='sm'>정보수정</Button></NavLink>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default BookRead