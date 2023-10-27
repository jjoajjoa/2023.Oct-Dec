import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Table, Button, Spinner, InputGroup, Form, Row, Col } from 'react-bootstrap';

const BlogSearch = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);
    const [cnt, setCnt] = useState(0);
    const ref_query = useRef(null);
    
    const navigate = useNavigate();
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const [query, setQuery] = useState(search.get("query"));
    const page = parseInt(search.get("page"));
    //const query = search.get("query");
    
    const getBlogs = async() => {
        const url = `https://dapi.kakao.com/v2/search/blog?page=${page}&query=${query}&size=5`
        const config = {
            headers: {"Authorization": "KakaoAK d98342bfb3d10bd8a8d18f10982fe1c8"}
        }
        setLoading(true);
        const res = await axios(url, config);
        let data = res.data.documents;
        data = data.map(blog=> blog && {...blog, show: false, checked:false});
        setBlogs(data);
        setBlogs(res.data.documents);
        setEnd(res.data.meta.is_end);
        setTotal(res.data.meta.pageable_count);
        setLoading(false);
    }

    useEffect(()=> {getBlogs();}, [location]);

    useEffect(()=> {
        let cnt = 0;
        blogs.forEach(blog=> blog.checked && cnt++);
        setCnt(cnt);
    }, [blogs]);

    const onSubmit = (e) => {
        e.preventDefault();
        navigate(`/blog?page=1&query=${query}`);
        ref_query.current.focus();
    }

    const onClick = (idx) => {
        let data = blogs.map((blog, index)=> index===idx ? {...blog, show:!blog.show} : blog);
        setBlogs(data);
    }


    const onChangeAll = (e) => {
        let data = blogs.map(blog=> blog && {...blog, checked:e.target.checked})
        setBlogs(data);
    }

    const onChangeSingle = (e, url) => {
        let data = blogs.map(blog => blog.url===url ? {...blog, checked:e.target.checked} : blog);
        setBlogs(data);
    }

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'> 블로그 검색 </h1>
            {loading ?
                <div> 로딩중... </div>
                :
                <>
                    <Row>
                        <Col>
                            <Form onSubmit={onSubmit}>
                                <InputGroup>
                                    <Form.Control ref={ref_query}
                                        value={query} onChange={(e)=> setQuery(e.target.value)} />
                                    <Button type='submit'> 검색! </Button>
                                </InputGroup>
                            </Form>
                        </Col>
                        <Col> 총 {total} 건 </Col>
                    </Row>
                    <Table striped>
                        <thead>
                            <tr>
                                <th><input type='checkbox' checked={cnt==blogs.length}
                                        onChange={onChangeAll}/></th> 
                                <th>블로그이름</th> <th>제목</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog, index) =>
                                <tr key={blog.url}>
                                    <td><input onChange={(e)=> onChangeSingle(e, blog.url)}
                                         type='checkbox' checked={blog.checked} /></td>
                                    <td><a href={blog.url}>{blog.blogname}</a></td>
                                    <td>
                                        <div onClick={()=> onClick(index)}
                                            dangerouslySetInnerHTML={{__html: blog.title}}
                                            style={{cursor:"pointer", color:"tomato"}}></div>
                                        {blog.show && 
                                            <div dangerouslySetInnerHTML={{__html: blog.contents}}></div>
                                        }
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className='text-center'>
                        <Button onClick={()=> navigate(`/blog?page=${page-1}&query=${query}`)}
                            disabled={page===1}> 이전 </Button>
                        <span className='mx-2'> {page} / {Math.ceil(total/5)} </span>
                        <Button onClick={()=> navigate(`/blog?page=${page+1}&query=${query}`)}
                            disabled={end}> 다음 </Button>
                    </div>
                </>
            }
        </div>
    )
}

export default BlogSearch