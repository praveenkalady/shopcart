import React,{ useEffect } from 'react';
import { Row,Col } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import Product from '../Product';
import Loader from '../Loader';
import Message from '../Message';


const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state=> state.productList);
    const { products,error,loading } = productList;
    useEffect(()=> {
        dispatch(listProducts())    
    },[dispatch])
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                    {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> :
                    products.map((product,i) =>(
                        <Col key={i} sm={12} md={6} lg={4} xl={3} >
                            <Product  product={product}/>
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}

export default HomeScreen;
