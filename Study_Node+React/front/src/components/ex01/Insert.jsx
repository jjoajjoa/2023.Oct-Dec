import React, { useState } from 'react'

const Insert = ({onInsert}) => {
    const [form, setForm] = useState({
        id: 5,
        name: "가리비",
        address: "가리봉동"
    })

    const {id, name, address} = form;

    const onSubmit = (e) => {
        e.preventDefault();
        if(window.confirm("등록하실건가용?")){
            console.log(form);
            onInsert(form);
            setForm({
                id: id+1, name: "", address: ""
            })
        }

    }

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div>
            <h1>주소 등록</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <span> {id} </span><br />
                <input value={name} name='name' onChange={(e)=>onChange(e)} />
                <br />
                <input value={address} name='address' onChange={(e)=>onChange(e)} />
                <hr />
                <button> 등록 </button>
                <button type='reset'> 취소 </button>
            </form>
        </div>
    )
}

export default Insert