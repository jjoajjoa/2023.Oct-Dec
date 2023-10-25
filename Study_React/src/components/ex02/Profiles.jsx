import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Profile from './Profile'

const Profiles = () => {
  return (
    <div>
        <h1> 프로필 목록 </h1>
        <ul>
            <li><Link to="/profiles/jjo"> 김쪼랭 </Link></li>
            <li><Link to="/profiles/buchu"> 김부추 </Link></li>
            <li><Link to="/profiles/kmc"> 김몽청 </Link></li>
        </ul>
        <Routes>
            <Route path='/' element={<div>사용자를 선택해주세용!</div>} />
            <Route path=':uid' element={<Profile/>} />
        </Routes>
    </div>
  )
}

export default Profiles