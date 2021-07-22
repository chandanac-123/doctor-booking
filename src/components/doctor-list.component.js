import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Doctors=props=>(
    <tr>
        <td>{props.doctors.doctorId}</td>
        <td>{props.doctors.doctorName}</td>
        <td>{props.doctors.department}</td>
        <td>
            <Link to={"/update/"+props.doctors._id}>edit</Link> | <a href="#" onClick={()=>{props.deleteDoctor(props.doctors._id)}}>delete</a>
        </td>
    </tr>
)

export default class DoctorsList extends Component{
    constructor(props){
        super(props);

        this.deleteDoctor =this.deleteDoctor.bind(this);

        this.state={doctors:[]};
    }

    componentDidMount(){
        axios.get('http://localhost:9000/doctors/')
            .then(response => {
                this.setState({doctors:response.data})
            })
            .catch((error)=> {
                console.log(error);
            })
    }

    deleteDoctor(id){
        axios.delete('http://localhost:9000/doctors/' +id)
            .then(res => console.log(res.data));

        this.setState({
            doctors:this.state.doctors.filter(el => el._id!==id)
        })
    }

    DoctorsList(){
        return this.state.doctors.map(currentdoctor =>{
            return <Doctors doctors={currentdoctor} deleteDoctor={this.deleteDoctor} key={currentdoctor._id}/>;
        })
    }

    render(){
        return(
            <div>
                <h1>Doctors List..!</h1>
                    <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Id</th>

                            <th>Name</th>

                            <th>Department</th>
                          
                            <th>Actions</th>
                        </tr>
                
                    </thead>
                    <tbody>
                        {this.DoctorsList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

