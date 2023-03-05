import { Col, Navbar, NavbarBrand, Table } from "react-bootstrap";
import SidebarSearch from "./SidebarSearch";

export default function SideBar({contractsList, addContract, removeContract}) {
  return (
    <Col
      className="main-sidebar px-0 col-12 open"
      tag="aside"
      lg={2}
      md={3}
    >


      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
        >
          <NavbarBrand
            className="w-100 mr-0"
            href="#"
            style={{ lineHeight: "25px" }}
          >
            <div className="d-table m-auto">
              <span className="d-none d-md-inline ml-1">
                <b>POLYMETRIC</b>
              </span>
            </div>
          </NavbarBrand>
        </Navbar>
      </div>
      <div style={{padding: '10px'}}>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Tracked Contracts</th>
        </tr>
      </thead>
      <tbody>
          {contractsList.map((contract, idx) => 
            <tr key={idx}><td>
              {String(contract).substring(0, 6) +
              "..." +
              String(contract).substring(38)}
            </td></tr>
          )}
          </tbody>
        </Table>
      </div>
      <SidebarSearch addContract={addContract}/>
    </Col>
  );
}