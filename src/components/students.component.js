import React, { Component } from "react";
import { Spring } from "react-spring";

export default class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  findGPA() {
    let data = this.props.students;
    let newData = [];
    data.map(function(elem) {
      elem.SecondYear = elem.StartYear + 1;
      elem.ThirdYear = elem.StartYear + 2;
    });
    data.map(function(elem) {
      let StartYear = elem.StartYear;
      let SecondYear = elem.SecondYear;
      let ThirdYear = elem.ThirdYear;
      let EndYear = elem.EndYear;
      elem.newGPARecord = [
        {
          [StartYear]: elem.GPARecord[0],
          [SecondYear]: elem.GPARecord[1],
          [ThirdYear]: elem.GPARecord[2],
          [EndYear]: elem.GPARecord[3]
        }
      ];
    });
    this.setState({ data });
  }

  render() {
    const studentList = this.state.data;
    const displayStudents = studentList.map(d => (
      <li key={d.Id}>
        Name: {d.Name} <br />
        2013 GPA: {d.newGPARecord["0"][2013]}{" "}
      </li>
    ));
    return (
      <div>
        <h1>Students</h1>
        <ul>
          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
            {props => <div style={props}>{displayStudents}</div>}
          </Spring>
        </ul>
      </div>
    );
  }
  componentDidMount() {
    this.findGPA();
  }
}
