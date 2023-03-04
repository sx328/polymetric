import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './Header.css';

function Header({ connectWalletPressed, walletAddress, walletBalance, logout }) {
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
                    <NavDropdown.Item href="#">{walletBalance} wei</NavDropdown.Item>
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