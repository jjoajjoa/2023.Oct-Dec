import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Spinner, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState("http://via.placeholder.com/200x200");
    const ref_file = useRef(null);

    const [user, setUser] = useState({
        uid: '',
        upass: '',
        uname: '',
        phone: '',
        address1: '',
        address2: '',
        fmtdate: '',
        fmtmodi: ''
    });

    const { uid, upass, uname, phone, address1, address2, fmtdate, fmtmodi } = user;

    const getUser = async () => {
        setLoading(true);
        const res = await axios.get(`/users/read/${sessionStorage.getItem("uid")}`);
        setUser(res.data);
        setLoading(false);
    }

    useEffect(() => {
        getUser();
    }, [])

    const navi = useNavigate();

    const onChangeFile = (e) => {
        setPhoto(URL.createObjectURL(e.target.files[0]));
    }

    if (loading) return <div className='text-center my-5'><Spinner /></div>

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>마이페이지</h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <Card className='p-3'>
                        <Row>
                            <Col md={3}>
                                <div className='mt-1'>
                                    <img src={photo} onClick={()=>ref_file.current.click()} width="100%" className='photo' style={{cursor:"pointer"}} />
                                    <input type="file" ref={ref_file} onChange={onChangeFile} style={{display: "none"}} />
                                </div>
                                <Button size='sm mt-2 w-100'>이미지 수정</Button>
                            </Col>
                            <Col className='px-3'>
                                <h3>이름 : {uname}
                                    <span className='text-end ps-3'>
                                        <Button onClick={() => navi('/users/update')} size='sm'>정보수정</Button>
                                    </span>
                                </h3>
                                <hr />
                                <div>전화 : {phone}</div>
                                <div>주소 : {address1} {address2}</div>
                                <div>가입일 : {fmtdate}</div>
                                <div>수정일 : {fmtmodi}</div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MyPage