import React, { useState } from 'react';

const StatusType = {
  HOTEL_SELECTION: 'HOTEL_SELECTION',
  FAIL_HOTEL_SELECTION: 'FAIL_HOTEL_SELECTION',
  DATE_SELECTION: 'DATE_SELECTION',
  FAIL_DATE_SELECTION: 'FAIL_DATE_SELECTION',
  INPUT_GUEST_INFORMATION: 'INPUT_GUEST_INFORMATION',
  FINAL_CONFIRMATION: 'FINAL_CONFIRMATION',
  COMPLETE_RESERVATION: 'COMPLETE_RESERVATION',
  FAIL_RESERVATION: 'FAIL_RESERVATION',
} as const;
type Status = typeof StatusType[keyof typeof StatusType];

export default function Reservation() {
  const [status, setStatus] = useState<Status>(StatusType.HOTEL_SELECTION);
  const handleStatus = (status: Status) => {
    setStatus(status);
  };
  const [day, setDay] = useState("1");
  const handleDay = (day: string) => {
    setDay(day);
  }

  let content = <HotelSelection handleStatus={handleStatus} />;
  if (status === StatusType.DATE_SELECTION) {
    content = <DateSelection handleStatus={handleStatus} handleDay={handleDay} day={day} />;
  } else if (status === StatusType.FAIL_HOTEL_SELECTION) {
    content = <FailHotelSelection handleStatus={handleStatus} />;
  } else if (status === StatusType.FAIL_DATE_SELECTION) {
    content = <FailDateSelection handleStatus={handleStatus} />;
  } else if (status === StatusType.INPUT_GUEST_INFORMATION) {
    content = <InputGuestInformaton handleStatus={handleStatus} />;
  } else if (status === StatusType.FINAL_CONFIRMATION) {
    content = <FinalConfirmation handleStatus={handleStatus} day={day} />;
  } else if (status === StatusType.COMPLETE_RESERVATION) {
    content = <CompleteReservation />;
  } else if (status === StatusType.FAIL_RESERVATION) {
    content = <FailReservation />;
  }

  return (
    <>
      <h1>ホテル予約サイトの予約システム</h1>
      {content}
    </>
  );
}

type HandleStatus = (status: Status) => void;
type HandleDay = (day: string) => void;

const HotelSelection = ({handleStatus}: {handleStatus: HandleStatus}) => {
  const [hotel, setHotel] = useState("1");
  const handleButtonClick = () => {
    if (hotel === "2") {
      handleStatus(StatusType.FAIL_HOTEL_SELECTION);
    } else {
      handleStatus(StatusType.DATE_SELECTION);
    }
  }
  return (
    <>
      <h2>ホテル選択</h2>
      <select onChange={(e) => setHotel(e.target.value)}>
        <option value="1" selected={hotel === "1"}>ホテル空きあり</option>
        <option value="2" selected={hotel === "2"}>ホテル空きなし</option>
      </select>
      <button onClick={handleButtonClick}>選択</button>
    </>
  );
};

const FailHotelSelection = ({handleStatus}: {handleStatus: HandleStatus}) => {
  const handleButtonClick = () => {
    handleStatus(StatusType.HOTEL_SELECTION);
  }
  return (
    <>
      <h2>ホテル選択失敗</h2>
      <button onClick={handleButtonClick}>再度選択する</button>
    </>
  );
};

const DateSelection = ({handleStatus, handleDay, day}: {handleStatus: HandleStatus, handleDay: HandleDay, day: string}) => {
  const handleSelectButtonClick = () => {
    if (day === "1") {
      handleStatus(StatusType.FAIL_DATE_SELECTION);
    } else {
      handleStatus(StatusType.INPUT_GUEST_INFORMATION);
    }
  }
  const handleCancelButtonClick = () => {
    handleStatus(StatusType.HOTEL_SELECTION);
  }
  const days = [...Array(31)].map((_, i) => (i + 1).toString());
  return (
    <>
      <h2>宿泊日選択</h2>
      <select onChange={(e) => handleDay(e.target.value)}>
        {days.map((v) => <option key={v} value={v} selected={v === day}>{v}</option>)}
      </select>
      <button onClick={handleSelectButtonClick}>選択</button>
      <button onClick={handleCancelButtonClick}>キャンセル</button>
    </>
  );
};

const FailDateSelection = ({handleStatus}: {handleStatus: HandleStatus}) => {
  const handleCancelButtonClick = () => {
    handleStatus(StatusType.DATE_SELECTION);
  }
  return (
    <>
      <h2>宿泊日選択失敗</h2>
      <button onClick={handleCancelButtonClick}>再度選択する</button>
    </>
  );
};

const InputGuestInformaton = ({handleStatus}: {handleStatus: HandleStatus}) => {
  const handleCancelButtonClick = () => {
    handleStatus(StatusType.HOTEL_SELECTION);
  }
  const handleSubmitButtonClick = () => {
    handleStatus(StatusType.FINAL_CONFIRMATION);
  }
  return (
    <>
      <h2>宿泊者情報入力</h2>
      <input type="text" name="name" />
      <button onClick={handleSubmitButtonClick}>入力完了</button>
      <button onClick={handleCancelButtonClick}>キャンセル</button>
    </>
  );
};

const FinalConfirmation = ({handleStatus, day}: {handleStatus: HandleStatus, day: string}) => {
  const handleCancelButtonClick = () => {
    handleStatus(StatusType.HOTEL_SELECTION);
  }
  const handleSubmitButtonClick = () => {
    if (day === "15") {
      handleStatus(StatusType.FAIL_RESERVATION);
    } else {
      handleStatus(StatusType.COMPLETE_RESERVATION);
    }
  }
  return (
    <>
      <h2>最終確認</h2>
      <button onClick={handleSubmitButtonClick}>確定</button>
      <button onClick={handleCancelButtonClick}>キャンセル</button>
    </>
  );
};

const CompleteReservation = () => {
  return (
    <>
      <h2>予約完了</h2>
    </>
  );
};

const FailReservation = () => {
  return (
    <>
      <h2>ホテル予約失敗</h2>
    </>
  );
};
