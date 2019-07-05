import React, { Component } from 'react'

 class Header extends Component {

    render() {

        return (

            <nav className="navbar" style={{display: 'flex', justifyContent:'space-between'}}>

            <a href="/" className="navbar-brand">Chatty</a>

            <a href="/" className="navbar-brand">{this.props.connectedUser} User Connected</a>

             </nav>
        )
    }
}

export default Header;
