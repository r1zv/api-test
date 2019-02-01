import React, { Component } from "react";
import { Spring } from "react-spring";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import Students from "./components/students.component";

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
    var sum = 0;
    for (var i = 0; i < flattened.length; i++) {
      sum = sum + flattened[i];
    }
    let oGPA = sum / flattened.length;
    this.setState({ oGPA });
  }

  getAttendance() {
    const students = this.state.data;
    let date = 2013;
    let attended;
    let studentList = students.map(obj => {
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
    let studentList = this.state.studentList;
    let style = {
      visibility: "visible",
      opacity: 1,
      transition: "opacity 20s linear"
    };

    return (
      <Router>
        <div>
          <h1>
            <Spring
              from={{
                width: 100,
                padding: 0,
                transform: "translate3d(400px,0,0) scale(2) rotateX(90deg)",
                boxShadow: "0px 100px 150px -10px #2D3747",
                borderBottom: "0px solid white",
                shape: "M20,380 L380,380 L380,380 L200,20 L20,380 Z",
                textShadow: "0px 5px 0px white"
              }}
              to={{
                width: "auto",
                padding: 20,
                transform: "translate3d(0px,0,0) scale(1) rotateX(0deg)",
                boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.4)",
                borderBottom: "10px solid #2D3747",
                shape: "M20,20 L20,380 L380,380 L380,20 L20,20 Z",
                textShadow: "0px 5px 15px rgba(255,255,255,0.5)"
              }}
            >
              {props => <div style={props}>{greeting}</div>}
            </Spring>
          </h1>
          <ul>
            <li>
              Year:
              <Link to="/students">{this.state.year}</Link>
            </li>
            <li>Attendance: {this.state.attended}</li>
            <li>Overall GPA: {this.state.oGPA}</li>
          </ul>
          <br />
          <br />

          <Route
            path="/students"
            render={props => <Students students={this.state.studentList} />}
          />
        </div>
      </Router>
    );
  }
}

export default Summary;
