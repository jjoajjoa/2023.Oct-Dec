import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, InputGroup, Button, Form, Tabs, Tab } from 'react-bootstrap';

const ShopUpdate = () => {
    const { pid } = useParams();
    const [form, setForm] = useState("");
    const ref_file = useRef(null);
    const [src, setSrc] = useState("http://via.placeholder.com/200x200")
    const [file, setFile] = useState(null);

    const getShop = async () => {
        const res = await axios(`/shop/read/${pid}`);
        //console.log(res.data)
        setForm(res.data);
    }

    const { title, lprice, image, fmtdate, maker } = form;

    useEffect(() => { getShop(); }, [])

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm("수정하시겟슴까?")) {
            await axios.post("/shop/update", form);
            alert("수정완료!");
        }
    }

    const onChangeFile = (e) => {
        setSrc(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const onSaveImage = async () => {
        if (!file) {
            alert("변경할 이미지 선택하셍");
        } else {
            if (window.confirm("사진 변경하실?")) {
                //이미지저장 url호출
                const formData = new FormData();
                formData.append("file", file);
                formData.append("pid", pid);
                await axios.post("/shop/image", formData);
                alert("변경완료!");
                await axios(`/deleteFile?file=${image}`)
                getShop();
                setSrc('http://via.placeholder.com/200x200');
                setFile(null);
            }
        }
    }

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>상품 정보수정</h1>

            <Tabs
                defaultActiveKey="home"
                id="fill-tab-example"
                className="mb-3"
                fill >

                <Tab eventKey="home" title="상품정보">
                    <Row>
                        <Col>
                            <Form className='card p-3' onSubmit={onSubmit}>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>상품번호</InputGroup.Text>
                                    <Form.Control value={pid} readOnly />
                                </InputGroup>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>상품이름</InputGroup.Text>
                                    <Form.Control name='title' value={title} onChange={onChange} />
                                </InputGroup>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>제조사</InputGroup.Text>
                                    <Form.Control name='maker' value={maker} onChange={onChange} />
                                </InputGroup>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>상품가격</InputGroup.Text>
                                    <Form.Control name='lprice' value={lprice} onChange={onChange} />
                                </InputGroup>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>등록일</InputGroup.Text>
                                    <Form.Control value={fmtdate} readOnly />
                                </InputGroup>
                                <div className='text-center mt-2'>
                                    <Button variant='dark' className='me-2' type='submit'>수정</Button>
                                    <Button variant='secondary'>취소</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Tab>

                <Tab eventKey="profile" title="상품사진">
                    <Row>
                        <Col>
                            <div className='card p-3'>
                                <div className='text-center mb-2'>수정 전</div>
                                <img src={`/display?file=${image}`} width="100%" />
                            </div>
                        </Col>
                        <Col>
                            <div className='card p-3'>
                                <div className='text-center mb-2'>수정 후</div>
                                <img onClick={() => ref_file.current.click()}
                                    src={src} width="100%" style={{ cursor: "pointer" }} />
                                <input onChange={onChangeFile}
                                    type='file' ref={ref_file} style={{ display: 'none' }} />
                            </div>
                        </Col>
                        <Button onClick={onSaveImage} className='my-3' variant='outline-primary'>이미지 저장</Button>
                    </Row>
                </Tab>
            </Tabs>


        </div>
    )
}

export default ShopUpdate