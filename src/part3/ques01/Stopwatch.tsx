import React, { useRef, useState } from 'react';

const StatusType = {
  READY: 'READY',
  PROGRESS: 'PROGRESS',
  STOPPING: 'STOPPING',
} as const;
type Status = typeof StatusType[keyof typeof StatusType];

export default function Stopwatch() {
  const [status, setStatus] = useState<Status>(StatusType.READY);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timer | undefined>(undefined);

  const handleStart = () => {
    if (status === StatusType.READY || status === StatusType.STOPPING) {
      const intervalId = setInterval(() => {
        setTime(time => time + 1)
      }, 1000);
      intervalRef.current = intervalId;
      setStatus(StatusType.PROGRESS);
    } else {
      clearInterval(intervalRef.current);
      setStatus(StatusType.STOPPING);
    }
  };
  const handleRest = () => {
    if (status === StatusType.STOPPING) {
      setTime(0);
      setStatus(StatusType.READY);
    }
  };

  return (
    <>
      <h1>ストップウォッチの動作</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleRest}>Reset</button>
      <p role="timer">{formatTime(time)}</p>
    </>
  );
}

function formatTime(time: number): string {
  return zeroPadding(Math.floor(time / 60)) + ':' + zeroPadding(time % 60);
}

function zeroPadding(n: number): string {
  return ('00' + n).slice(-2);
}
