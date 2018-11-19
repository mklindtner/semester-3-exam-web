import React, {Component} from 'react'


class Layout extends Component{
    state={

    }
    render(){
    return(
      <>
    <header>
    <h1>Welcome to this the Tølbøllbook</h1>
    <p><span>We </span>don't steal your information, we make you feel like you're on vacation </p>
    </header>
    {this.props.children}
    </>
    )
  }
}


export default Layout;