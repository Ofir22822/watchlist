import React, { useState } from 'react';
import {
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse
} from 'mdb-react-ui-kit';
import * as MDB from 'mdb-react-ui-kit';

const Nav = () => {
const [showNav, setShowNav] = useState(false);
const [showCollapse, setShowCollapse] = useState(showNav);
  
  return (
    <MDBNavbar expand='lg' fluid light bgColor='light' style={{width:"100vw", height: "100vh"}}>
      <MDBNavbarNav className={"flex-column bg-secondary"}>
        <MDBNavbarItem>
          <MDBNavbarLink active aria-current='page' href='#'>
            Home
          </MDBNavbarLink>
        </MDBNavbarItem>
        <MDBNavbarItem>
          <MDBNavbarLink href='#'>search</MDBNavbarLink>
        </MDBNavbarItem>
        <MDBNavbarItem>
          <MDBNavbarLink href='#'>show list</MDBNavbarLink>
        </MDBNavbarItem>
        <MDBNavbarItem>
          <MDBNavbarLink href='#'>setting</MDBNavbarLink>
        </MDBNavbarItem>
          
      </MDBNavbarNav>
    </MDBNavbar>
  );
};

export default Nav;