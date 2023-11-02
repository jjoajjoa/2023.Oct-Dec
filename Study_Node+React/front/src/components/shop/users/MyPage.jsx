import axios from 'axios';
import React, { useEffect, useRef, useState, useContext } from 'react'
import { Spinner, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BoxContext } from '../BoxContext'

const MyPage = () => {

    const { box, setBox } = useContext(BoxContext);

    const ref_file = useRef(null);
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        uid: "",
        upass: "",
        uname: "",
        phone: "",
        address1: "",
        address2: "",
        fmtdate: "",
        fmtmodi: "",
        photo: "",
        file: null,
    });
    const { uid, upass, uname, phone, address1, address2, fmtdate, fmtmodi, photo, file } = user; //비구조할당

    const getUser = async () => {
        setLoading(true);
        const res = await axios.get(`/users/read/${sessionStorage.getItem("uid")}`)
        setUser(res.data);
        setLoading(false);
    };

    const onChangeFile = (e) => {
        setUser({
            ...user,
            photo: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        })
    };

    const onUpdatePhoto = async () => {
        if (!file) {
            //alert("수정할 사진을 선택하세요!!");
            setBox({
                show: true,
                message: "수정할 사진을 선택하세용!"
            })
        } else {
            /*
            if (window.confirm("변경한 사진을 저장할까용?")) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("uid", uid);
                await axios.post("/users/update/photo", formData);
                alert("사진 변경 완룡!!");
            }
            */
            setBox({
                show: true,
                message: "변경된 사진을 저장하실거예여?",
                action: async () => {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("uid", uid);
                    await axios.post("/users/update/photo", formData);
                }
            })
        }
    }

    useEffect(() => { getUser(); }, []);

    if (loading) return <div className='text-center my-5'><Spinner variant='primary'>로 딩 중</Spinner></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>마이페이지</h1>
            <Row className='justify-content-center'>
                <Col className='text-center'>
                    <img onClick={() => ref_file.current.click()}
                        src={photo || "http://via.placeholder.com/200x200"} width="200" className='photo' />
                    <input type='file' ref={ref_file} onChange={onChangeFile} style={{ display: "none" }} />
                    <Button onClick={onUpdatePhoto} size='sm mt-2'> 이미지 수정 </Button>
                </Col>
                <Col md={6}>
                    <div>[이름] {uname}</div>
                    <div>[번호] {phone}</div>
                    <div>[주소] {address1} {address2}</div>
                    <div>[가입일] {fmtdate}</div>
                    <div>[수정일] {fmtmodi}</div>
                    <Button size='sm mt-2' onClick={() => navi("/users/update")}> 정보 수정 </Button>
                </Col>
            </Row>

        </div>
    )
}

export default MyPage