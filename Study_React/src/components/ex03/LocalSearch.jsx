import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Spinner, Button, Form, Row, Col, InputGroup } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const LocalSearch = () => {
    const [locals, setLocals] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigator = useNavigate();
    const location = useLocation();
    const search= new URLSearchParams(location.search);
    let page = parseInt(search.get("page"));
    //let query = search.get("query");
    const [query, setQuery] = useState(search.get("query"))
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);
    
    const getLocal = async() => {
        const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=5&page=${page}`
        const config = {
            headers: {"Authorization": "KakaoAK d98342bfb3d10bd8a8d18f10982fe1c8"}
        }
        setLoading(true);
        const res = await axios.get(url, config);
        setLocals(res.data.documents);
        setTotal(res.data.meta.pageable_count);
        setEnd(res.data.meta.is_end);
        setLoading(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navigator(`/local?page=${page}&query=${query}`)
    }

    useEffect(() => {getLocal();}, [location])
    return (
        <div>
            <h1 className='text-center mb-5'> 지역검색 </h1>
            {loading ? 
                <div className='text-center mb-5'>
                    <Spinner animation="border" variant="warning" /> <h5>로딩중...</h5>
                </div>
                :
                <>
                    <div>
                        <Row className='mb-4'>
                            <Col md={4}>
                                <Form onSubmit={onSubmit}>
                                    <InputGroup>
                                        <Form.Control onChange={(e)=>setQuery(e.target.value)}
                                            value={query} />
                                        <Button type="submit"> 검색! </Button>
                                    </InputGroup>
                                </Form>
                            </Col>
                            <Col>
                                총 {total} 건 
                            </Col>
                        </Row>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <td>지역명</td> <td>주소</td> <td>전화번호</td>
                            </tr>
                        </thead>
                        <tbody>
                            {locals.map(local => 
                                <tr key={local.id}>
                                    <td>{local.place_name}</td>
                                    <td>{local.address_name}</td>
                                    <td>{local.phone}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className='text-center'>
                        <Button onClick={()=> navigator(`/local?page=${page-1}&query=${query}`)} 
                            disabled={page===1}> prev </Button>
                        <span> {page} / {Math.ceil(total/5)} </span>
                        <Button onClick={()=> navigator(`/local?page=${page+1}&query=${query}`)}
                            disabled={end}> next </Button>
                    </div>
                </>
            }
        </div>
    )
}

export default LocalSearch