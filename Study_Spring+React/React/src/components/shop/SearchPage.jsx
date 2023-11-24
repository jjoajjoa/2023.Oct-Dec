import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table, Spinner } from 'react-bootstrap'

const SearchPage = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [query, setQuery] = useState("고양이")
    const [page, setPage] = useState(1);
    const [cnt, setCnt] = useState(0);

    const getList = async () => {
        setLoading(true);
        const res = await axios(`/search/list.json?page=${page}&size=5&query=${query}`);
        //console.log(res.data);
        //const data=data.items.map(s=>s && {...s, title:s.title.inneHTML.replace(/<[^>]*>?/g, '')});
        let data = res.data.items.map(s => s && { ...s, title: stripHtmlTags(s.title) });
        data = data.map(item => item && { ...item, checked: false });
        setList(data);
        setLoading(false);

    }

    // HTML 태그를 제거하는 함수
    const stripHtmlTags = (htmlString) => {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    }

    useEffect(() => {
        getList();
    }, [page])

    const onSubmit = (e) => {
        e.preventDefault();
        if (query === "") {
            alert("검색어를 입력하세요")
        } else {
            getList();
        }
    }

    const OnSave = async (shop) => {
        if (window.confirm("상품을 등록하시겠슴까?")) {
            await axios.post("/shop/insert", shop);
            alert("등록완룡!")
        }
    }

    const onChangeAll = (e) => {
        // console.log(e.target.checked);
        const data = list.map(item => item && { ...item, checked: e.target.checked });
        setList(data);
    }

    const onChangeSingle = (e, pid) => {
        const data = list.map(item => item.productId === pid ? { ...item, checked: e.target.checked } : item);
        setList(data);
    }

    useEffect(() => {
        let chk = 0;
        list.forEach(item => {
            if (item.checked) chk++;
        });
        //console.log(chk);
        setCnt(chk);
    }, [list])

    const onCheckedSave = async () => {
        if (cnt == 0) {
            alert("저장할 상품을 선택하세용~!");
        } else {
            if (window.confirm(`${cnt}개의 상품을 저장할가용?`)) {
                for (const item of list) {
                    if (item.checked) {
                        //console.log(item);
                        await axios.post("/shop/insert", item)
                    }
                }
                alert("저장완룡!");
                getList();
            }

        }
    }

    if (loading) return <div className='my-5 text-center'><Spinner /></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>상품검색</h1>
            <Row className='mb-2'>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control onChange={(e) => setQuery(e.target.value)} placeholder='상품명, 제조사' value={query} />
                            <Button variant="dark">검색!</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col className='text-end'>
                    <Button onClick={onCheckedSave} variant="primary">선택저장</Button>
                </Col>
            </Row>
            <Table>
                <thead>
                    <tr>
                        <td><input type="checkbox" onChange={onChangeAll}
                            checked={list.length === cnt} /></td>
                        <td>ID</td><td>이미지</td><td>제목</td><td>가격</td><td>제조사</td><td>상품저장</td>
                    </tr>
                </thead>
                <tbody style={{ verticalAlign: "middle" }}>
                    {list.map(s =>
                        <tr key={s.pid}>
                            <td><input type="checkbox" checked={s.checked}
                                onChange={(e) => onChangeSingle(e, s.productId)} /></td>
                            <td>{s.productId}</td>
                            <td><img src={s.image} width="50" /></td>
                            <td><div className='ellipsis'>{s.title}</div></td>
                            <td>{s.lprice}원</td>
                            <td>{s.maker}</td>
                            <td>
                                <Button className='btn-sm' variant="outline-primary"
                                    onClick={() => OnSave(s)}>저장</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='text-center'>
                <Button onClick={() => setPage(page - 1)} disabled={page === 1} variant="outline-dark">prev</Button>
                <span className='mx-2'>{page}</span>
                <Button onClick={() => setPage(page + 1)} disabled={page === 10} variant="outline-dark">next</Button>
            </div>
        </div>
    )
}

export default SearchPage