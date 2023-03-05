import React, { useState, useEffect } from 'react';
import { Web3AuthProviderContext } from './contexts/AppContext'

import Header from './components/header/Header';
import { Col, Container, Row, Alert } from 'react-bootstrap';
import SideBar from './components/SideBar/SideBar';
import MainFooter from './components/footer/MainFooter';

import sampleSales from './data/sampleSales';
import SalesList from './components/SalesList/SalesList';
import UsersOverview from './components/discord/UsersOverview';
import PageTitle from './components/common/PageTitle';
import SmallStats from './components/SmallStats/SmallStats';

import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";

import 'bootstrap/dist/css/bootstrap.min.css';
import './shards-dashboards.1.1.0.css';
import './App.css';


const clientId = "BCKjK2QJDaX04efHmlp52zT-4d6R1egLrTYy2tCWFsatCVOPvjGV7JJqCIJxwFxf4q__EdyGJvMYuP93jM6Bm8w"; 

function App() {

  const [status, setStatus] = useState("");
  const [webSocket, setWebSocket] = useState(null);
  const [saleEvents, setSaleEvents] = useState([]);
  const [transferEvents, setTransferEvents] = useState(sampleSales());
  const [contractsList, setContractsList] = useState([]);

  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId, 
          web3AuthNetwork: "mainnet", // mainnet, aqua, celeste, cyan or testnet
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://polygon-mainnet.infura.io/v3/88cad62548b64a1b8ac1b6ffd8cf5e97", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();

        if (web3auth.provider) {
            setProvider(web3auth.provider);
            console.log('APP - useEffect: Provider found and set');
        }else {
          console.log('APP - useEffect: Provider not found');
        }

        connect();

      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    console.log('APP - Login: Provider set');
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    console.log('APP - Logout: Provider set to null');
  };

  const connect = () => {
    const ws = new WebSocket('ws://localhost:3030/events');
  
    // WebSocket onopen event listener
    ws.onopen = () => {
      console.log('WebSocket connected');
    };
  
    // WebSocket onmessage event listener
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('WebSocket message received:', message);
      if (message.type === '0x9d9af8e38d66c62e2c12f0225249fd9d721c54b83f48d9352c97c6cacdcb6f31') {
        setSaleEvents((prevItems) => [message.data, ...prevItems]);
      } else if (message.type === 'transfer') {
        setTransferEvents((prevItems) => [message.payload, ...prevItems]);
      }
    };
  
    // WebSocket onclose event listener
    ws.onclose = (event) => {
      console.log('WebSocket disconnected:', event);
      setTimeout(() => connect(), 3000); // Reconnect after 3 seconds
    };
  
    // WebSocket onerror event listener
    ws.onerror = (event) => {
      console.error('WebSocket encountered an error:', event);
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

  const  addContract = (address) => {
    if(contractsList.includes(address)) return;
    setContractsList(prevs => [
      address,
      ...prevs
    ]);
  }

  const removeContract = (index) => {

  }

  return (
    <Web3AuthProviderContext.Provider value={provider}>
      <Container fluid>
        <Row>
          <SideBar 
            contractsList={contractsList}
            addContract={addContract}
            removeContract={removeContract}/>
          <Col
            className="main-content p-0"
            tag="main"
            lg={{ span: 10, offset: 2 }}
            md={{ span: 9, offset: 3 }}
            sm={12}
          >
            <Header
              connectWalletPressed={login}
              logout={logout}
            />
            <Container fluid className="px-0">
              {
                status.length > 0 && <Alert variant='secondary' className="mb-0">
                  <i className="fa fa-info mx-2"></i> {status}
                </Alert>
              }
            </Container>
            <Container fluid className="main-content-container px-4">

              <Row noGutters className="page-header py-4">
              <PageTitle title="NFT Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
            </Row>

            <Row>
              <Col className="col-lg mb-4" lg={3} md={3} sm={6}>
              <SmallStats
                id={`small-stats-0`}
                variation="1"
                label={'MATIC/USDT'}
                value={1.1045}
                percentage={'4.70%'}
                increase={false}
                decrease={true}
              />
              </Col>
              </Row>

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
    </Web3AuthProviderContext.Provider>
  );




}

export default App;
