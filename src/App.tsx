import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Background from './components/Background/Background';
import JPG from './images/background-image.jpg';
import WEBP from './images/background-image.webp';
import Loading from './components/Loading/Loading';
import Calendar from './components/Calendar/Calendar';
import AvailableTimes from './components/AvailableTimes/AvailableTimes';
import BookingForm from './components/BookingForm/BookingForm';
import Completion from './components/Completion/Completion';
import './App.css';

function App() {
  const [stage, setStage] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [availableDates, setAvailableDates] = useState<[[number, number]]>([[0, 0]])
  const [availableTimes, setAvailableTimes] = useState<string[]>([''])
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const updateCalendar = (selectedDate: Date) => {
    setDate(selectedDate)
    setLoading(true)
    const packet = { "selectedDate": selectedDate };
    fetch(process.env.REACT_APP_SELECT_DATE,
      {
        method: 'POST',
        body: JSON.stringify(packet)
      })
      .then(res => res.json())
      .then(data => {
        setAvailableTimes(data.freeslots)
        setLoading(false)
        setStage(1)
      })
      .catch(err => console.log(err))
  }

  const selectTime = (selectedTime: string) => {
    setSelectedTime(selectedTime)
    setStage(2)
  }

  const handleSubmit = (firstName: string, lastName: string, telephone: string, email: string, address: string, medium: string, handle: string, mop: string, policy: string, auth: string, dob: string, privacy: boolean) => {
    setLoading(true)
    const details = {
      firstName: firstName,
      lastName: lastName,
      startTime: selectedTime,
      telephone: telephone,
      email: email,
      address: address,
      medium: medium,
      handle: handle,
      mop: mop,
      policy: policy,
      auth: auth,
      dob: dob,
      privacy: privacy
    }
    fetch(process.env.REACT_APP_SUBMIT,
      {
        method: 'POST',
        body: JSON.stringify(details)
      })
      .then(res => {
        setStage(3)
        setLoading(false)
      })
  }

  useEffect(() => {
    const data = { "year": date.getFullYear() };
    fetch(process.env.REACT_APP_AVAILABILITY,
      {
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => setAvailableDates(res))
      .catch(err => console.log(err))
  }, [date])

  return (
    <div className="App">

      <Sidebar
        stage={stage}
      />

      <div className="portal" style={{ WebkitOverflowScrolling: 'auto' }}>
        <Background
          jpg={JPG}
          webp={WEBP}
        />
        {
          loading ? //if loading show loading icon
            <Loading /> :
            stage === 0 ?
              <Calendar
                availableDates={availableDates}
                date={date}
                updateCalendar={(selectedDate: Date) => updateCalendar(selectedDate)}
              />
              :
              stage === 1 ?
                <>
                  <AvailableTimes
                    availableTimes={availableTimes}
                    selectTime={(selectedTime: string) => selectTime(selectedTime)}
                  />
                  <button
                    className="back-to-calendar"
                    onClick={() => setStage(0)}
                    style={{ marginBottom: '100px' }}
                  >
                    Back To Calendar
                  </button>
                </> :
                stage === 2 ?
                  <div className="scroll-form">
                    <BookingForm
                      selectedTime={selectedTime}
                      handleSubmit={(firstName: string, lastName: string, telephone: string, email: string, address: string, medium: string, handle: string, mop: string, policy: string, auth: string, dob: string, privacy: boolean) => handleSubmit(firstName, lastName, telephone, email, address, medium, handle, mop, policy, auth, dob, privacy)}
                    />
                    <button
                      className="back-to-calendar"
                      onClick={() => setStage(0)}
                    >
                      Back To Calendar
                    </button>
                    <button
                      className="back-to-calendar"
                      onClick={() => setStage(1)}
                      style={{ marginBottom: '100px' }}
                    >
                      Select A Different Time
                    </button>
                  </div> :
                  stage === 3 ?
                    <Completion /> :
                    <>nothing is here</>
        }
      </div>

    </div>
  );
}

export default App;
