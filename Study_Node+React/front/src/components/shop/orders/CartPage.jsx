import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Spinner, Table, Alert, Row, Col } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import OrderPage from './OrderPage'
import { BoxContext } from '../BoxContext'

const CartPage = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const search = new URLSearchParams(location.search);
    const show = search.get("show") ? search.get("show") : "cart";
    const navi = useNavigate();

    const { setBox } = useContext(BoxContext)
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [sumprice, setSumprice] = useState(0);
    const [sumqnt, setSumqnt] = useState(0);
    const [count, setCount] = useState(0); //체크 된 체크박스 갯수

    const onClickOrder = () => {
        if (count === 0) {
            setBox({ show: true, message: "주문할 상품을 선택하세욧!" })
        } else {
            navi(`${pathname}?show=order`)
        }
    }

    const getCart = async () => {
        setLoading(true);
        const res = await axios.get(`/cart/list.json?uid=${sessionStorage.getItem("uid")}`);
        let list = res.data.list;
        list = list.map(book => book && { ...book, checked: false });
        setBooks(list);

        let sum1 = 0;
        let sum2 = 0;
        list.forEach(book => {
            sum1 += book.sum;
            sum2 += book.qnt;
        })
        setSumprice(sum1);
        setSumqnt(sum2)

        setLoading(false);
    }

    const onDelete = (cid) => {
        setBox({
            show: true,
            message: `${cid}번 장바구니를 삭제하실?`,
            action: async () => {
                await axios.post("/cart/delete", { cid })
                getCart();
            }
        })
    }

    const onChange = (cid, e) => {
        const list = books.map(book => book.cid === cid ? { ...book, qnt: e.target.value } : book);
        setBooks(list);
    }

    const onUpdate = (cid, qnt) => {
        setBox({
            show: true,
            message: `${cid}번의 수량을 ${qnt}개로 변경하실겠슴까?`,
            action: async () => {
                await axios.post("/cart/update", { cid, qnt });
                getCart();
            }
        })
    }

    const onChangeAll = (e) => {
        const list = books.map(book => book && { ...book, checked: e.target.checked });
        setBooks(list);
    }

    const onChangeSingle = (e, cid) => {
        const list = books.map(book => book.cid === cid ? { ...book, checked: e.target.checked } : book);
        setBooks(list);
    }

    const onDeleteChecked = () => {
        if (count === 0) {
            setBox({ show: true, message: "삭제할 상품을 선택하세욧!" });
        } else {
            setBox({
                show: true,
                message: `${count}개의 장바구니를 삭제하시겠슴까?`,
                action: async () => {
                    for (const book of books) {
                        if (book.checked) {
                            await axios.post("/cart/delete", { cid: book.cid });
                        }
                        getCart();
                    }
                }
            })
        }
    }

    useEffect(() => { getCart(); }, []);

    useEffect(() => {
        let count = 0;
        books.forEach(book => book.checked && count++);
        setCount(count);
    }, [books])

    if (loading) return <div className='text-center'><Spinner className='my-5'>:-P</Spinner></div>
    return (
        <>
            {show === "cart" &&
                <div className='my-5'>
                    <h1 className='text-center mb-5'> 장바구니 </h1>
                    <div className='mb-2'>
                        <Button size='sm' variant='danger' onClick={onDeleteChecked}>선택삭제</Button>
                    </div>
                    <Table bordered striped hover>
                        <thead>
                            <tr className='text-center'>
                                <th><input type='checkbox' onChange={onChangeAll} checked={books.length === count} /></th>
                                <th>제목</th>
                                <th>가격</th>
                                <th>수량</th>
                                <th>합계</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book =>
                                <tr key={book.cid}>
                                    <td className='text-center'>
                                        <input type='checkbox' onChange={(e) => onChangeSingle(e, book.cid)} checked={book.checked} />
                                    </td>
                                    <td><div className='ellipsis'>[{book.cid}] {book.title}</div></td>
                                    <td className='text-end'>{book.fmtprice}원</td>
                                    <td className='text-end' width="15%">
                                        <input onChange={(e) => onChange(book.cid, e)}
                                            className='text-end me-1' value={book.qnt} size={1} />권
                                        <button onClick={(e) => onUpdate(book.cid, book.qnt)}>변경</button>
                                    </td>
                                    <td className='text-end'>{book.fmtsum}원</td>
                                    <td className='text-center'>
                                        <MdDelete onClick={() => onDelete(book.cid)}
                                            className='delete' />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Alert>
                        <Row>
                            <Col> 총 주문 수: {books.length} </Col>
                            <Col className='text-center'> 총 {sumqnt}권 </Col>
                            <Col className='text-end'> 총 {sumprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </Col>
                        </Row>
                    </Alert>
                    <div className='text-center p-3'>
                        {books.length > 0 &&
                            <Button onClick={onClickOrder} variant='success' className='me-3'>주문하기</Button>
                        }
                        <Button variant='warning'> 쇼핑계속하기 </Button>
                    </div>
                </div>
            }

            {show === "order" &&
                <OrderPage books={books} />
            }
        </>
    )
}

export default CartPage