import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import "../Pagination.css";
import Pagination from 'react-js-pagination';

const ReviewPage = ({ pid }) => {
    const [body, setBody] = useState("");
    const [page, setPage] = useState(1);
    const size = 3;
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    const getList = async () => {
        const res = await axios(`/review/list.json?page=${page}&size=${size}&pid=${pid}`)
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
    }

    const onRegister = async () => {
        if (body === "") {
            alert("내용을 적어주세용");
        } else {
            const data = { pid, uid: sessionStorage.getItem("uid"), body }
            //console.log(data);
            await axios.post("/review/insert", data);
            setBody("");
            getList();
        }
    }

    useEffect(() => { getList(); }, [page])
    return (
        <div>
            {sessionStorage.getItem("uid") ?
                <div>
                    <Form.Control onChange={(e) => setBody(e.target.value)} value={body}
                        as="textarea" rows={5} placeholder='내용을 입력하세용' />
                    <div className='text-end mt-3'>
                        <Button onClick={onRegister}
                            className='btn-sm px-3'>등록!</Button>
                    </div>
                </div>
                :
                <div>
                    <Button>로그인!</Button>
                </div>
            }

            <div className='my-4'>
                {list.map(r =>
                    <div className='mb-3'>
                        <div>
                            <span className='me-3'>{r.uid}</span>
                            <small style={{ color: "gray" }}>{r.regdate}</small>
                        </div>
                        <div>{r.body}</div>

                    </div>
                )}
            </div>

            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page) => { setPage(page) }} />
            }

        </div>
    )
}

export default ReviewPage