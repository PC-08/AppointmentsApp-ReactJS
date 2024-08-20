// Write your code here

import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    startutton: false,
    userTitle: '',
    userDate: '',
    appointmentsArray: [],
  }

  onStarFilter = () => {
    const {startutton} = this.state
    this.setState({startutton: !startutton})
  }

  onStarClicked = uid => {
    this.setState(prevState => ({
      appointmentsArray: prevState.appointmentsArray.map(eachApp => {
        if (eachApp.id === uid) {
          return {...eachApp, isStared: !eachApp.isStared}
        }
        return eachApp
      }),
    }))
  }

  onUserEnterTitle = event => {
    this.setState({userTitle: event.target.value})
  }

  onUserSelectDate = event => {
    this.setState({userDate: event.target.value})
  }

  onSumbit = event => {
    event.preventDefault()
    const {userTitle, userDate} = this.state

    if (userTitle.length !== 0 && userDate.length !== 0) {
      const requiredDate = format(new Date(userDate), 'dd MMMM yyyy, EEEE')

      const newAppointment = {
        id: uuidv4(),
        userTitle,
        requiredDate,
        isStared: false,
      }

      this.setState(prevState => ({
        appointmentsArray: [...prevState.appointmentsArray, newAppointment],
        userDate: '',
        userTitle: '',
      }))
    }
  }

  render() {
    const {userTitle, userDate, appointmentsArray, startutton} = this.state

    let filteredRes = []

    if (startutton === true) {
      filteredRes = appointmentsArray.filter(
        eachApp => eachApp.isStared === true,
      )
    } else {
      filteredRes = [...appointmentsArray]
    }

    return (
      <div className="bg">
        <div className="card">
          <div className="top-section">
            <form className="form-container">
              <h1 className="head">Add Appointment</h1>

              <label htmlFor="Nameid" className="label">
                TITLE
              </label>

              <input
                onChange={this.onUserEnterTitle}
                className="input-filed"
                id="Nameid"
                type="text"
                value={userTitle}
              />

              <label htmlFor="Dateid" className="label">
                DATE
              </label>
              <input
                onChange={this.onUserSelectDate}
                className="input-filed"
                id="Dateid"
                type="date"
                value={userDate}
              />
              <button onClick={this.onSumbit} className="add-btn" type="submit">
                Add
              </button>
            </form>
            <div className="">
              <img
                className="img"
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              />
            </div>
          </div>
          <hr className="line" />
          <div className="botom-sec-box1">
            <h1 className="head">Appointments</h1>
            <button
              onClick={this.onStarFilter}
              className="starred"
              type="button"
            >
              Starred
            </button>
          </div>
          <ul className="ul">
            {filteredRes.map(eachApp => (
              <AppointmentItem
                key={eachApp.id}
                uid={eachApp.id}
                userTitle={eachApp.userTitle}
                requiredDate={eachApp.requiredDate}
                isStared={eachApp.isStared}
                onStarClicked={this.onStarClicked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
