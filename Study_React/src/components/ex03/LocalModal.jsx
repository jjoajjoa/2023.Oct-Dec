import React, { useState } from 'react'
import { Button, Modal, Row, Col } from 'react-bootstrap';
import { Map, MapMarker } from 'react-kakao-maps-sdk';


const LocalModal = ({ local }) => {
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
                keyboard={false}>
                
                <Modal.Header closeButton>
                    <Modal.Title> {local.place_name} </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Map center={{lat:local.y, lng:local.x}} style={{width:"100%", height:"400px"}}>
                        <MapMarker position={{lat:local.y, lng:local.x}}>
                            <div> {local.phone} </div>
                        </MapMarker>
                    </Map>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> 닫기 </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LocalModal