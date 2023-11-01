import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import '../Pagination.css';

const ReviewPage = ({ location, setBook, book }) => {
    const { bid } = useParams();

    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const size = 5;
    const [total, setTotal] = useState(0);
    const [contents, setContents] = useState("");

    const getReviews = async () => {
        const url = `/review/list.json?bid=${bid}&page=${page}&size=${size}`;
        const res = await axios(url);

        let list = res.data.list;
        list = list.map(r => r && { ...r, ellipsis: true, edit: false, text: r.contents });
        setReviews(list);
        setTotal(res.data.total);
        setBook({ ...book, rcnt: res.data.total });
    };

    const onChangePage = (page) => {
        setPage(page)
    }

    const onChangeEllipsis = (rid) => {
        const list = reviews.map(r => r.rid === rid ? { ...r, ellipsis: !r.ellipsis } : r);
        setReviews(list);
    }

    const onClickWrite = () => {
        sessionStorage.setItem("target", location.pathname);
        window.location.href = "/users/login";
    };

    const onClickRegister = async () => {
        if (contents === "") {
            alert("내용을 입력하세욧!");
        } else {
            const res = await axios.post("/review/insert", {
                uid: sessionStorage.getItem("uid"),
                bid,
                contents
            });
            if (res.data === 1) {
                getReviews();
                setContents("");
            };
        };
    };

    const onClickDelete = async (rid) => {
        if (window.confirm(`${rid}번 리뷰를 삭제하시겟슴가?`)) {
            const res = await axios.post("/review/delete", { rid })
            if (res.data === 1) {
                getReviews();
            }
        };
    };

    const onClickUpdate = (rid) => {
        const list = reviews.map(r => r.rid === rid ? { ...r, edit: true } : r);
        setReviews(list);
    };

    const onClickCancle = (rid) => {
        const list = reviews.map(r => r.rid === rid ? { ...r, edit: false, text: r.contents } : r);
        setReviews(list);
    };

    const onChangeContents = (rid, e) => {
        const list = reviews.map(r => r.rid === rid ? { ...r, text: e.target.value } : r);
        setReviews(list);
    };

    const onClickSave = async (rid, text, contents) => {
        if (text === contents) return;
        if (window.confirm("수정하시겟슴까?")) {
            const res = await axios.post("/review/update", { rid, contents: text });
            if (res.data === 1) {
                getReviews();
            }
        };
    };

    useEffect(() => { getReviews(); }, [page]);

    return (
        <div>
            {!sessionStorage.getItem("uid") ?
                <div className='p-2'>
                    <Button onClick={onClickWrite}>리뷰 작성하기</Button>
                </div>
                :
                <div>
                    <Form.Control value={contents} onChange={(e) => setContents(e.target.value)}
                        as="textarea" rows={5} placeholder='내용을 입력하세용~' />
                    <div className='text-end p-2'>
                        <Button onClick={onClickRegister}>등록~</Button>
                        <hr />
                    </div>
                </div>
            }

            {reviews.map(review =>
                <Card className='p-2 mb-3'>
                    <Row key={review.rid}>
                        <Col xs={2} lg={2} className='align-self-center'>
                            <img src={review.photo || "http://via.placeholder.com/100x100"} width="90%" />
                            <div className='text-center'>{review.uname}</div>
                        </Col>
                        <Col>
                            <div className='small'>{review.fmtdate}</div>
                            {!review.edit ?
                                <>
                                    <div onClick={() => onChangeEllipsis(review.rid)} style={{ cursor: "pointer" }}
                                        className={review.ellipsis && "ellipsis"}>{review.contents}
                                    </div>

                                    {sessionStorage.getItem("uid") === review.uid &&
                                        <div className='text-end p-3'>
                                            <Button onClick={() => onClickUpdate(review.rid)} size='sm me-2'> 수정 </Button>
                                            <Button onClick={() => onClickDelete(review.rid)}
                                                variant='danger' size='sm'> 삭제 </Button>
                                        </div>
                                    }
                                </>
                                :
                                <>
                                    <Form.Control onChange={(e) => onChangeContents(review.rid, e)}
                                        value={review.text} rows={5} as="textarea" />
                                    <div className='text-end p-3'>
                                        <Button onClick={() => onClickSave(review.rid, review.text, review.contents)}
                                            variant='success' size='sm me-2'>저장!</Button>
                                        <Button onClick={() => onClickCancle(review.rid)}
                                            value="secondary" size='sm'>취소</Button>
                                    </div>
                                </>
                            }
                        </Col>
                    </Row>
                </Card>
            )}

            <Pagination
                activePage={page}
                itemsCountPerPage={size}
                totalItemsCount={total}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={onChangePage} />

        </div>
    );
};

export default ReviewPage