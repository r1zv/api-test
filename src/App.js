import React, { Component } from "react";
import axios from "axios";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      year: "2013",
      attendance: null,
      oGPA: null
    };
    this.getAttendance = this.getAttendance.bind(this);
    this.getOGPA = this.getOGPA.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await axios
        .get("http://apitest.sertifi.net/api/Students")
        .then(res => {
          const data = res.data;
          this.setState({ data });
        });
      this.getAttendance();
    } catch (error) {
      console.log(error);
    }
  }

  getOGPA() {}
  getAttendance() {}
  render() {
    var greeting = "Student Summary";
    return (
      <div>
        <h1>{greeting}</h1>
        <ul>
          <li>Year: {this.state.year}</li>
          <li>Attendance: {this.state.attendace}</li>
          <li>Overall GPA: {this.state.oGPA}</li>
        </ul>
      </div>
    );
  }
}

export default Summary;
