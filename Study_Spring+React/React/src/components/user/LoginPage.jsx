import axios from 'axios';
import React, { useState } from 'react'
import { Form, Card, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { setCookie } from "../../common";

const LoginPage = () => {
    const [form, setForm] = useState({
        uid: "",
        upass: ""
    });
    const { uid, upass } = form

    const [checked, setChecked] = useState(false);


    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("/user/login", form);
        if (res.data == 0) {
            alert("존재하지 않는 아이디 임미당");
        } else if (res.data == 2) {
            alert("비밀번호가 일치하지 않슴당");
        } else {
            if (checked) {
                setCookie("uid", uid, 7);
            }
            sessionStorage.setItem("uid", uid);
            if (sessionStorage.getItem("target")) {
                window.location.href = sessionStorage.getItem("target");
            } else {
                window.location.href = "/";
            }
        }
    }

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>로그인</h1>
            <Row className='justify-content-center'>
                <Col md={5}>
                    <Card className='p-3'>
                        <Form onSubmit={onSubmit}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>아이디</InputGroup.Text>
                                <Form.Control name="uid" value={uid} onChange={onChange} />
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>비밀번호</InputGroup.Text>
                                <Form.Control name='upass' value={upass} type='password' onChange={onChange} />
                            </InputGroup>
                            <Button className='w-100' type='submit' variant='dark'>로그인!</Button>
                        </Form>
                        <div className='mt-3'>
                            <input type='checkbox' checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                            <span className='ms-2'>로그인 상태 저장</span>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage