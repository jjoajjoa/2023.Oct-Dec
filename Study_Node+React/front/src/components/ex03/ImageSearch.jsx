import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap'
import ImageModal from './ImageModal';

const ImageSearch = () => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);
    const [cnt, setCnt] = useState(0);

    const navigate = useNavigate();
    
    const [box, setBox] = useState({
        show: false,
        url:''
    });

    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page = parseInt(search.get("page") ? search.get("page") : 1);
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "이도현");

    const getImages = async () => {
        const url = `https://dapi.kakao.com/v2/search/image?size=12&page=${page}&query=${query}`;
        const config = {
            headers: {
                "Authorization": "KakaoAK d98342bfb3d10bd8a8d18f10982fe1c8"
            }
        }
        setLoading(true);
        const res = await axios.get(url, config);
        let data = res.data.documents;
        setTotal(res.data.meta.pageable_count);
        setEnd(res.data.meta.is_end);
        data = data.map(img=> img && {...img, checked:false});
        setImages(data);
        setLoading(false);
    }

    useEffect(() => {
        getImages();
    }, [location]);

    useEffect(() => {
        let cnt = 0;
        images.forEach(img=> img.checked && cnt++);
        setCnt(cnt);
    }, [images]);

    const onSubmit = (e) => {
        e.preventDefault();
        if(query == "") {
            alert("검색어를 입력해주세요!");
        } else {
            navigate(`/image?page=1&query=${query}`)
        }
    }

    const onChangeAll = (e) => {
        const data = images.map(img=> img && {...img, checked:e.target.checked});
        setImages(data);
    }

    const onChangeSingle = (e, url) => {
        const data = images.map(img=> img.thumbnail_url===url ? {...img, checked:e.target.checked} : img);
        setImages(data);
    }

    return (
        <div className='m-5'>
            <h1 className='text-center mb-5'>이미지검색</h1>
            {loading ?
                <div>로딩중....</div>
                :
                <>
                    <Row className='mb-3'>
                        <Col>
                            <input checked={images.length===cnt}
                                onChange={onChangeAll} type='checkbox'/>
                        </Col>
                        <Col md={4}>
                            <form onSubmit={onSubmit}>
                                <InputGroup>
                                    <Form.Control onChange={(e) => setQuery(e.target.value)} value={query}/>
                                    <Button type='submit'>검색</Button>
                                </InputGroup>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        {images.map(img =>
                            <Col lg={2} md={3} sm={4} key={img.thumbnail_url} className='mb-3'>
                                <Card className='p-1'>
                                    <input type='checkbox' onChange={(e)=> onChangeSingle(e, img.thumbnail_url)}
                                        checked={img.checked}/>
                                    <img onClick={() => setBox({url:img.image_url, show:true})}
                                        src={img.thumbnail_url} style={{cursor:"pointer"}}/>
                                </Card>
                            </Col>
                        )}
                    </Row>
                    <div className='text-center'>
                        <Button onClick={() => navigate(`/image?page=${page-1}&query=${query}`)} disabled={page===1}>이전</Button>
                        <span className='mx-3'> {page} / {Math.ceil(total/12)} </span>
                        <Button onClick={() => navigate(`/image?page=${page+1}&query=${query}`)} disabled={end}>다음</Button>
                    </div>
                    <ImageModal box={box} setBox={setBox}/>
                </>
            }
        </div>
    )
}

export default ImageSearch