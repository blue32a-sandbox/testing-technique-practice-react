import React from 'react';
import AirConditioner from './AirConditioner';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function renderSut() {
  return render(<AirConditioner />);
}

describe('エアコンのコンポーネント', () => {
  describe('停止中からの状態遷移', () => {
    test('停止中に運転ボタンを押下すると、冷房運転中に遷移する', () => {
      renderSut();

      act(() => userEvent.click(screen.getByRole('button', { name: '運転'})));

      expect(screen.getByRole('status', {description: '運転中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '冷房'})).toBeInTheDocument();
    });
    test('停止中に停止ボタンを押下しても、状態は遷移しない', () => {
      renderSut();

      act(() => userEvent.click(screen.getByRole('button', { name: '停止'})));

      expect(screen.getByRole('status', {description: '停止中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '---'})).toBeInTheDocument();
    });
    test('停止中に運転切替ボタンを押下しても、状態は遷移しない', () => {
      renderSut();

      act(() => userEvent.click(screen.getByRole('button', { name: '運転切替'})));

      expect(screen.getByRole('status', {description: '停止中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '---'})).toBeInTheDocument();
    });
  });

  describe('停止中（冷房）からの状態遷移', () => {
    function arrangeStoppingWithCoolingMode() {
      renderSut();
      act(() => userEvent.click(screen.getByRole('button', { name: '運転'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '停止'})));
    }
    test('停止中（冷房）に運転ボタンを押下すると、冷房運転中に遷移する', () => {
      arrangeStoppingWithCoolingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '運転'})));

      expect(screen.getByRole('status', {description: '運転中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '冷房'})).toBeInTheDocument();
    });
    test('停止中（冷房）に停止ボタンを押下しても、状態は遷移しない', () => {
      arrangeStoppingWithCoolingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '停止'})));

      expect(screen.getByRole('status', {description: '停止中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '冷房'})).toBeInTheDocument();
    });
    test('停止中（冷房）に運転切替ボタンを押下しても、状態は遷移しない', () => {
      arrangeStoppingWithCoolingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '運転切替'})));

      expect(screen.getByRole('status', {description: '停止中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '冷房'})).toBeInTheDocument();
    });
  });

  describe('停止中（暖房）からの状態遷移', () => {
    function arrangeStoppingWithHeatingMode() {
      renderSut();
      act(() => userEvent.click(screen.getByRole('button', { name: '運転'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '運転切替'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '停止'})));
    }
    test('停止中（暖房）に運転ボタンを押下すると、暖房運転中に遷移する', () => {
      arrangeStoppingWithHeatingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '運転'})));

      expect(screen.getByRole('status', {description: '運転中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '暖房'})).toBeInTheDocument();
    });
    test('停止中（暖房）に停止ボタンを押下しても、状態は遷移しない', () => {
      arrangeStoppingWithHeatingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '停止'})));

      expect(screen.getByRole('status', {description: '停止中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '暖房'})).toBeInTheDocument();
    });
    test('停止中（暖房）に運転切替ボタンを押下しても、状態は遷移しない', () => {
      arrangeStoppingWithHeatingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '運転切替'})));

      expect(screen.getByRole('status', {description: '停止中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '暖房'})).toBeInTheDocument();
    });
  });

  describe('停止中（除湿）からの状態遷移', () => {
    function arrangeStoppingWithDehumidifyingMode() {
      renderSut();
      act(() => userEvent.click(screen.getByRole('button', { name: '運転'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '運転切替'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '運転切替'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '停止'})));
    }
    test('停止中（除湿）に運転ボタンを押下すると、除湿運転中に遷移する', () => {
      arrangeStoppingWithDehumidifyingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '運転'})));

      expect(screen.getByRole('status', {description: '運転中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '除湿'})).toBeInTheDocument();
    });
    test('停止中（除湿）に停止ボタンを押下しても、状態は遷移しない', () => {
      arrangeStoppingWithDehumidifyingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '停止'})));

      expect(screen.getByRole('status', {description: '停止中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '除湿'})).toBeInTheDocument();
    });
    test('停止中（除湿）に運転切替ボタンを押下しても、状態は遷移しない', () => {
      arrangeStoppingWithDehumidifyingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '運転切替'})));

      expect(screen.getByRole('status', {description: '停止中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '除湿'})).toBeInTheDocument();
    });
  });

  describe('冷房運転中からの状態遷移', () => {
    function arrangeRunningWithCoolingMode() {
      renderSut();
      act(() => userEvent.click(screen.getByRole('button', { name: '運転'})));
    }
    test('冷房運転中に運転ボタンを押下しても、遷移しない', () => {
      arrangeRunningWithCoolingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '運転'})));

      expect(screen.getByRole('status', {description: '運転中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '冷房'})).toBeInTheDocument();
    });
    test('冷房運転中に停止ボタンを押下すると、停止中（冷房）に遷移する', () => {
      arrangeRunningWithCoolingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '停止'})));

      expect(screen.getByRole('status', {description: '停止中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '冷房'})).toBeInTheDocument();
    });
    test('冷房運転中に運転切替ボタンを押下すると、暖房運転中に遷移する', () => {
      arrangeRunningWithCoolingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '運転切替'})));

      expect(screen.getByRole('status', {description: '運転中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '暖房'})).toBeInTheDocument();
    });
  });

  describe('暖房運転中からの状態遷移', () => {
    function arrangeRunningWithHeatingMode() {
      renderSut();
      act(() => userEvent.click(screen.getByRole('button', { name: '運転'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '運転切替'})));
    }
    test('暖房運転中に運転ボタンを押下しても、遷移しない', () => {
      arrangeRunningWithHeatingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '運転'})));

      expect(screen.getByRole('status', {description: '運転中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '暖房'})).toBeInTheDocument();
    });
    test('暖房運転中に停止ボタンを押下すると、停止中（暖房）に遷移する', () => {
      arrangeRunningWithHeatingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '停止'})));

      expect(screen.getByRole('status', {description: '停止中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '暖房'})).toBeInTheDocument();
    });
    test('暖房運転中に運転切替ボタンを押下すると、除湿運転中に遷移する', () => {
      arrangeRunningWithHeatingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '運転切替'})));

      expect(screen.getByRole('status', {description: '運転中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '除湿'})).toBeInTheDocument();
    });
  });

  describe('除湿運転中からの状態遷移', () => {
    function arrangeRunningWithDehumidifyingMode() {
      renderSut();
      act(() => userEvent.click(screen.getByRole('button', { name: '運転'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '運転切替'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '運転切替'})));
    }
    test('除湿運転中に運転ボタンを押下しても、遷移しない', () => {
      arrangeRunningWithDehumidifyingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '運転'})));

      expect(screen.getByRole('status', {description: '運転中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '除湿'})).toBeInTheDocument();
    });
    test('除湿運転中に停止ボタンを押下すると、停止中（除湿）に遷移する', () => {
      arrangeRunningWithDehumidifyingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '停止'})));

      expect(screen.getByRole('status', {description: '停止中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '除湿'})).toBeInTheDocument();
    });
    test('除湿運転中に運転切替ボタンを押下すると、冷房運転中に遷移する', () => {
      arrangeRunningWithDehumidifyingMode();

      act(() => userEvent.click(screen.getByRole('button', { name: '運転切替'})));

      expect(screen.getByRole('status', {description: '運転中'})).toBeInTheDocument();
      expect(screen.getByRole('status', {description: '冷房'})).toBeInTheDocument();
    });
  });
});
