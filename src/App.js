import React from 'react';
import { BrowserRouter as Router ,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import BookingList from "./components/booking-list.component";
import EditBooking from "./components/edit-booking.component";
import CreateDoctor from "./components/create-doctor.component";
import CreateBooking from "./components/create-booking.component";
import DoctorsList from "./components/doctor-list.component";
import EditDoctor from "./components/edit-doctor.component";

function App() {
  return (
    <Router>
    <div className = "container">
      <Navbar/>
      <br/>
      <Route path = "/" exact component ={BookingList} />
      <Route path = "/book/:id" component ={EditBooking}/>
      <Route path = "/doctor"  component ={CreateDoctor} />
      <Route path = "/booking"  component ={CreateBooking} />
      <Route path = "/edit"  component={DoctorsList} />
      <Route path = "/update/:id" component={EditDoctor} />
    </div>
    </Router>
  );
}

export default App;
