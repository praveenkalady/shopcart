import React,{ useEffect } from 'react';
import { useSelector,useDispatch } from  'react-redux';
import { ListGroup,Row,Col,Image, Form, Button, Card } from 'react-bootstrap';
import { addToCart,removeFromCart } from '../../actions/cartActions';
import { Link } from 'react-router-dom';
import Message from '../Message';

const CartScreen = ({ match,location,history }) => {
    const dispatch = useDispatch();
    const id = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const { cartItems } = useSelector(state => state.cart);
    const { userInfo } = useSelector(state => state.userLogin);
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    }
    useEffect(()=>{
        if(id && userInfo){
            dispatch(addToCart(id,qty));
        }
    },[id,dispatch,qty,cartItems,userInfo])
    return (
        <>
        <h1>Your Shopping Cart</h1>
        <Row>
            <Col md={8}>
                {cartItems.length  === 0 ? <Message>Your cart is empty<Link to="/">Go Back</Link></Message> :
                <ListGroup variant="flush" >
                    {cartItems.map(item => (
                        <ListGroup.Item  key={item.product} >
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} rounded fluid />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={2}>
                                    <Form.Control as="select" value={item.qty} onChange={(e)=> dispatch(addToCart(item.product,Number(e.target.value)))} >
                                        {
                                            [...Array(item.countInStock).keys()].map(x=>(
                                                <option value={x+1} key={x+1} >{x+1}</option>
                                            ))
                                        }
                                    </Form.Control>
                                </Col>
                                <Col md={3}>
                                    <Button onClick={()=>dispatch(removeFromCart(item.product))} variant="light"><i className="fas fa-trash"></i></Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            }
            </Col>
            <Col md={4} >
                <Card>
                    <ListGroup variant="flush" >
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc,item)=>acc + item.qty,0)})items</h2>
                            ${cartItems.reduce((acc,item)=>acc + item.qty * item.price,0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button onClick={checkoutHandler} type="button" className="btn-block">Proceed To Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default CartScreen;
