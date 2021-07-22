import React, {Component} from 'react';
import axios from 'axios';  

export default class EditDoctor extends Component{

    constructor(props){
        super(props);

        this.onChangeDoctorId=this.onChangeDoctorId.bind(this);
        this.onChangeDoctorName=this.onChangeDoctorName.bind(this);
        this.onChangeDepatment=this.onChangeDepatment.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            doctorId:0,
            doctorName:'',
            department:'',
            users:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:9000/doctors/'+this.props.match.params.id)
            .then(response =>{
                this.setState({
                doctorId:response.data.doctorId,
                doctorName:response.data.doctorName,
                department:response.data.department
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

    onChangeDoctorName(e){
        this.setState({
            doctorName: e.target.value
        });
    }

    onChangeDepatment(e){
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

        axios.post('http://localhost:9000/doctors/' +this.props.match.params.id, doctor)
        .then(res => console.log(res.data));

        window.location ='/';
    }

    render(){
        return(
            <div>
                <h3>Edit Doctor</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Id:</label>
                        {/* <select ref="userInput"
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
                        </select> */}
                    <input type="Number"
                    required
                    className="form-control"
                    value={this.state.doctorId}
                    onChange={this.onChangeDoctorId}
                    />
                 </div> 
            <div className="form-group">
                <label>Name</label> 
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.doctorName}
                    onChange={this.onChangeDoctorName}
                    />
            </div>
            <div className="form-group">
                <label>Department</label> 
                <input 
                    type="text"
                    className="form-control"
                    value={this.state.department}
                    onChange={this.onChangeDepatment}
                    />
            </div>
            
            <div className="form-group">
                <input type="submit" value="Edit Doctor" className="btn btn-primary"/>
            </div>
        </form>
            </div>
        )
    }
}

