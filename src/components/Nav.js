import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Link } from 'react-router-native';
import styled from 'styled-components';

const Main = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
`;

const NavItem = styled(View)`
  display: flex;
  flex-direction: row;
`;

const Nav = () => {
  return (
    <Main>
      <NavItem>
        <Link to="/login">
          <View>
            <Icon name={'home'} size={30} color="#000" />
          </View>
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/">
          <View>
            <Icon name={'home'} size={30} color="#000" />
          </View>
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/profile">
          <View>
            <Icon name={'bell'} size={30} color="#000" />
          </View>
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/notification">
          <View>
            <Icon name={'user-circle'} size={30} color="#000" />
          </View>
        </Link>
      </NavItem>
    </Main>
  );
};

export default Nav;
