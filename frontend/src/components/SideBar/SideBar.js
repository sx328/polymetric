import { Col, Navbar, NavbarBrand } from "react-bootstrap";
import SidebarSearch from "./SidebarSearch";

export default function SideBar() {
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
      <SidebarSearch/>
    </Col>
  );
}