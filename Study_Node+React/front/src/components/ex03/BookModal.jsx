import React, { useState } from 'react'
import { Button, Modal, Row, Col } from 'react-bootstrap';

const BookModal = ({ book }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow}> 클릭! </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title> 상세정보 </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col col={3}>
                        <img src={book.thumbnail || "http://via.placeholder.com/170x250"} width="90%"/>
                        </Col>
                        <Col>
                            <h3> {book.title} </h3><hr/>
                            <div className='mb-2'> [저자] {book.authors} </div>
                            <div className='mb-2'> [가격] {book.price}원 </div>
                            <div className='mb-2'> [출판일] {book.datetime} </div>
                            <div className='mb-2'> [ISBN] {book.isbn} </div>
                        </Col>
                    </Row><hr/>
                    <div> {book.contents || <p>내용없음</p>} </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BookModal