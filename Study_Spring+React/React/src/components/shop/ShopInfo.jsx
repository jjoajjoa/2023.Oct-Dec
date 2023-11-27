import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import { BsBalloonHeart, BsBalloonHeartFill } from "react-icons/bs";
import ReviewPage from './ReviewPage';

const ShopInfo = () => {
    const { pid } = useParams();
    const [shop, setShop] = useState("");

    const { title, maker, image, fmtprice, fmtdate, ucnt, fcnt } = shop;

    const getShop = async () => {
        const res = await axios(`/shop/info/${pid}?uid=${sessionStorage.getItem("uid")}`);
        //console.log(res.data);
        setShop(res.data)
    }

    const onClickHeart = async () => {
        if (!sessionStorage.getItem("uid")) {
            sessionStorage.setItem("target", `/shop/info/${pid}`);
            window.location.href = "/login";
        } else {
            await axios(`/shop/insert/favorite?pid=${pid}&uid=${sessionStorage.getItem("uid")}`);
            alert("조아용추가")
            getShop();
        }
    }

    const onClickHeartDelete = async () => {
        await axios(`/shop/delete/favorite?pid=${pid}&uid=${sessionStorage.getItem("uid")}`);
        alert("조아용취소")
        getShop();
    }

    useEffect(() => { getShop(); }, [])

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>[{pid}] 상품 정보</h1>
            <Row>
                <Col>
                    <img src={`/display?file=${image}`} width="90%" />
                </Col>
                <Col>
                    <span className='heart'>
                        {ucnt === 0 ?
                            <BsBalloonHeart onClick={onClickHeart} />
                            :
                            <BsBalloonHeartFill onClick={onClickHeartDelete} />
                        }
                        <small>{fcnt}</small>
                    </span>
                    <h3>{title}</h3>
                    <hr />
                    <div>[가격] {fmtprice}원</div>
                    <div>[제조사] {maker}</div>
                    <div>[등록일] {fmtdate}</div>
                    <hr />
                    <div className='text-center mt-5'>
                        <Button className='me-3' variant='outline-primary'>장바구니</Button>
                        <Button variant='outline-dark'>바로구매</Button>
                    </div>
                </Col>
            </Row>

            <Tabs
                defaultActiveKey="profile"
                id="fill-tab-example"
                className="my-5" >

                <Tab eventKey="home" title="상세설명">
                    상세설명
                </Tab>
                <Tab eventKey="profile" title="상품리뷰">
                    <ReviewPage pid={pid} />
                </Tab>
            </Tabs>


        </div>
    )
}

export default ShopInfo