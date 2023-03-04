import { Card } from "react-bootstrap";
import SaleItem from "./SaleItem";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import '../../shards-dashboards.1.1.0.css';
import './SalesList.css';
import { Component } from "react";

 class SalesList extends Component {

      render() {
        const {sales, title} = this.props;
        const listItems = sales.map((item) => (
            <div key={item.uuid} className="blog-comments__item d-flex p-3" >
              <SaleItem item={item}/>
            </div>
        ))

        return (
            <>
            <Card 
            small='true' 
            className="blog-comments"
            style={{height: '500px', overflow: 'hidden'}}>
                <Card.Header  className="border-bottom">
                <h6 className="m-0">{title}</h6>
                </Card.Header>
                <Card.Body className="p-0" style={{height: '100%', overflowY: 'auto'}}>
                <div style={{height: '100%'}}>
                <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
                {listItems}
                </ReactCSSTransitionGroup>
                </div>
                </Card.Body>
            </Card>
            </>
        );
      }
    

    
}

export default SalesList;