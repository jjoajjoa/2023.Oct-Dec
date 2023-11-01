import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Spinner, Card, Button, Tab, Tabs } from 'react-bootstrap';
import { BsBalloonHeartFill, BsBalloonHeart, BsChatRightDots } from 'react-icons/bs';
import ReviewPage from './ReviewPage';

const BookInfo = () => {

    const { bid } = useParams(); //비구조할당
    const [book, setBook] = useState("");
    const [loading, setLoading] = useState(false);

    const navi = useNavigate();
    const location = useLocation();

    const getBook = async () => {
        setLoading(true);
        const res =await axios(`/books/read/${bid}?uid=${sessionStorage.getItem("uid")}`);
        console.log(res.data);
        setBook(res.data);
        setLoading(false);
    }

    const onClickHeart = async (bid) => {
        if (sessionStorage.getItem("uid")) {
            await axios.post('/books/insert/favorite', { uid: sessionStorage.getItem("uid"), bid: bid });
            getBook();
        } else {
            sessionStorage.setItem("target", location.pathname);
            navi('/users/login');
        }
    }

    const onClickFillHeart = async (bid) => {
        await axios.post('/books/delete/favorite', { uid: sessionStorage.getItem("uid"), bid: bid });
        getBook();
    }


    useEffect(() => { getBook(); }, [])

    if(loading) return <div className='text-center my-5'><Spinner variant='warning'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'> 도서 정보</h1>
            <Card className='p-3'>
                <Card.Body>
                    <Row>
                        <Col xs lg={3} className='align-self-center'><img src={book.image} width="90%"/></Col>
                        <Col>
                            <div>
                                <span className='heart'>
                                    {book.ucnt === 0 ? <BsBalloonHeart onClick={() => onClickHeart(book.bid)} />
                                        : <BsBalloonHeartFill onClick={() => onClickFillHeart(book.bid)} />}
                                </span>
                                <span className='ms-1 fcnt'>{book.fcnt}</span>
                                <span>
                                    <span className='ms-2'><BsChatRightDots /></span>
                                    <span className='ms-1'>{book.rcnt} </span>
                                </span>
                                <h1>{book.title}</h1>
                            </div>
                            <hr/>
                            <h4>[저자] {book.authors}</h4>
                            <h4>[가격] {book.fmtprice}원</h4>
                            <h4>[출판사] {book.publisher}</h4>
                            <h4>[등록일] {book.fmtdate}</h4>
                            <h4>[ISBN] {book.isbn}</h4>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <div className='text-center p-2'>
                        <Button className='mx-3' variant='warning'>장바구니</Button>
                        <Button variant='success'>바로구매</Button>
                    </div>
                </Card.Footer>
            </Card>

            <div className='my-5'>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3" >
                    <Tab eventKey="home" title="상세설명">
                        {book.contents}···
                    </Tab>
                    <Tab eventKey="profile" title="리뷰">
                        <ReviewPage location={location} setBook={setBook} book={book} />
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default BookInfo