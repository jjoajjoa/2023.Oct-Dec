import React from 'react'
import { useParams } from 'react-router-dom'

const OrderComplete = () => {
    const { oid } = useParams();
    return (
        <div className='text-center my-5'>
            <h1>주문이 완료되었습니다!</h1>
            <h3>주문번호 : {oid}</h3>
        </div>
    )
}

export default OrderComplete