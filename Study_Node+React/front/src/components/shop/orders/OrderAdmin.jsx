import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner, Table, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import OrderModal from '../orders/OrderModal';
import Pagination from "react-js-pagination";
import '../Pagination.css';

const OrderAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const navi = useNavigate();

    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const size = 5;
    const [query, setQuery] = useState("");
    const [total, setTotal] = useState(0);

    const getList = async () => {
        setLoading(true);
        const res = await axios(`/orders/list.json?page=${page}&size=${size}&query=${query}`);
        //console.log(res.data)
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    const onChangePage = (page) => {
        navi(`/orders/admin?page=${page}&size=${size}&query=${query}`);
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        navi(`/orders/admin?page=1&size=${size}&query=${query}`);
    }

    useEffect(() => { getList(); }, [location])

    if (loading) return <div className='text-center my-5'><Spinner /></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>주문관리</h1>
            <Row className='mb-2'>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control placeholder='주문자/배송지/연락처' value={query} onChange={(e)=>setQuery(e.target.value)} />
                            <Button>검색!</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col className='mt-2'>
                    검색 총 {total}건
                </Col>
            </Row>
            <Table bordered hover>
                <thead>
                    <tr className='text-center'>
                        <td>주문번호</td> <td>주문일</td> <td>배송지</td> <td>금액</td> <td>주문상태</td> <td>주문상품</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p =>
                        <tr key={p.pid}>
                            <td className='text-end'>{p.pid}</td>
                            <td>{p.fmtdate}</td>
                            <td>{p.raddress1}</td>
                            <td>{p.fmtsum}원</td>
                            <td>{p.str_status}</td>
                            <td><OrderModal purchase={p} sum={p.fmtsum} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={onChangePage} />
            }
        </div>
    )
}

export default OrderAdmin