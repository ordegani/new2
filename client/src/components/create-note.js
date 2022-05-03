import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../components/form/maincontainer.css";
import "./form/maincontainer.css";
import { withRouter } from "react-router";

class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDescriptio = this.onChangeDescriptio.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description:
        this.props.save.title +
        ", " +
        this.props.save.artistName +
        ", " +
        this.props.save.completitionYear,
      descriptio:
        "for more info: " +
        `https://www.wikiart.org/en/${this.props.save.title}/`,
      duration: 0,
      date: new Date(),
    };
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDescriptio(e) {
    this.setState({
      descriptio: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      description: this.state.description,
      descriptio: this.state.descriptio,
      duration: this.state.duration,
      date: this.state.date,
      // id:this.state.id
    };

    console.log(exercise);

    axios
      .post("https://artnote.herokuapp.com/exercise", exercise)
      .then((res) => this.props.history.push("/list"));
    // window.location = '/list';
  }

  render() {
    return (
      <div className="noteImg">
        {this.props.save && (
          <img className="image" src={this.props.save.image} alt="image"></img>
        )}
        <form className="form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title and Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={
                this.props.save
                  ? this.state.description
                  : "Oops, you didn't choose an artwork"
              }
              onChange={this.onChangeDescription}
            />
          </div>

          <label>Personal Notes: </label>
          <input
            type="text"
            required
            className="form-control"
            value={
              this.props.save
                ? this.props.save && this.state.descriptio
                : "Choose an artwork and fill me up"
            }
            onChange={this.onChangeDescriptio}
          />
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
            <div></div>
          </div>

          <div className="form-group">
            <input type="submit" value="Save" className="createNoteBtn" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(CreateExercise);
