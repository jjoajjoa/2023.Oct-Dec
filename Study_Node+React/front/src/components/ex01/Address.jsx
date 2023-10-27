import React, { useState } from 'react'
import Insert from './Insert'

const Address = () => {

    const [array, setArray] = useState([
        {"id":1, "name":"쪼랭", "address":"영등포구"},
        {"id":2, "name":"부추", "address":"의정부시"},
        {"id":3, "name":"몽청", "address":"대전북구"},
    ])

    const onInsert = (form) => {
        setArray(array.concat(form))
        alert("주소 추가!");
    }

    return (
        <div>
            <Insert onInsert={onInsert} />
            <h1>주소 목록</h1>
            {array.map(person => 
                <h1 key={person.id}> ({person.id}) {person.name} : {person.address} </h1>
            )}
        </div>
    )
}

export default Address