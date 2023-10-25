import React from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const data = {
        jjo: { name:'김쪼랭', description:'냥아치' }, 
        buchu: { name:'김부추', description:'개르신' }, 
        kmc: { name:'김몽청', description:'개냥이' }
    }

    const {uid} = useParams();
    const profile = data[uid];

    return (
        <div>
            <h1> 이름: {profile.name} </h1>
            <h3> 소개: {profile.description} </h3>
        </div>
    )
}

export default Profile