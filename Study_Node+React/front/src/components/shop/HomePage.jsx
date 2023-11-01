import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Spinner, Card, Form, InputGroup, Button } from 'react-bootstrap';
import { BsBalloonHeartFill, BsBalloonHeart } from 'react-icons/bs';
import { BsChatRightDots } from 'react-icons/bs';
import Pagination from "react-js-pagination";
import './Pagination.css';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const location = useLocation();
    const navi = useNavigate();
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const path = location.pathname;

    const [query, setQurery] = useState(search.get("query") ? search.get("query") : "");

    const getBooks = async () => {
        const url = `/books/list.json?query=${query}&page=${page}&size=6&uid=${sessionStorage.getItem("uid")}`;
        setLoading(true);
        const res = await axios(url);
        setBooks(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(() => { getBooks(); }, [location]);

    const onChangePage = (page) => {
        navi(`${path}?query=${query}&page=${page}`)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`${path}?query=${query}&page=${page}`)
    }

    const onClickHeart = async (bid, e) => {
        e.preventDefault();
        if (sessionStorage.getItem("uid")) {
            await axios.post("/books/insert/favorite",
                { uid: sessionStorage.getItem("uid"), bid: bid });
            getBooks();
        } else {
            navi("/users/login");
        };
    };

    const onClickFillHeart = async (bid) => {
        await axios.post("/books/delete/favorite",
            { uid: sessionStorage.getItem("uid"), bid: bid });
        getBooks();
    };

    if (loading) return <div className='text-center my-5'><Spinner variant='danger' /></div>
    return (
        <div className='my-5'>
            <Row>
                <Col>
                    <Form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control onChange={(e) => setQurery(e.target.value)}
                                value={query} placeholder='제목, 저자, 내용' />
                            <Button> 검색~ </Button>
                        </InputGroup>
                    </Form>
                </Col>
                <Col className='mb-3'> 총 {total} 건 </Col>
            </Row>
            <Row>
                {books.map(book =>
                    <Col xm={6} md={4} lg={2} className='my-2' key={book.bid}>
                        <Card>
                            <Card.Body>
                                <NavLink to={`/books/info/${book.bid}`}>
                                    <img src={book.image || "http://via.placeholder.com/170x250"} width="90%" />
                                </NavLink>
                                <div className='ellipsis'>{book.title}</div>
                            </Card.Body>
                            <Card.Footer>
                                <small className='heart'>
                                    {book.ucnt === 0 ?
                                        <BsBalloonHeart onClick={(e) => onClickHeart(book.bid, e)} />
                                        :
                                        <BsBalloonHeartFill onClick={() => onClickFillHeart(book.bid)} />
                                    }
                                    <span className='ms-1'>{book.fcnt}</span>
                                </small>

                                {book.rcnt === 0 ||
                                    <span className='ms-3'>
                                        <BsChatRightDots />
                                        <small className='ms-2'>{book.rcnt}</small>
                                    </span>
                                }
                            </Card.Footer>
                        </Card>
                    </Col>
                )}
            </Row>
            {total > 6 &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={6}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={onChangePage} />
            }
        </div>
    )
}

export default HomePage