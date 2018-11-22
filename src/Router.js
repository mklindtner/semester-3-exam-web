import React from "react";
import App from "./App";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default () => {
    return (
        <Router>
            <Route path="*" component={router =>
                <App router={router}/>
            } />
        </Router>
    );
}
