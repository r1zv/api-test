import React, { Component } from "react";
import axios from "axios";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      year: "2013",
      attended: null,
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
      await this.getAttendance();
    } catch (error) {
      console.log(error);
    }
  }

  getOGPA() {}

  getAttendance() {
    const students = this.state.data;
    let date = 2013;
    debugger;
    let attended;
    let attendance = students.map(obj => {
      let start = obj.StartYear;
      let end = obj.EndYear;
      let student = {};
      if (date >= start && date <= end) {
        student = obj;
        return student;
      } else {
      }
    });
    attendance = attendance.filter(v => v);
    attended = attendance.length;
    this.setState({ attended });
  }

  render() {
    let greeting = "Student Summary";
    let attendance = this.state.attendance;

    return (
      <div>
        <h1>{greeting}</h1>
        <ul>
          <li>Year: {this.state.year}</li>
          <li>Attendance: {this.state.attended}</li>
          <li>Overall GPA: {this.state.oGPA}</li>
        </ul>
      </div>
    );
  }
}

export default Summary;
