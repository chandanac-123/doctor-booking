import React, {Component} from 'react';
import axios from 'axios';

export default class CreateDoctor extends Component{
    constructor(props){
        super(props);

        this.onChangeDoctorId=this.onChangeDoctorId.bind(this);
        this.onChangeDoctorName=this.onChangeDoctorName.bind(this);
        this.onChangeDepartment=this.onChangeDepartment.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            doctorId:0,
            doctorName:"",
            department:"",
        }
    }

    onChangeDoctorId(e){
        this.setState({
            doctorId: e.target.value
        });
    }

    onChangeDoctorName(e){
        this.setState({
            doctorName: e.target.value
        });
    }

    onChangeDepartment(e){
        this.setState({
            department: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const doctor = {
            
            doctorId:this.state.doctorId,
            doctorName:this.state.doctorName,
            department:this.state.department
        }

        console.log(doctor);

        axios.post('http://localhost:9000/doctors/' , doctor)
            .then(res => console.log(res.data));

        this.setState({
            doctorId:0,
            doctorName:'',
            department:''
        })
    }

    render(){
        return(
            <div>
                <h3>Add</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Id:</label>
                        <input type="Number"
                            required
                            className="form-control"
                            value={this.state.doctorId}
                            onChange={this.onChangeDoctorId}
                            />
                    </div>

                    <div className="form-group">
                        <label>Name:</label> 
                        <input type="Text"
                        required
                        className="form-control"
                        value={this.state.doctorName}
                        onChange={this.onChangeDoctorName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Department:</label> 
                        <input type="Text"
                        required
                        className="form-control"
                        value={this.state.department}
                        onChange={this.onChangeDepartment}
                        />
                    </div>

                        <div className="form-group">
                            <input type="submit" value="Add Doctor" className="btn btn-primary" />
                        </div>

                </form>

            </div>
        )
    }
}

