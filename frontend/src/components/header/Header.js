import React, {useEffect, useState, useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {Web3AuthProviderContext} from '../../contexts/AppContext';
import {getAccounts, getBalance} from "../../utils/ethersRPC";

import './Header.css';

function Header({ connectWalletPressed, logout }) {

    const [walletAddress, setWallet] = useState("");
    const [walletBalance, setWalletBalance] = useState(0);

    const provider = useContext(Web3AuthProviderContext);

    useEffect(() => {
        const getUserAccounts = async () => {
            if(!provider) {
                console.log('HEADER: provider no initialized.');
                setWallet('');
                return;
            } else {
                const address = await getAccounts(provider);
                const balance = await getBalance(provider);
                setWallet(address);
                setWalletBalance(balance);
                console.log('HEADER: address set | ' + balance);
            }
        }
        getUserAccounts();
    },[provider]);



    return (
        <div className='main-navbar bg-white sticky-top'>
            <Navbar type="light" sticky="top" className='main-navbar'>
                <Container fluid>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                    { walletAddress.length > 0 && <NavDropdown
                    title={
                        String(walletAddress).substring(0, 6) +
                        "..." +
                        String(walletAddress).substring(38)
                    }
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href="#">{walletBalance} MATIC</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#" onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>}
                    {walletAddress.length === 0 && <Navbar.Text className='button-wallet' onClick={connectWalletPressed}>
                        <span>Connect Wallet</span>
                    </Navbar.Text>}
                    </Navbar.Collapse>
                </Container>


            </Navbar>
        </div>
    );
}

export default Header;