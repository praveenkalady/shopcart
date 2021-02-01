import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import { getUserDetails,updateUser } from '../../actions/userActions';

const ProfileScreen = ({  history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.userDetails);
  const { error,loading,user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;
  const updatedUser = useSelector((state) => state.updatedUser)
  const { success } = updatedUser;
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
        if(!user.name){
            dispatch(getUserDetails('profile'))
        }else{
            setName(user.name);
            setEmail(user.email);
        }
    }
  }, [dispatch,history, userInfo,user])

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        setMessage('Passwords do not match');
    } else {
        dispatch(updateUser({id: user._id,name:name,email:email,password:password}))
    }
  }

  return (
    <Row>
        <Col md={4}>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Profile Updated</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Update
        </Button>
      </Form>
      </Col>
      <Col md={8}>
        <h1>Your Orders</h1>
      </Col>
    </Row>
  )
}

export default ProfileScreen;