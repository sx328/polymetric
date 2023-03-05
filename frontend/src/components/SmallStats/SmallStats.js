import React from "react";
import classNames from "classnames";
import { Card } from "react-bootstrap";

export default function SmallStats({ label = 'Label', value = 0, percentage = 0, increase = true, decrease = false, variation = '1' }) {
    const cardClasses = classNames(
        "stats-small",
        variation && `stats-small--${variation}`
      );
  
      const cardBodyClasses = classNames(
        variation === "1" ? "p-0 d-flex" : "px-0 pb-0"
      );
  
      const innerWrapperClasses = classNames(
        "d-flex",
        variation === "1" ? "flex-column m-auto" : "px-3"
      );
  
      const dataFieldClasses = classNames(
        "stats-small__data",
        variation === "1" && "text-center"
      );
  
      const labelClasses = classNames(
        "stats-small__label",
        "text-uppercase",
        variation !== "1" && "mb-1"
      );
  
      const valueClasses = classNames(
        "stats-small__value",
        "count",
        variation === "1" ? "my-3" : "m-0"
      );
  
      const innerDataFieldClasses = classNames(
        "stats-small__data",
        variation !== "1" && "text-right align-items-center"
      );
  
      const percentageClasses = classNames(
        "stats-small__percentage",
        `stats-small__percentage--${increase ? "increase" : "decrease"}`
      );
  
      //const canvasHeight = variation === "1" ? 120 : 60;
  
      return (
        <Card small={true} className={cardClasses}>
          <Card.Body className={cardBodyClasses}>
            <div className={innerWrapperClasses}>
              <div className={dataFieldClasses}>
                <span className={labelClasses}>{label}</span>
                <h6 className={valueClasses}>{value}</h6>
              </div>
              <div className={innerDataFieldClasses}>
                <span className={percentageClasses}>{percentage}</span>
              </div>
            </div>
          </Card.Body>
        </Card>
      );
    
}