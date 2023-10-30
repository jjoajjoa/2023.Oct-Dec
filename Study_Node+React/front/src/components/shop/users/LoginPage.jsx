import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Row, Col, Form, InputGroup, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const ref_uid = useRef(null);
    const navi = useNavigate();

    const [form, setForm] = useState({
        uid: "blue",
        upass: "pass"
    });
    const { uid, upass } = form; //할당작업

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        if (uid==="") {
            alert("아이디를 입력하세요!");
            ref_uid.current.focus();
        } else if (upass===""){
            alert("비밀번호를 입력하세요!!");
        } else {
            const res = await axios.post("/users/login", form);
            if(res.data==0) {
                alert("존재하지 않는 아이디가 아니야!");
                ref_uid.current.focus();
            } else if (res.data==2) {
                alert("비밀번호가 일치하지 않잖아!!");
            } else {
                sessionStorage.setItem("uid", uid);
                navi("/");
            }
        }
    };

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'> 로그인 </h1>
            <Row className='justify-content-center'>
                <Col className="mx-3" md={7}>
                    <Card className='p-3'>
                        <Form onSubmit={onSubmit}>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text> 아이디 </InputGroup.Text>
                                <Form.Control onChange={onChange} value={uid} name="uid" ref={ref_uid} />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text> 비밀번호 </InputGroup.Text>
                                <Form.Control onChange={onChange} value={upass} type="password" name='upass' />
                            </InputGroup>
                            <Button className='w-100' type='submit'> 로그인! </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage