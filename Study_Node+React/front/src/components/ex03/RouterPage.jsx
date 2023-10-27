import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import BookSearch from './BookSearch'
import LocalSearch from './LocalSearch'
import BlogSearch from './BlogSearch'
import ImageSearch from './ImageSearch'

const RouterPage = () => {
  return (
    <div>
        <div>
            <NavLink to="/book" className="me-3">도서검색</NavLink>
            <NavLink to="/local?page=1&query=카카오프렌즈" className="me-3">지역검색</NavLink>
            <NavLink to="/blog?page=1&query=커피" className="me-3">블로그검색</NavLink>
            <NavLink to="/image" className="me-3">이미지검색</NavLink>
            <hr/>
        </div>
        <Routes>
            <Route path='/book' element={<BookSearch/>} />
            <Route path='/local' element={<LocalSearch/>} />
            <Route path='/blog' element={<BlogSearch/>} />
            <Route path='/image' element={<ImageSearch/>} />
        </Routes>
    </div>
  )
}

export default RouterPage