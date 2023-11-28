import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col, InputGroup, Form, Alert } from 'react-bootstrap'
import "../Pagination.css";
import Pagination from "react-js-pagination";

const CartList = () => {
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const size = 3;
    const uid = sessionStorage.getItem("uid");

    const [cnt, setCnt] = useState(0);
    const [sum, setSum] = useState(1);
    const [checkSum, setCheckSum] = useState(0);

    const getList = async () => {
        const res = await axios(`/cart/list.json?page=${page}&size=${size}&uid=${uid}`);
        //console.log(res.data);
        const data = res.data.list.map(c => c && { ...c, checked: false })
        setList(data);
        setTotal(res.data.total);
        setSum(res.data.sum);
    }

    const onDelete = async (cid) => {
        await axios.post(`/cart/delete/${cid}`);
        getList();
    }

    const onChangeAll = (e) => {
        const data = list.map(c => c && { ...c, checked: e.target.checked });
        setList(data);
    }

    const onChangeSingle = (e, cid) => {
        const data = list.map(c => c.cid === cid ? { ...c, checked: e.target.checked } : c);
        setList(data);
    }

    const onDeleteChecked = async () => {
        if (cnt == 0) {
            alert("삭제할 상품을 선택하세용")
        } else {
            for (const c of list) {
                if (c.checked) {
                    //console.log(c);
                    await axios.post(`/cart/delete/${c.cid}`);
                }
            }
            getList();
        }
    }

    const onChangeQnt = (e, cid) => {
        const data = list.map(c => c.cid === cid ? { ...c, qnt: e.target.value } : c);
        setList(data);
    }

    const onUpdateQnt = async (cid, qnt) => {
        await axios.post("/cart/update/qnt", { cid, qnt });
        alert("수정완료")
        getList();
    }

    useEffect(() => {
        getList();
    }, [page]);

    useEffect(() => {
        let count = 0;
        let sum = 0;

        list.forEach(c => {
            if (c.checked) {
                count++;
                sum += c.sum;
            }
        })
        //console.log(count);
        setCnt(count);
        setCheckSum(sum);
    }, [list])

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>장바구니</h1>
            <Row>
                <Col>총 {total}개</Col>
                <Col className='text-end'>
                    <Button onClick={onDeleteChecked}
                        variant='dark' className='btn-sm'>선택삭제</Button>
                </Col>
            </Row>
            <Table hover>
                <thead className='text-center'>
                    <tr>
                        <td><input type='checkbox' onChange={onChangeAll}
                            checked={list.length === cnt} /></td>
                        <td colSpan={2}>상품명</td>
                        <td>가격</td>
                        <td>수량</td>
                        <td>합계</td>
                        <td>삭제</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(c =>
                        <tr key={c.cid}>
                            <td><input type='checkbox' checked={c.checked}
                                onChange={(e) => onChangeSingle(e, c.cid)} /></td>
                            <td className='text-center'>
                                <img src={`/display?file=${c.image}`} width="50" />
                            </td>
                            <td>{c.title}</td>
                            <td className='text-end'>{c.fmtprice}원</td>
                            <td>
                                <InputGroup className="cart_input_group">
                                    <Form.Control value={c.qnt} onChange={(e) => onChangeQnt(e, c.cid)} type='number' />
                                    <Button onClick={() => onUpdateQnt(c.cid, c.qnt)}
                                        variant='outline-dark'>수정</Button>
                                </InputGroup>
                            </td>
                            <td>{c.fmtsum}원</td>
                            <td><Button onClick={() => onDelete(c.cid)}
                                variant='danger btn-sm'>삭제</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Alert variant='dark'>
                <Row>
                    <Col>선택 {checkSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Col>
                    <Col className='text-end'>총 {sum}원</Col>
                </Row>
            </Alert>

            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page) => setPage(page)} />
            }
        </div>
    )
}

export default CartList