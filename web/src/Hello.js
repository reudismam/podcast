import React from 'react';
import {useState} from 'react';


const Button = (props) => {
    const [cont, setCont] = useState(0);

    const increment = () => {
        setCont(cont + 1);
    }
    return (
        <>
        <button>{props.title}</button>
        <h1>Valor do contador: {cont}</h1>
        <button onClick={increment}>Increment</button>
        </>
    );
}

export default Button;