import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Table, Button, Spinner, Row, Col, Alert, Form } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import '../Pagination.css';
import { AiFillDelete } from 'react-icons/ai'
import { BoxContext } from '../BoxContext'

const CartPage = () => {
    const { setBox } = useContext(BoxContext);
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const size = 5;
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [sum, setSum] = useState(0);
    const [sumqnt, setSumqnt] = useState(0);

    const getCart = async () => {
        setLoading(true)
        const res = await axios.get(`/cart/list.json?uid=${sessionStorage.getItem("uid")}&page=${page}&size=${size}`);
        console.log(res.data);
        setBooks(res.data.list);
        setTotal(res.data.total);

        const res1 = await axios(`/cart/sum?uid=${sessionStorage.getItem("uid")}`)
        setSum(res1.data.fmtsum);
        setSumqnt(res1.data.totalsum);
        setLoading(false);
    }

    const onChangePage = (page) => {
        setPage(page);
    }

    const onClickDelete = (cid) => {
        setBox({
            show: true,
            message: `${cid}번 책 삭제할까용`,
            action: async () => {
                await axios.post("/cart/delete", { cid });
                getCart();
            }
        });
    };

    const onChange = (e, cid) => {
        setBooks(books.map(book => book.cid === cid ? { ...book, qnt: e.target.value } : book));
    }

    const onClickUpdate = (cid, qnt) => {
        setBox({
            show: true,
            message: `${cid}번의 수량을 ${qnt}개로 변경할거예용?`,
            action: async () => {
                await axios.post("/cart/update", { cid, qnt });
                if (page === 1) {
                    getCart();
                } else {
                    setPage(1);
                }
            }
        });
    };

    useEffect(() => { getCart(); }, [page]);

    if (loading) return <div className='text-center my-5'><Spinner variant='success'>:-P</Spinner></div>
    return (
        <div className='my-5'>
            <h1 className='text-center'> 장바구니 목록 </h1>

            <Table>
                <thead>
                    <tr>
                        <td>ID</td> <td colSpan={2}>제목</td> <td>가격</td> <td>수량</td> <td>합계</td> <td>삭제</td>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book =>
                        <tr key={book.cid}>
                            <td>{book.bid}</td>
                            <td><img src={book.image || "http://via.placeholder.com/100x100"} /></td>
                            <td>{book.title}</td>
                            <td>{book.fmtprice}원</td>
                            <td>
                                <input onChange={(e) => onChange(e, book.cid)}
                                    value={book.qnt} size={1} className='text-end' />
                                <Button onClick={() => onClickUpdate(book.cid, book.qnt)}
                                    className='ms-1' size='sm'>변경</Button>
                            </td>
                            <td>{book.fmtsum}원</td>
                            <td><AiFillDelete onClick={() => onClickDelete(book.cid)} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Alert>
                <Row>
                    <Col>주문상품수량 : {sumqnt}권</Col>
                    <Col className='text-end'> 총 상품 금액 : {sum}원 </Col>
                </Row>
            </Alert>

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

export default CartPage