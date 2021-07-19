import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand" >Yeah Let's Book Here!</Link>
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                    <Link to="/" className="nav-link">Booking List</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/booking" className="nav-link">Create Booking</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/edit" className="nav-link">Doctors List</Link>
                    </li>
                    <li className="navbar-item">
                    < Link to="/doctor" className="nav-link">Add Doctors</Link>
                    </li>
                    </ul>
                </div>
            </nav>
        );
    }
}