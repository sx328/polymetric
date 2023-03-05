import 'bootstrap/dist/css/bootstrap.min.css';
import './shards-dashboards.1.1.0.css';
import './App.css';

import React, { useState, useEffect } from 'react';

import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import {getAccounts, getBalance} from "./utils/ethersRPC";

import Header from './components/header/Header';
import { Col, Container, Row, Alert } from 'react-bootstrap';
import SideBar from './components/SideBar/SideBar';
import MainFooter from './components/footer/MainFooter';

import sampleSales from './data/sampleSales';
import SalesList from './components/SalesList/SalesList';
import UsersOverview from './components/discord/UsersOverview';

const clientId = "BCKjK2QJDaX04efHmlp52zT-4d6R1egLrTYy2tCWFsatCVOPvjGV7JJqCIJxwFxf4q__EdyGJvMYuP93jM6Bm8w"; 

function App() {

  const [walletAddress, setWallet] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [status, setStatus] = useState("");
  const [webSocket, setWebSocket] = useState(null);
  const [saleEvents, setSaleEvents] = useState(sampleSales());
  const [transferEvents, setTransferEvents] = useState(sampleSales());

  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId, 
          web3AuthNetwork: "testnet", // mainnet, aqua, celeste, cyan or testnet
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://rpc-mumbai.maticvigil.com", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();

        setStatus('🦊 Connect to Metamask using the top right button.');

        if (web3auth.provider) {
            setProvider(web3auth.provider);
            await getUserAccounts();
            await getUserAccounts();
            await getUserInfo();
            await authenticateUser();
        };

      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      setStatus("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    await getUserAccounts();
    await getUserAccounts();
    await getUserInfo();
    await authenticateUser();
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      setStatus("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    console.log(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      setStatus("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const getUserBalance = async () => {
    if (!web3auth) {
      setStatus("web3auth not initialized yet");
      return;
    }
    const balance = await getBalance(provider);
    setWalletBalance(balance);
  }

  const logout = async () => {
    if (!web3auth) {
      setStatus("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setWallet('');
    setWalletBalance(0);
  };

  const getUserAccounts = async () => {
    if (!provider) {
      setStatus("provider not initialized yet");
      return;
    }
    const address = await getAccounts(provider);
    setStatus('');
    setWallet(address)
  };


  const connect = () => {
    var ws = new WebSocket("ws://localhost:8080");
    setWebSocket(ws);

    // websocket onopen event listener
    ws.onopen = () => {
      console.log("connected websocket main component");
      setWebSocket(ws);
        setInterval(
          sendSale, 1000 * 60 * 5
        );
    };

    ws.onmessage = (message) => {
      const event = JSON.parse(message.data).payload;
      console.log(event);
      setSaleEvents(prevItems =>
        [
          event,
          ...prevItems
        ]
      );
    };

    // websocket onclose event listener
    ws.onclose = e => {
      console.log(
        `Socket is closed!`,
        e.reason
      );
    };

    // websocket onerror event listener
    ws.onerror = err => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );

      ws.close();
    };
  };

  function addItem() {
    var s = JSON.parse(JSON.stringify(saleEvents[0]));
    s.tokenMetadata.tokenId = Math.random();
    s.uuid = Math.random();
    setSaleEvents(prevItems =>
      [
        s,
        ...prevItems
      ]
    );
  }

  function sendSale() {
    if(webSocket === null) return;
    var s = JSON.parse(JSON.stringify(saleEvents[0]));
    s.tokenMetadata.tokenId = Math.random();
    s.uuid = Math.random();

    webSocket.send(JSON.stringify({
      type:'echo',
      payload: s,
    }));
  }

  return (
    <>
      <Container fluid>
        <Row>
          <SideBar />
          <Col
            className="main-content p-0"
            tag="main"
            lg={{ span: 10, offset: 2 }}
            md={{ span: 9, offset: 3 }}
            sm={12}
          >
            <Header
              connectWalletPressed={login}
              walletAddress={walletAddress}
              walletBalance={walletBalance}
              logout={logout}
            />
            <Container fluid className="px-0" onClick={addItem}>
              {
                status.length > 0 && <Alert variant='secondary' className="mb-0">
                  <i className="fa fa-info mx-2"></i> {status}
                </Alert>
              }
            </Container>
            <Container fluid className="main-content-container px-4">
              <Row className="page-header py-4 no-gutters"></Row>
              <Row>
                <Col
                lg={6}
                  md={12}
                  sm={12}>
                  <SalesList sales={saleEvents} title={"Sale's Events"} />
                </Col>
                <Col
                lg={6}
                  md={12}
                  sm={12}>
                  <SalesList sales={transferEvents}  title={"Tranfer's Events"}/>
                </Col>
              </Row>
              <Row className="page-header py-4 no-gutters"></Row>
              <Row>
                <Col>
                  <UsersOverview/>
                </Col>
              </Row>
              <Row className="page-header py-4 no-gutters"></Row>
            </Container>
            <MainFooter />
          </Col>
        </Row>
      </Container>
    </>
  );




}

export default App;
