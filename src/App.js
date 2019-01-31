import React, { Component } from "react";
import axios from "axios";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      year: "2013",
      studentList: [],
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
      await this.getOGPA();
    } catch (error) {
      console.log(error);
    }
  }

  getOGPA() {
    const students = this.state.studentList;
    let GPAList = [];
    students.forEach(function(elem, i) {
      GPAList.push(elem.GPARecord);
    });
    var flattened = GPAList.reduce((acc, curr) => acc.concat(curr), []);
    console.log(flattened);
    var sum = 0;
    for (var i = 0; i < flattened.length; i++) {
      sum = sum + flattened[i];
    }
    let oGPA = sum / flattened.length;
    console.log(oGPA);
    this.setState({ oGPA });
  }

  getAttendance() {
    const students = this.state.data;
    let date = 2013;
    let attended;
    let studentList = students.map(obj => {
      // startYear vs StartYear was a time sink!
      let start = obj.StartYear;
      let end = obj.EndYear;
      let student = {};
      if (date >= start && date <= end) {
        student = obj;
        return student;
      } else {
      }
    });
    studentList = studentList.filter(v => v);
    this.setState({ studentList });
    attended = studentList.length;
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
