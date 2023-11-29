import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import ModalPost from './ModalPost';

const MyPage = () => {
    const [form, setForm] = useState("");
    const { uid, uname, upass, address1, address2, phone } = form; //비구조할당

    const getUser = async () => {
        const res = await axios(`/user/read?uid=${sessionStorage.getItem("uid")}`)
        //console.log(res.data);
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

    const onReset = (e) => {
        e.preventDefault();
        getUser();
        
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        if(window.confirm("수정사항을 저장하시겠슴까?")) {
            await axios.post("/user/update", form);
            alert("수정완룡!");
            window.location.href = "/";
        }
    }

    useEffect(() => { getUser(); }, [])

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>정보 수정</h1>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <form onReset={onReset} onSubmit={onSubmit}>
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
                        <div className='text-center mt-5'>
                            <Button type='submit' variant='outline-primary' className='me-3'>수정</Button>
                            <Button type='reset' variant='outline-dark'>취소</Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </div>
    )
}

export default MyPage