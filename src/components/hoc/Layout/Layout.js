import React, { Component } from 'react'


class Layout extends Component {
  state = {

  }
  render() {
    return (
      <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Social</a>
        
        
        </nav>
      </header>
      <main>
        {this.props.children}
      </main>
    </>
    )
  }
}


export default Layout;