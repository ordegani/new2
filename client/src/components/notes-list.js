import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../components/form/maincontainer.css";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.descriptio}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class NotesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get("https://artnote.herokuapp.com/exercise")
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteExercise(id) {
    console.log(id);
    axios
      .delete(`https://artnote.herokuapp.com/exercise/` + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }
  exerciseList() {
    return this.state.exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div className="list">
        <h3>My notes</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title and Description</th>
              <th>Personal notes</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
