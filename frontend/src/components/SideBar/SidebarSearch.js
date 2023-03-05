import React, {useState} from "react";
import {
  Form,
  InputGroup,
  Button
} from "react-bootstrap";

import {isValidEthAddress} from '../../utils/utils';

export default function SidebarSearch({addContract}) {

  const [inputValue, setInputValue] = useState('');

  const handleValueChanged = (event) => {
    setInputValue(event.target.value);
  }

  const handleButtonClick = () => {
    if(!isValidEthAddress(inputValue)) return;
    addContract(inputValue);
    setInputValue('');
  }

  return (
    <div style={{paddingLeft: '10px', paddingRight: '10px'}}>
    <Form >
    <InputGroup seamless className="ml-3">
    <Form.Control
          placeholder="Add contract"
          aria-label="Add contract"
          aria-describedby="basic-addon2"
          value={inputValue}
          onChange={handleValueChanged}
        />
        <Button onClick={handleButtonClick} variant="outline-secondary" id="button-addon2">
          Add
        </Button>
    </InputGroup>
  </Form>
  </div>
  );
};
