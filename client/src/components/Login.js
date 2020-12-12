import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Header,
  Menu,
  Segment,
  Form, 
  Button
} from 'semantic-ui-react';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ 
    credentials: { username: '', password: '' } 
  })
  
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const logout = () => {
    localStorage.removeItem("token");
    props.history.push('/login')
  }
  const handleChanges = (e) => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload)
        props.history.push("/bubble-page");
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  return (
    <>
        <Menu fixed='top' inverted>
          <Container>
              <Menu.Item header>
              <NavLink to="/login">Login</NavLink>
              </Menu.Item>
              <Menu.Item><NavLink to="/login" onClick={logout}>Logout</NavLink></Menu.Item>
              <Menu.Item><NavLink to="/bubble-page">Bubble Page</NavLink></Menu.Item>
          </Container>
        </Menu>
        <Container text style={{ marginTop: '7em', height: '20em' }}>
            <Header as='h1'>Welcome to the Bubble App!</Header>

            <Form size='large' onSubmit={login}>
                <Segment stacked>
                <Form.Input 
                    fluid icon='user' 
                    iconPosition='left' 
                    placeholder='Username' 
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChanges}
                />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name="password"
                    value={credentials.password}
                    onChange={handleChanges}
                />
                <Button color='black' fluid size='large'>
                    Login
                </Button>
                </Segment>
            </Form>
        </Container>
    </>
  );
};

export default Login;
