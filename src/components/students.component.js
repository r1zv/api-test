import React, { Component } from "react";
export default class Students extends Component {
  render() {
    const studentList = this.props.students;
    const displayStudents = studentList.map(d => (
      <li key={d.Id}>Name: {d.Name}</li>
    ));
    return (
      <div>
        <h1>Students</h1>
        <ul>{displayStudents}</ul>
      </div>
    );
  }
  componentDidMount() {
    console.log(this);
  }
}
