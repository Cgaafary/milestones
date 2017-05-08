import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut() {
        this.props.handleSignOut(); 
    }

    render() {
        const { fullName, userType } = this.props.currentUser
            if (userType === "FACULTY") {
                return (
                    <div>
                        <Link to='/'><button>Student List</button></Link>
                        <button onClick={this.handleSignOut}>Sign out</button>
                        <p>Welcome {fullName}</p>
                    </div>
                );
            } else {
                return (
                    <div>
                        <button onClick={this.handleSignOut}>Sign out</button>
                        <p>Welcome {fullName}</p>
                    </div>
                );
            }
    }
}

export default Header;