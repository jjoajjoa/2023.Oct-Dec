import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Spinner, Card, Button, InputGroup, Form } from 'react-bootstrap';

const BookUpdate = () => {
    const navi = useNavigate();
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
        image: "",
        isbn: "",
        regdate: "",
        fmtdate: ""
    })
    const { title, authors, price, fmtprice, contents, publisher, image, isbn, regdate, fmtdate } = book; //비구조할당

    const getBook = async () => {
        setLoading(true);
        const res = await axios.get("/books/read/" + bid);
        setBook(res.data);
        setLoading(false);
    }
    useEffect(() => { getBook(); }, [])

    const onChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm("수정된 내용을 저장하실거예용?")) {
            const res = await axios.post("/books/update", book);
            if (res.data === 0) {
                alert("수정실패ㅜㅜ");
            } else {
                alert("수정 완료!!");
                navi(`/books/read/${bid}`);
            };
        };
    };

    if (loading) return <div className='text-center my-5'><Spinner variant='danger' /></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서 정보 수정</h1>
            <Row className='justify-content-center'>
                <Col>
                    <Card className='p-3'>
                        <Form onSubmit={onSubmit}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>도서코드</InputGroup.Text>
                                <Form.Control value={bid} name='bid' readOnly />
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>제목</InputGroup.Text>
                                <Form.Control onChange={onChange} value={title} name='title' />
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>저자</InputGroup.Text>
                                <Form.Control onChange={onChange} value={authors} name='authors' />
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>출판사</InputGroup.Text>
                                <Form.Control onChange={onChange} value={publisher} name='publisher' />
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>가격</InputGroup.Text>
                                <Form.Control onChange={onChange} value={price} name='price' />
                            </InputGroup>
                            <Form.Control onChange={onChange} as="textarea" rows={5} name='contents'>
                                {contents}
                            </Form.Control>
                            <div className='text-center my-3'>
                                <Button type='submit' className='me-2'>수정!</Button>
                                <Button variant='secondary' onClick={() => getBook()}>취소</Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default BookUpdate