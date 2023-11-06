import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BoxContext } from '../shop/BoxContext'

const HeaderPage = () => {
    const { box, setBox } = useContext(BoxContext);

    const navi = useNavigate();
    const onLogout = (e) => {
        e.preventDefault();
        /*
        if(window.confirm("로그아웃 할겁니까?")) {
            sessionStorage.clear();
            navi("/");
        }
        */
        setBox({
            show: true,
            message: "로그아웃 하실검믹가?",
            action: () => {
                sessionStorage.clear();
                navi("/");
            }
        })
    };

    return (
        <Navbar expand="lg" bg="primary" data-bs-theme="dark">
            <Container fluid>
                <NavLink to="/" className="home">BaBo</NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100%' }}
                        navbarScroll>
                        <NavLink className="me-3" to="/">Home</NavLink>
                        {sessionStorage.getItem("uid") === "admin" &&
                            <>
                                <NavLink className="me-3" to="/books/search">도서검색</NavLink>
                                <NavLink className="me-3" to="/books/list">도서목록</NavLink>
                                <NavLink className="me-3" to="/orders/admin">주문관리</NavLink>
                            </>
                        }

                        {(sessionStorage.getItem("uid") && sessionStorage.getItem("uid") !== 'admin') &&
                            <>
                                <NavLink className="me-3" to="/orders/cart">장바구니</NavLink>
                                <NavLink className="me-3" to="/orders/list">주문목록</NavLink>
                            </>
                        }
                    </Nav>
                    <Nav>
                        {!sessionStorage.getItem("uid") ?
                            <NavLink className="me-3" to="/users/login">로그인</NavLink>
                            :
                            <>
                                <NavLink className="me-3" to="/users/mypage">{sessionStorage.getItem("uid")}</NavLink>
                                <NavLink className="me-3" onClick={onLogout} to="/users/login">로그아웃</NavLink>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderPage