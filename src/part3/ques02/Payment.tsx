import React, { ReactElement, createContext, useContext, useState } from 'react';

const StatusType = {
  READY_OPERATION: 'READY_OPERATION',
  READY_READING: 'READY_READING',
  CONFIRMATION_AMOUNT: 'CONFIRMATION_AMOUNT',
  WAITING_PAYMENT_RESULT: 'WAITING_PAYMENT_RESULT',
  SUCCESSFUL_PAYMENT: 'SUCCESSFUL_PAYMENT',
  FAILED_PAYMENT: 'FAILED_PAYMENT',
} as const;
type Status = typeof StatusType[keyof typeof StatusType];

export default function Pay() {
  const [status, setStatus] = useState<Status>(StatusType.READY_OPERATION);
  const handleStatus = (status: Status) => {
    setStatus(status);
  };
  return (
    <>
      <h1>スマホ決済アプリの決済処理</h1>
      {getContent(status, handleStatus)}
    </>
  );
}

type HandleStatus = (status: Status) => void;

function getContent(status: Status, handleStatus: HandleStatus): ReactElement {
  switch (status) {
    case StatusType.READY_OPERATION: {
      return <Home handleStatus={handleStatus} />;
    }
    case StatusType.READY_READING: {
      return <Reader handleStatus={handleStatus} />;
    }
    case StatusType.CONFIRMATION_AMOUNT: {
      return <Confirm handleStatus={handleStatus} />;
    }
    case StatusType.WAITING_PAYMENT_RESULT: {
      return <PaymentProcessing handleStatus={handleStatus} />;
    }
    case StatusType.SUCCESSFUL_PAYMENT: {
      return <Successfull handleStatus={handleStatus} />;
    }
    case StatusType.FAILED_PAYMENT: {
      return <Failed handleStatus={handleStatus} />;
    }
    default: {
      const exhaustivenessCheck: never = status;
      throw new Error(`Unhandled status: ${exhaustivenessCheck}`);
    }
  }
}

const Home = ({handleStatus}: {handleStatus: HandleStatus}) => {
  const handleReadClick = () => {
    handleStatus(StatusType.READY_READING);
  }
  return (
    <>
      <h2>ホーム</h2>
      <button onClick={handleReadClick}>読取</button>
    </>
  );
}

const Reader = ({handleStatus}: {handleStatus: HandleStatus}) => {
  const handleReadCompleteClick = () => {
    handleStatus(StatusType.CONFIRMATION_AMOUNT);
  }
  const handleCancelClick = () => {
    handleStatus(StatusType.READY_OPERATION);
  }
  return (
    <>
      <h2>バーコード読み取り</h2>
      <button onClick={handleReadCompleteClick}>読取完了</button>
      <button onClick={handleCancelClick}>キャンセル</button>
    </>
  );
}

const Confirm = ({handleStatus}: {handleStatus: HandleStatus}) => {
  const handlePaymentClick = () => {
    handleStatus(StatusType.WAITING_PAYMENT_RESULT);
  }
  const handleCancelClick = () => {
    handleStatus(StatusType.READY_OPERATION);
  }
  return (
    <>
      <h2>金額を確認</h2>
      <button onClick={handlePaymentClick}>決済</button>
      <button onClick={handleCancelClick}>キャンセル</button>
    </>
  );
}

type PostPayment = () => Promise<boolean>;
export const PostPaymentContext = createContext<PostPayment>(async () => {
  return fetch('https://httpbin.org/status/200')
  .then((response) => {
    return response.status === 200;
  });
});

const PaymentProcessing = ({handleStatus}: {handleStatus: HandleStatus}) => {
  const postPayment = useContext(PostPaymentContext);
  postPayment()
    .then((result) => {
      const status = result ? StatusType.SUCCESSFUL_PAYMENT : StatusType.FAILED_PAYMENT;
      handleStatus(status);
    });

  return (
    <h2>決済処理中…</h2>
  );
}

const Successfull = ({handleStatus}: {handleStatus: HandleStatus}) => {
  const handleOkClick = () => {
    handleStatus(StatusType.READY_OPERATION);
  }
  return (
    <>
      <h2>決済成功</h2>
      <button onClick={handleOkClick}>OK</button>
    </>
  );
}

const Failed = ({handleStatus}: {handleStatus: HandleStatus}) => {
  const handleOkClick = () => {
    handleStatus(StatusType.READY_OPERATION);
  }
  const handleReReadingClick = () => {
    handleStatus(StatusType.READY_READING);
  }
  return (
    <>
      <h2>決済失敗</h2>
      <button onClick={handleOkClick}>OK</button>
      <button onClick={handleReReadingClick}>再読取</button>
    </>
  );
}
