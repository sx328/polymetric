import {Row, Col } from "react-bootstrap";
import './SaleItem.css';

export default function SaleItem({ item }) {
    return (
        <>
            {/* Avatar */}
            <div className="blog-comments__avatar mr-3">
                <a href={item.image} target="_blank" rel='noreferrer'><img src={item.image} alt={item.uuid} /></a>
            </div>

            {/* Content */}
            <div className="blog-comments__content" style={{width: '100%'}}>
                {/* Content :: Title */}
                <div className="blog-comments__meta text-mutes">
                    <a className="text-secondary" href={'https://polygonscan.com/address/' + item.tokenContractAddress} target="_blank" rel='noreferrer'>
                    {
                        String(item.tokenContractAddress).substring(0, 6) +
                        "..." +
                        String(item.tokenContractAddress).substring(38)
                    }
                    </a>{" "}
                </div>

                {/* Content :: Body */}
                <p className="m-0 my-1 mb-2 text-muted">
                    <Row>

                    <Col
                            md={6}
                            sm={12}>
                            Price: <br/>
                            <span className="text-secondary">
                                {item.currency} {item.symbole}
                            </span>
                        </Col>
                        <Col
                            md={6}
                            sm={12}>
                            Sale Price: <br/>
                            <span className="text-secondary">
                                {item.salePrice} {item.saleCurrency}
                            </span>
                        </Col>

                    </Row>
                </p>

            </div>
        </>
        /*<>
            <div className="sale-item">
            <Row className='no-gutters'>
                <Col md={4}>
                    <img variant="top" alt="" className="img-fluid" src={item.tokenMetadata.tokenURI} />
                </Col>
                <Col md={7}>
                    <div className="sale-item-body">
                        <h4># {item.tokenMetadata.tokenId}</h4>
                        <ul className="sale-item-detail">
                        <li>Price: {item.salePrice} {item.saleCurrency}</li>
                        <li>Recipient: {
                                String(item.tokenMetadata.recipient).substring(0, 6) +
                                "..." +
                                String(item.tokenMetadata.recipient).substring(38)
                            }
                            </li>
                            <li>Contract: {
                                String(item.tokenContractAddress).substring(0, 6) +
                                "..." +
                                String(item.tokenContractAddress).substring(38)
                            }
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
            </div>
        </>*/
    );
}