import { useEffect, useState, useRef } from "react";
import on from '../img/fan-gif-on.gif';
import off from '../img/fan-gif-off.png';
import light_off from '../img/light-off.png';
import light_on from '../img/light-on.gif';
import Paho from 'paho-mqtt';
import React from "react";

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const Action = (props) => {
    const { children } = props;
    const publish = (topic, data) => {
        var message = new Paho.Message(data);
        message.destinationName = topic;
        children.send(message);
    }
    const [fan, setFan] = useState("OFF");
    const [light, setLight] = useState("OFF");
    const handleFan = () => {
        if (fan === "OFF") {
            setFan("ON");
            publish("Test2", "Fan: 0");
        }
        else {
            setFan("OFF");
            publish("Test2", "Fan: 1");

        }
    }
    const handleLight = () => {
        if (light === "OFF") {
            setLight("ON");
            publish("Test", "Light: 0");

        }
        else {
            setLight("OFF");
            publish("Test", "Light: 1");
        }
    }
    const handleSend = () => {
        var msg = "Light: " + (light === "OFF" ? "1" : "0") + ", Fan: " + (fan === "OFF" ? "1" : "0");
        publish("Test", msg);
        console.log(msg);
    }

    useInterval(() => {
        handleSend();
    }, 1000);
    // useEffect(() => {

    // }, [fan, light]);

    return (
        <div className="container">
            <div className="row m-0 bg-dark ">
                <div className="h2 text-light p-1">Điều khiển thiết bị</div>
            </div>

            <div className="row m-0">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="text-center">
                        {
                            (fan === "OFF" ? (<img src={on} alt="" />) : (<img src={off} alt="" />))
                        }


                    </div>
                    <div className="text-center w-100">
                        <button className={fan === "OFF" ? "btn btn-danger" : "btn btn-success"} onClick={handleFan}>{fan}</button>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="text-center">
                        {
                            (light === "OFF" ? (<img src={light_on} width="65%" alt="" />) : (<img src={light_off} width="65%" alt="" />))
                        }


                    </div>
                    <div className="text-center w-100">
                        <button className={light === "OFF" ? "btn btn-danger" : "btn btn-success"} onClick={handleLight}>{light}</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Action;