import React, { useState } from 'react';

const StatusType = {
  STOPPED: '停止中',
  RUNNIG: '運転中',
} as const;
type Status = typeof StatusType[keyof typeof StatusType];

const ModeType = {
  INDEFINITE: '---',
  COOLING: '冷房',
  HEATING: '暖房',
  DEHUMIDIFYING: '除湿',
} as const;
type Mode = typeof ModeType[keyof typeof ModeType];

const ModeChangeMap = new Map<Mode, Mode>();
ModeChangeMap.set(ModeType.INDEFINITE, ModeType.COOLING);
ModeChangeMap.set(ModeType.COOLING, ModeType.HEATING);
ModeChangeMap.set(ModeType.HEATING, ModeType.DEHUMIDIFYING);
ModeChangeMap.set(ModeType.DEHUMIDIFYING, ModeType.COOLING);

export default function AirConditioner() {
  const [status, setStatus] = useState<Status>(StatusType.STOPPED);
  const [mode, setMode] = useState<Mode>(ModeType.INDEFINITE);

  const handleRunClick = () => {
    setStatus(StatusType.RUNNIG);
    setMode(mode === ModeType.INDEFINITE ? ModeType.COOLING : mode);
  }

  const handleStopClick = () => {
    setStatus(StatusType.STOPPED);
  }

  const handleChangeModeClick = () => {
    if (status === StatusType.STOPPED) {
      return;
    }
    const toMode = ModeChangeMap.get(mode);
    if (typeof toMode === 'undefined') {
      throw new Error('Invalid mode');
    }
    setMode(toMode);
  }

  return (
    <>
      <h1>エアコンの運転モード切替</h1>
      <p role="status" aria-describedby="status">状態: <span id="status">{ status }</span></p>
      <p role="status" aria-describedby="mode">運転モード: <span id="mode">{ mode }</span></p>
      <button onClick={handleRunClick}>運転</button>|
      <button onClick={handleStopClick}>停止</button>|
      <button onClick={handleChangeModeClick}>運転切替</button>
    </>
  );
}
