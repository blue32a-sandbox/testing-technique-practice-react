import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Stopwatch from './part3/ques01/Stopwatch';
import Payment from './part3/ques02/Payment';
import AirConditioner from './part3/ques03/AirConditioner';
import Reservation from './part3/ques04/Reservation';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <div className="header">
            <Link to="/">Home</Link>|
            <Link to="/part3/ques01">StopWatch</Link>|
            <Link to="/part3/ques02">Payment</Link>|
            <Link to="/part3/ques03">AirConditioner</Link>|
            <Link to="/part3/ques04">Reservation</Link>
          </div>

          <div className="main">
            <Routes>
              <Route path={`/`} element={<Home />} />
              <Route path={`/part3/ques01`} element={<Stopwatch />} />
              <Route path={`/part3/ques02`} element={<Payment />} />
              <Route path={`/part3/ques03`} element={<AirConditioner />} />
              <Route path={`/part3/ques04`} element={<Reservation />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
