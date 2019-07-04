import React, { Component } from 'react'

 class Notification extends Component {
    render() {
        return (
            <div>
                <span style={{color: 'red'}} className="message-system">{this.props.message.content}</span>
            </div>
        )
    }
}

export default Notification
