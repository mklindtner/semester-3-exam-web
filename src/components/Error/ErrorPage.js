import React from 'react'
import './ErrorPage.css'
import BodyClassName from 'react-body-classname';

const errorPage = () => {
    return(
        <div className="error">
        <div id="clouds">
        <div class="cloud x1"></div>
        <div class="cloud x1_5"></div>
        <div class="cloud x2"></div>
        <div class="cloud x3"></div>
        <div class="cloud x4"></div>
        <div class="cloud x5"></div>
    </div>
    <div class='c'>
        <div class='_404'>404</div>
        <hr></hr>
        <div class='_1'>THE PAGE</div>
        <div class='_2'>WAS NOT FOUND</div>
        <a class='error-btn' href='#'><span>BACK TO SAFETY </span></a>
        </div>
        </div>
        
    
    )
}
export default errorPage;