import React from 'react';
import { Container,Nav,Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
const Header = () => {
    const userLogin = useSelector(state=>state.userLogin);
    const dispatch = useDispatch();
    const { userInfo } = userLogin;
    const handleLogout = () =>{
        dispatch(logout());
    }
    return (
        <header>
                <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
                <Container>
                <LinkContainer to="/">
                <Navbar.Brand>ShopCart</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <LinkContainer to="/cart">
                    <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                    </LinkContainer>
                    {userInfo ? (
                        <NavDropdown title={userInfo.name}>
                            <LinkContainer to="/profile">
                                <NavDropdown.Item>
                                    Profile
                                </NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    ):
                        <LinkContainer to="/login">
                        <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
                        </LinkContainer>
                    }  
                </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;
