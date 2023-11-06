import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Spinner, Table } from 'react-bootstrap'
import Pagination from "react-js-pagination";
import '../Pagination.css';
import OrderModal from './OrderModal';

const OrderList = () => {
    const navi = useNavigate();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const size = 3;
    
    const getPurchase = async () => {
        setLoading(true)
        const res = await axios(`/orders/list/purchase.json?uid=${sessionStorage.getItem("uid")}&page=${page}&size=${size}`);
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    const onChangePage = (page) => {
        navi(`/orders/list?page=${page}`);
    }

    useEffect(() => { getPurchase(); }, [location])

    if (loading) return <div className='text-center my-5'><Spinner /></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>주문목록</h1>
            <Table bordered hover>
                <thead>
                    <tr className='text-center'>
                        <td>주문번호</td> <td>주문일</td> <td>배송지</td> <td>금액</td> <td>주문상태</td> <td>주문상품</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p =>
                        <tr key={p.pid}>
                            <td className='text-end'>{p.pid}</td>
                            <td>{p.fmtdate}</td>
                            <td>{p.raddress1}</td>
                            <td>{p.fmtsum}원</td>
                            <td>{p.str_status}</td>
                            <td><OrderModal purchase={p} sum={p.fmtsum} /></td>
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

export default OrderList