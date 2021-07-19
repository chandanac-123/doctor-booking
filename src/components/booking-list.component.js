import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Booking=props=>(
    <tr>
        <td>{props.booking.doctorId}</td>
        <td>{props.booking.bookingId}</td>
        <td>{props.booking.name}</td>
        <td>{props.booking.age}</td>
        <td>{props.booking.date.substring(0,10)}</td>
        <td>{props.booking.phone}</td>
        <td>
            <Link to={"/edit/"+props.booking._id}>edit</Link> | <a href="#" onClick={()=>{props.deleteBooking(props.booking._id)}}>delete</a>
        </td>
    </tr>
)

export default class BookingList extends Component{
    constructor(props){
        super(props);

        this.deleteBooking =this.deleteBooking.bind(this);

        this.state={booking:[]};
    }

    componentDidMount(){
        axios.get('http://localhost:9000/booking/')
            .then(response => {
                this.setState({booking:response.data})
            })
            .catch((error)=> {
                console.log(error);
            })
    }

    deleteBooking(id){
        axios.delete('http://localhost:9000/booking/' +id)
            .then(res => console.log(res.data));

        this.setState({
            booking:this.state.booking.filter(el => el._id!==id)
        })
    }

    BookingList(){
        return this.state.booking.map(currentbooking =>{
            return <Booking booking={currentbooking} deleteBooking={this.deleteBooking} key={currentbooking._id}/>;
        })
    }

    render(){
        return(
            <div>
                <h1>Booking...!</h1>
                    <table className="table">
                    <thead className="thead-light">
                        <tr>
                            
                            <th>Doctor_ID</th>
                            <th>Booking_ID</th>

                            <th>Name</th>

                            <th>Age</th>

                            <th>Date</th>

                            <th>Phone</th>
                            
                            <th>Actions</th>
                        </tr>
                
                    </thead>
                    <tbody>
                        {this.BookingList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

