import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '@mui/material/Slider';
import {
  bridgeReceiveIntegerFromNative,
  bridgeReceiveBooleanFromNative,
  bridgeReceiveStringFromNative,
  bridgeReceiveObjectFromNative,
} from "@crestron/ch5-crcomlib";
import { publishEvent } from '@crestron/ch5-crcomlib';
import { useSubscribeAnalog, useSubscribeSerial } from '@norgate-av/react-hooks';

(window as any)["bridgeReceiveIntegerFromNative"] = bridgeReceiveIntegerFromNative;
(window as any)["bridgeReceiveBooleanFromNative"] = bridgeReceiveBooleanFromNative;
(window as any)["bridgeReceiveStringFromNative"] = bridgeReceiveStringFromNative;
(window as any)["bridgeReceiveObjectFromNative"] = bridgeReceiveObjectFromNative;

function App() {

  const opacityValue = useSubscribeAnalog("1");
  const textResponse = useSubscribeSerial("1");

  const [color, setColor] = useState("253, 67, 67");
  const [opacity, setOpacity] = useState(1);
  const [background, setBackground] = useState("rgba(253,67,67,1)");

  const triggerButtonOne = () => {
    setColor("253, 67, 67");
    setBackground(`rgba(253, 67, 67,${opacity})`);
    publishEvent('b', "1", true);
    publishEvent('b', "1", false);
  }

  const triggerButtonTwo = () => {
    setColor("132, 202, 19");
    setBackground(`rgba(132, 202, 19,${opacity})`);
    publishEvent('b', "2", true);
    publishEvent('b', "2", false);
  }

  const triggerButtonThree = () => {
    setColor("232, 213, 44");
    setBackground(`rgba(232, 213, 44,${opacity})`);
    publishEvent('b', "3", true);
    publishEvent('b', "3", false);
  }

  const updateSliderValue = (value: number) => {
    setOpacity(value/100);
    setBackground(`rgba(${color},${value/100})`);
    publishEvent('n', "1", value);
    return `${value}`;
  }


  return (
    <div className="App">
      <h1>React Playground</h1>
      <div className="ButtonList" style={{backgroundColor:background}}>
        <p>{textResponse === "" ? "Red" : textResponse}</p>
        <Button className="Button" size='lg' onClick={triggerButtonOne}>Red</Button>
        <Button className="Button" size='lg' onClick={triggerButtonTwo}>Green</Button>
        <Button className="Button" size='lg' onClick={triggerButtonThree}>Yellow</Button>
      </div>
      <div className="Slider">
        <p>Opacity: {textResponse === "" ? "100" : opacity}%</p>
        <Slider sx={{width: 800}} defaultValue={100} getAriaValueText={updateSliderValue}></Slider>        
      </div>
    </div>
  );
}

export default App;
