import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DaumPostcode from 'react-daum-postcode'

const ModalPost = ({ onPostCode }) => {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const onComplete = (e) => {
        //console.log(e);
        const address = e.address;
        const building = e.buildingName && `(${e.buildingName})`;
        onPostCode(address + building)
        handleClose();
    }

    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                검색!
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>주소검색</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <DaumPostcode onComplete={onComplete} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default ModalPost