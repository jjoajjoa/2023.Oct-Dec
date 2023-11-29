import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalOrder = ({ p }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        const res = await axios(`/purchase/list.json/${p.oid}`);
        //console.log(res.data)
        setOrders(res.data)
    }

    useEffect(() => { getOrders(); }, [])

    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                상세
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>[주문번호] {p.oid}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <div>[주문자] {p.uname} ({p.uid})</div>
                            <div>[연락처] {p.phone}</div>
                            <div>[주소] {p.address1} {p.address2}</div>
                            <div>[총액] {p.fmtsum} 원</div>
                        </Card.Body>
                    </Card>
                    <h3 className='text-center my-3'>주문상품</h3>
                    <Table>
                        <thead>
                            <tr>
                                <td colSpan={2}>상품명</td>
                                <td>가격</td>
                                <td>수량</td>
                                <td>금액</td>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(o =>
                                <tr key={o.pid}>
                                    <td><img src={`/display?file=${o.image}`} width="30" /></td>
                                    <td>{o.title}</td>
                                    <td>{o.fmtprice}원</td>
                                    <td>{o.qnt}개</td>
                                    <td>{o.fmtsum}원</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalOrder