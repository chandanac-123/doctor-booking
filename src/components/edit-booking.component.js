import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";    

export default class EditBooking extends Component{

    constructor(props){
        super(props);

        this.onChangeDoctorId=this.onChangeDoctorId.bind(this);
        this.onChangeBookingId=this.onChangeBookingId.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeAge=this.onChangeAge.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onChangePhone=this.onChangePhone.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            username:'',
            description:'',
            duration:0,
            date:new Date(),
            users:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:9000/booking/'+this.props.match.params.id)
            .then(response =>{
                this.setState({
                doctorId:response.data.doctorId,
                bookingId:response.data.bookingId,
                name:response.data.name,
                age:response.data.age,
                date:new Date(response.data.date),
                phone:response.data.phone
                })
            })

            .catch(function(error){
                console.log(error);
            })

        axios.get('http://localhost:9000/doctors/')
            .then(response =>{
                if(response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user =>user.doctorId),
                    })
                }
            })
        
    }

    onChangeDoctorId(e){
        this.setState({
            doctorId: e.target.value
        });
    }

    onChangeBookingId(e){
        this.setState({
            bookingId: e.target.value
        });
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangeAge(e){
        this.setState({
            age: e.target.value
        });
    }

    onChangeDate(date){
        this.setState({
            date: date
        });
    }

    onChangePhone(e){
        this.setState({
            phone: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const book = {
            
            doctorId:this.state.doctorId,
            bookingId:this.state.bookingId,
            name:this.state.name,
            age:this.state.age,
            date:this.state.date,
            phone:this.state.phone
        }

        console.log(book);

        axios.post('http://localhost:9000/booking/' +this.props.match.params.id, book)
        .then(res => console.log(res.data));

        window.location ='/';
    }

    render(){
        return(
            <div>
                <h3>Edit Booking</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Doctor-Id:</label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.doctorId}
                            onChange={this.onChangeDoctorId}>
                            {
                                this.state.users.map(function(user){
                                    return <option
                                    key={user}
                                    value={user}>{user}
                                    </option>
                                })
                            }
                        </select>
                 </div> 
            <div className="form-group">
                <label>Booking-Id</label> 
                <input type="Number"
                    required
                    className="form-control"
                    value={this.state.bookingId}
                    onChange={this.onChangeBookingId}
                    />
            </div>
            <div className="form-group">
                <label>Name</label> 
                <input 
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    />
            </div>
            <div className="form-group">
                <label>Age</label> 
                <input 
                    type="text"
                    className="form-control"
                    value={this.state.age}
                    onChange={this.onChangeAge}
                    />
            </div>
            <div className="form-group">
                <label>Date</label> 
                <div>
                    <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                    />
                </div>
            </div>
            <div className="form-group">
                <label>Phone</label> 
                <input 
                    type="text"
                    className="form-control"
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    />
            </div>

            <div className="form-group">
                <input type="submit" value="Edit Booking" className="btn btn-primary"/>
            </div>
        </form>
            </div>
        )
    }
}

