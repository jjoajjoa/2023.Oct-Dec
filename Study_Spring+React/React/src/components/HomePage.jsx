import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Spinner, Row, Col, Card, InputGroup, Form, Button } from 'react-bootstrap';
import "./Pagination.css";
import Pagination from 'react-js-pagination';

const HomePage = () => {
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const navi = useNavigate();

    const size = 6;
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState("");

    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const getList = async () => {
        setLoading(true);
        const res = await axios(`/shop/list.json?page=${page}&size=${size}&query=${query}`)
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`/?page=1&size=${size}&query=${query}`)
    }

    useEffect(() => { getList(); }, [location])

    if (loading) return <div className='text-center my-5'><Spinner variant='dark' /></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>홈!</h1>
            <Row className='my-5'>
                <Col>
                    <span style={{ verticalAlign: "middle" }}> 총 {total}건 </span>
                </Col>
                <Col>
                    <Form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control placeholder='상품명, 제조사' value={query}
                                onChange={(e) => setQuery(e.target.value)} />
                            <Button type='submit'>검색!</Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                {list.map(shop =>
                    <Col key={shop.pid} xs={6} md={4} lg={2} className='mb-3'>
                        <Link to={`/shop/info/${shop.pid}`}>
                            <Card style={{ cursor: "pointer" }}>
                                <Card.Body>
                                    <img src={`/display?file=${shop.image}`} width="100%" />
                                    <div className='ellipsis'>{shop.title}</div>
                                    <div className='price text-end'>{shop.fmtprice}원</div>
                                </Card.Body>
                                <Card.Footer>
                                    <small>조아용 {shop.fcnt} </small>
                                </Card.Footer>
                            </Card>
                        </Link>
                    </Col>
                )}

            </Row>

            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page) => { navi(`/?page=${page}&size=${size}&query=${query}`) }} />
            }
        </div>
    )
}

export default HomePage