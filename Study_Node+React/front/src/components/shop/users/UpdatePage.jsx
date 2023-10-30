import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner, InputGroup, Form, Button, Row, Col } from 'react-bootstrap'
import ModalPostCode from './ModalPostCode';
import { useNavigate } from 'react-router-dom';

const UpdatePage = () => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        uid: "",
        upass: "",
        uname: "",
        photo: "",
        phone: "",
        address1: "",
        address2: "",
        fmtdate: "",
        fmtmodi: ""
    });
    const { uid, upass, uname, photo, phone, address1, address2, fmtdate, fmtmodi } = user; //할당
    const getUser = async () => {
        setLoading(true);
        const res = await axios.get(`/users/read/${sessionStorage.getItem("uid")}`)
        setUser(res.data);
        setLoading(false);
    };
    useEffect(() => { getUser(); }, [])
    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
    const onUpdate = async (e) => {
        e.preventDefault();
        if (window.confirm("정보를 수정할거예영?")) {
            const res = await axios.post("/users/update", user);
            if (res.data == 1) {
                alert("정보가 수정되었어용");
                navi("/users/mypage");
            } else {
                alert("수정실패했어여");
            };
        };
    };

    if (loading) return <div className='text-center my-5'><Spinner variant='primary'>로 딩 중</Spinner></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'> 정보 수정하기 </h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <Form onSubmit={onUpdate}>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text>이름</InputGroup.Text>
                            <Form.Control value={uname} name="uname" onChange={onChange} />
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text>번호</InputGroup.Text>
                            <Form.Control value={phone} name="phone" onChange={onChange} readOnly />
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text>주소</InputGroup.Text>
                            <Form.Control value={address1} name="address1" />
                            <ModalPostCode user={user} setUser={setUser} />
                        </InputGroup>
                        <Form.Control placeholder='상세주소' name="adress2" value={address2} onChange={onChange} />
                        <div className='text-center my-3'>
                            <Button className='me-2' type='submit'>저장!</Button>
                            <Button variant='danger' onClick={() => getUser()}>취소</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default UpdatePage