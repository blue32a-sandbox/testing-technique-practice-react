import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Reservation from './Reservation';
import userEvent from '@testing-library/user-event';

function renderSut() {
  return render(<Reservation />);
}

describe('ホテル予約サイトの予約システム コンポーネント', () => {
  test('', () => {
    renderSut();
    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('ホテル予約サイトの予約システム');
    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('ホテル選択');
  });
  describe('ホテル選択画面からの遷移', () => {
    test('ホテル選択時に空き部屋があれば、宿泊日選択画面に遷移する', () => {
      renderSut();

      act(() => userEvent.selectOptions(screen.getByRole('combobox'), '1'));
      act(() => userEvent.click(screen.getByRole('button', { name: '選択'})));

      expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('宿泊日選択');
    });
    test('ホテル選択時に空き部屋がなければ、ホテル選択失敗画面に遷移する', () => {
      renderSut();

      act(() => userEvent.selectOptions(screen.getByRole('combobox'), '2'));
      act(() => userEvent.click(screen.getByRole('button', { name: '選択'})));

      expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('ホテル選択失敗');
    });
  });
  describe('ホテル選択失敗画面からの遷移', () => {
    function arrangeFailHotelSelection() {
      renderSut();
      act(() => userEvent.selectOptions(screen.getByRole('combobox'), '2'));
      act(() => userEvent.click(screen.getByRole('button', { name: '選択'})));
    }
    test('再度選択するボタンを押下すると、ホテル選択画面に遷移する', () => {
      arrangeFailHotelSelection();

      act(() => userEvent.click(screen.getByRole('button', { name: '再度選択する'})));

      expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('ホテル選択');
    });
  });
  describe('宿泊日選択画面からの遷移', () => {
    function arrangeDateSelection() {
      renderSut();
      act(() => userEvent.selectOptions(screen.getByRole('combobox'), '1'));
      act(() => userEvent.click(screen.getByRole('button', { name: '選択'})));
    }
    test('キャンセルボタンを押下すると、ホテル選択画面に遷移する', () => {
      arrangeDateSelection();

      act(() => userEvent.click(screen.getByRole('button', { name: 'キャンセル'})));

      expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('ホテル選択');
    });
    test('選択した宿泊日の空きがない場合、宿泊日選択失敗画面に遷移する', () => {
      arrangeDateSelection();

      act(() => userEvent.selectOptions(screen.getByRole('combobox'), '1'));
      act(() => userEvent.click(screen.getByRole('button', { name: '選択'})));

      expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('宿泊日選択失敗');
    });
    test('選択した宿泊日の空きがある場合、宿泊者情報入力画面に遷移する', () => {
      arrangeDateSelection();

      act(() => userEvent.selectOptions(screen.getByRole('combobox'), '2'));
      act(() => userEvent.click(screen.getByRole('button', { name: '選択'})));

      expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('宿泊者情報入力');
    });
  });
  describe('宿泊日選択失敗画面からの遷移', () => {
    function arrangeFailDateSelection() {
      renderSut();
      act(() => userEvent.selectOptions(screen.getByRole('combobox'), '1'));
      act(() => userEvent.click(screen.getByRole('button', { name: '選択'})));
      act(() => userEvent.selectOptions(screen.getByRole('combobox'), '1'));
      act(() => userEvent.click(screen.getByRole('button', { name: '選択'})));
    }
    test('再度選択するボタンを押下すると、宿泊日選択画面に遷移する', () => {
      arrangeFailDateSelection();

      act(() => userEvent.click(screen.getByRole('button', { name: '再度選択する'})));

      expect(screen.getByRole('heading', {level: 2})).toHaveTextContent(/^宿泊日選択$/);
    });
  });
  describe('宿泊者情報入力画面からの遷移', () => {
    function arrangeInputGuestInformation() {
      renderSut();
      act(() => userEvent.selectOptions(screen.getByRole('combobox'), '1'));
      act(() => userEvent.click(screen.getByRole('button', { name: '選択'})));
      act(() => userEvent.selectOptions(screen.getByRole('combobox'), '2'));
      act(() => userEvent.click(screen.getByRole('button', { name: '選択'})));
    }
    test('キャンセルボタンを押すと、ホテル選択画面に遷移する', () => {
      arrangeInputGuestInformation();

      act(() => userEvent.click(screen.getByRole('button', { name: 'キャンセル'})));

      expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('ホテル選択');
    });
    test('宿泊者情報を入力すると、最終確認画面に遷移する', () => {
      arrangeInputGuestInformation();

      act(() => userEvent.click(screen.getByRole('button', { name: '入力完了'})));

      expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('最終確認');
    });
  });
  describe('最終確認画面からの遷移', () => {
    function arrangeFinalConfirmation(day: string) {
      renderSut();
      act(() => userEvent.selectOptions(screen.getByRole('combobox'), '1'));
      act(() => userEvent.click(screen.getByRole('button', { name: '選択'})));
      act(() => userEvent.selectOptions(screen.getByRole('combobox'), day));
      act(() => userEvent.click(screen.getByRole('button', { name: '選択'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '入力完了'})));
    }
    test('キャンセルボタンを押すと、ホテル選択画面に遷移する', () => {
      arrangeFinalConfirmation("2");

      act(() => userEvent.click(screen.getByRole('button', { name: 'キャンセル'})));

      expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('ホテル選択');
    });
    test('予約完了ボタンを押し、部屋の空きがある場合は、予約完了画面に遷移する', () => {
      arrangeFinalConfirmation("2");

      act(() => userEvent.click(screen.getByRole('button', { name: '確定'})));

      expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('予約完了');
    });
    test('予約完了ボタンを押し、部屋の空きない場合は、ホテル予約失敗画面に遷移する', () => {
      arrangeFinalConfirmation("15");

      act(() => userEvent.click(screen.getByRole('button', { name: '確定'})));

      expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('ホテル予約失敗');
    });
  });
});
