import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axioxWithAuth';
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Menu
} from 'semantic-ui-react';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth().get("http://localhost:5000/api/colors")
    .then(res => {
        //console.log(res)
        const colors = res.data;
        setColorList({ colorList: colors })
        props.history.push('/bubble-page')
    })
    .catch(err => {
        console.log(err.response);
    })
  }, []);

  console.log(colorList)
  const logout = () => {
    localStorage.removeItem("token");
    props.history.push('/login');
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
        
        <Container text style={{ marginTop: '7em' }}>

          <ColorList colors={colorList} updateColors={setColorList} />
          <Bubbles colors={colorList} />
        </Container>
    </>
  );
};

export default BubblePage;
