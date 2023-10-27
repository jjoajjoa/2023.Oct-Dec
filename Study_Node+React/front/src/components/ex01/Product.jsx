import React from 'react'
import { useState } from 'react'
import { Button, Table, Form, InputGroup } from 'react-bootstrap'

const Product = () => {
    const [products, setProducts] = useState([
        {"id":1, "name":"츄르", "price":"1500"},
        {"id":2, "name":"참치", "price":"2500"},
        {"id":3, "name":"북어", "price":"3500"},
    ])
    const [form, setForm] = useState({
        id: 4, name: "", price: 0
    })
    const {id, name, price} = form;
    const onSubmit = (e) => {
        e.preventDefault();
        setProducts(products.concat(form));
        alert("저장완룡")
        setForm({
            id: id+1, name: "", price: 0
        })
    }
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div>
            <h1 className='text-center my-3'>상품관리</h1>
            <div>
                <form onSubmit={onSubmit}>
                    <h3> 아이디: {id} </h3>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text> 상품명 </InputGroup.Text> 
                        <Form.Control name="name" placeholder='상품명' value={name} onChange={onChange} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text> 가격 </InputGroup.Text> 
                        <Form.Control name="price" placeholder='가 격' value={price} onChange={onChange} />
                    </InputGroup>
                    <Button variant="danger"> 등록 </Button>
                    <hr/>
                </form>
            </div>
            <Table bordered striped hover className='text-center'>
                <thead>
                    <tr>
                        <th>아이디</th>
                        <th>상품명</th>
                        <th>가격</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => 
                        <tr key={p.id}>
                            <td> {p.id} </td>
                            <td> {p.name} </td>
                            <td> {p.price} </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Product