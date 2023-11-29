import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Table, Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import ModalPost from '../user/ModalPost';

const OrderPage = ({ list, checkSum }) => {
    const [form, setForm] = useState("");
    const { uid, uname, phone, address1, address2 } = form;

    const getUser = async () => {
        const res = await axios(`/user/read?uid=${sessionStorage.getItem("uid")}`);
        setForm(res.data);
    }

    const onChageForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onPostCode = (address) => {
        setForm({
            ...form,
            address1: address
        })
    }

    const onOrder = async () => {
        if (window.confirm("진짜로진짜로 주문하시겠슴까?")) {
            const orders = list.filter(s => s.checked);
            const res = await axios.post("/purchase/insert", { ...form, sum: checkSum, orders });
            //alert(res.data); //주문번호 확인
            for (const order of orders) { //장바구니 비우기
                await axios.post(`/cart/delete/${order.cid}`);
            }
            window.location.href = `/order/complete/${res.data}`;
        }
    }

    useEffect(() => { getUser(); }, [])

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>주문하기</h1>

            <Table>
                <thead>
                    <tr className='text-center'>
                        <td colSpan={2}>상품명</td>
                        <td>가격</td>
                        <td>수량</td>
                        <td>합계</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(s => s.checked &&
                        <tr key={s.cid}>
                            <td><img src={`/display?file=${s.image}`} width="30" /></td>
                            <td>{s.title}</td>
                            <td className='text-end'>{s.fmtprice}원</td>
                            <td className='text-end'>{s.qnt}개</td>
                            <td className='text-end'>{s.fmtsum}원</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Alert variant='dark' className='text-end'>
                <span>총 {checkSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
            </Alert>

            <h1 className='text-center my-5'>배송지 정보</h1>
            <div>
                <form>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>아이디</InputGroup.Text>
                        <Form.Control name='uid' value={uid} readOnly />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>회원명</InputGroup.Text>
                        <Form.Control name='uname' value={uname} onChange={onChageForm} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>전화번호</InputGroup.Text>
                        <Form.Control name='phone' value={phone} onChange={onChageForm} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>주소</InputGroup.Text>
                        <Form.Control name='address1' value={address1} readOnly />
                        <ModalPost onPostCode={onPostCode} />
                    </InputGroup>
                    <Form.Control name='address2' value={address2} placeholder='상세주소' onChange={onChageForm} />
                </form>
                <div className='text-center my-5'>
                    <Button onClick={onOrder}>진짜주문</Button>
                </div>
            </div>

        </div>
    )
}

export default OrderPage