import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner, Table, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import '../Pagination.css';

const BookList = () => {
    const size = 10;
    const location = useLocation();
    const navi = useNavigate();
    const path = location.pathname;
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "");
    //console.log(path, query, page, size);
    const [books, setBooks] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const getBooks = async () => {
        const url = `/books/list.json?query=${query}&page=${page}&size=${size}`;
        setLoading(true);
        const res = await axios(url);
        //console.log(res.data);
        setBooks(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(() => {
        getBooks();
    }, [location]);

    const onChangePage = (page) => {
        navi(`${path}?page=${page}&query=${query}&size=${size}`)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`${path}?page=1&query=${query}&size=${size}`)
    }

    const onDelete = async(bid) => {
        if(!window.confirm(`${bid}번 도서를 삭제할거에요?`)) return;
        const res = await axios.post("/books/delete", {bid});
        if(res.data === 0) {
            alert("삭제실패");
        } else {
            alert("삭제성공");
            getBooks();
        }
    }

    if (loading) return <div className='text-center my-5'> <Spinner variant='primary' /></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'> 도서 목록 </h1>
            <Row>
                <Col>
                    <Form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control value={query} onChange={(e)=>setQuery(e.target.value)} />
                            <Button> 검색! </Button>
                        </InputGroup>
                    </Form>
                </Col>
                <Col className='mb-4'> 총 {total} 건</Col>
            </Row>
            <hr/>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th> <th>이미지</th> <th>제목</th> <th>저자</th> <th>가격</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book =>
                        <tr key={book.bid}>
                            <td>{book.bid}</td>
                            <td width="10%">
                                <img src={book.image || "http://via.placeholder.com/100x100"} width="30%" /></td>
                            <td width="30%"><div className='ellipsis'>{book.title}</div></td>
                            <td width="30%"><div className='ellipsis'>{book.authors}</div></td>
                            <td>{book.fmtprice}원</td>
                            <td><Button onClick={()=> onDelete(book.bid)}
                                    size="sm" variant='danger'> 삭제! </Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={onChangePage} />
            }
        </div>
    )
}

export default BookList