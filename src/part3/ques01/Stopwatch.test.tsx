import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Stopwatch from './Stopwatch';

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllTimers();
});
afterEach(() => {
  jest.useRealTimers();
});

describe('時間を計測するストップウォッチのコンポーネント', () => {
  describe('初期状態のテスト', () => {
    test('初期状態は計測準備中の状態で、経過時間の表示は 00:00 となる', async () => {
      render(<Stopwatch />);

      act(() => jest.advanceTimersByTime(3000));

      expect(screen.getByRole('timer')).toHaveTextContent('00:00');
    });
  });
  describe('Startボタンのテスト', () => {
    test('計測準備中にStartボタンを押下すると計測中の状態になる', async () => {
      render(<Stopwatch />);
      const startButton = screen.getByRole('button', { name: 'Start'});

      act(() => userEvent.click(startButton)); // to PROGRESS
      act(() => jest.advanceTimersByTime(3000));

      expect(screen.getByRole('timer')).toHaveTextContent('00:03')
    });
    test('計測中にStartボタンを押下すると一時停止中の状態になる', async () => {
      render(<Stopwatch />);
      const startButton = screen.getByRole('button', { name: 'Start'});

      act(() => userEvent.click(startButton)); // to PROGRESS
      act(() => userEvent.click(startButton)); // to STOPPING
      act(() => jest.advanceTimersByTime(3000));

      expect(screen.getByRole('timer')).toHaveTextContent('00:00');
    });
    test('一時停止中にStartボタンを押下すると計測中の状態になる', async () => {
      render(<Stopwatch />);
      const startButton = screen.getByRole('button', { name: 'Start'});

      act(() => userEvent.click(startButton)); // to PROGRESS
      act(() => userEvent.click(startButton)); // to STOPPING
      act(() => userEvent.click(startButton)); // to PROGRESS
      act(() => jest.advanceTimersByTime(3000));

      expect(screen.getByRole('timer')).toHaveTextContent('00:03');
    });
  });
  describe('Resetボタンのテスト', () => {
    test('一時停止中にResetボタンを押下すると経過時間の表示は 00:00 に戻り、計測準備中の状態になる', async () => {
      render(<Stopwatch />);
      const startButton = screen.getByRole('button', { name: 'Start'});
      const resetButton = screen.getByRole('button', { name: 'Reset'});

      act(() => userEvent.click(startButton)); // to PROGRESS
      act(() => jest.advanceTimersByTime(3000));
      act(() => userEvent.click(startButton)); // to STOPPING
      act(() => userEvent.click(resetButton)); // to READY

      expect(screen.getByRole('timer')).toHaveTextContent('00:00');
    });
  });
});
