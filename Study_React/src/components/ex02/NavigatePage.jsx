import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavigatePage = () => {
    const navigator = useNavigate();

    return (
        <div>
            <button onClick={()=> navigator(-1)}> 뒤로가기 </button>
            <button onClick={()=> navigator('/')}> 홈으로 </button>
            <button onClick={()=> navigator('/profiles')}> 프로필보기 </button>
        </div>
    )
}

export default NavigatePage