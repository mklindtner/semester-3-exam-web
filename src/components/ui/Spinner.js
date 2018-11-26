import React from 'react'
import './Spinner.css'

function getClasses(props) {
    const classes = [];
    classes.push("spinner-container");
    if (props.loading)
        classes.push("loading");

    return classes.join(" ");
}

const spinner = (props) => (
    <div className={getClasses(props)}>
        {props.loading ?
            <div className="loader">Loading...</div> : props.children}
    </div>
);



export default spinner;