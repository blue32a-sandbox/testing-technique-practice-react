import React, { ReactNode } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import Payment, { PostPaymentContext } from './Payment';
import userEvent from '@testing-library/user-event';

describe('スマホ決済アプリのコンポーネント', () => {
  describe('操作待機の状態のテスト', () => {
    test('初期状態は操作待機の状態になる', () => {
      render(<Payment />);

      expect(screen.getByRole('heading', { name: 'ホーム' })).toBeInTheDocument();
    });
    test('読取ボタンを押下すると、バーコード読取待機の状態になる', () => {
      render(<Payment />);

      act(() => userEvent.click(screen.getByRole('button', { name: '読取'})));

      expect(screen.getByRole('heading', { name: 'バーコード読み取り' })).toBeInTheDocument();
    });
  });
  describe('バーコード読取待機の状態のテスト', () => {
    test('バーコード読み取りの代わりである読取完了ボタンを押下すると、金額確認の状態になる', () => {
      render(<Payment />);

      act(() => userEvent.click(screen.getByRole('button', { name: '読取'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '読取完了'})));

      expect(screen.getByRole('heading', { name: '金額を確認' })).toBeInTheDocument();
    });
    test('キャンセルボタンを押下すると、操作待機の状態になる', () => {
      render(<Payment />);

      act(() => userEvent.click(screen.getByRole('button', { name: '読取'})));
      act(() => userEvent.click(screen.getByRole('button', { name: 'キャンセル'})));

      expect(screen.getByRole('heading', { name: 'ホーム' })).toBeInTheDocument();
    });
  });
  describe('金額確認の状態のテスト', () => {
    test('決済を押下すると、決済結果待ちの状態になる', () => {
      render(<Payment />);

      act(() => userEvent.click(screen.getByRole('button', { name: '読取'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '読取完了'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '決済'})));

      expect(screen.getByRole('heading', { name: '決済処理中…' })).toBeInTheDocument();
    });
    test('キャンセルボタンを押下すると、操作待機の状態になる', () => {
      render(<Payment />);

      act(() => userEvent.click(screen.getByRole('button', { name: '読取'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '読取完了'})));
      act(() => userEvent.click(screen.getByRole('button', { name: 'キャンセル'})));

      expect(screen.getByRole('heading', { name: 'ホーム' })).toBeInTheDocument();
    });
  });
  describe('決済結果待ちの状態のテスト', () => {
    test('決済成功を受信すると、決済成功の状態になる', async () => {
      const successfulPostPayment = () => Promise.resolve(true);
      const wrapper = ({children}: {children: ReactNode}) => (
        <PostPaymentContext.Provider value={successfulPostPayment}>{children}</PostPaymentContext.Provider>
      );
      render(<Payment />, { wrapper });

      act(() => userEvent.click(screen.getByRole('button', { name: '読取'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '読取完了'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '決済'})));

      await waitFor(() => expect(screen.getByRole('heading', { name: '決済成功' })).toBeInTheDocument());
    });
    test('決済失敗を受信すると、決済失敗の状態になる', async () => {
      const failedPostPayment = () => Promise.resolve(false);
      const wrapper = ({children}: {children: ReactNode}) => (
        <PostPaymentContext.Provider value={failedPostPayment}>{children}</PostPaymentContext.Provider>
      );
      render(<Payment />, { wrapper });

      act(() => userEvent.click(screen.getByRole('button', { name: '読取'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '読取完了'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '決済'})));

      await waitFor(() => expect(screen.getByRole('heading', { name: '決済失敗' })).toBeInTheDocument());
    });
  });
  describe('決済成功の状態のテスト', () => {
    test('OKボタンを押下すると、操作待機の状態になる', async () => {
      const successfulPostPayment = () => Promise.resolve(true);
      const wrapper = ({children}: {children: ReactNode}) => (
        <PostPaymentContext.Provider value={successfulPostPayment}>{children}</PostPaymentContext.Provider>
      );
      render(<Payment />, { wrapper });

      act(() => userEvent.click(screen.getByRole('button', { name: '読取'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '読取完了'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '決済'})));
      await waitFor(() => expect(screen.getByRole('heading', { name: '決済成功' })).toBeInTheDocument());
      act(() => userEvent.click(screen.getByRole('button', { name: 'OK'})));

      expect(screen.getByRole('heading', { name: 'ホーム' })).toBeInTheDocument();
    });
  });
  describe('決済失敗の状態のテスト', () => {
    test('OKボタンを押下すると、操作待機の状態になる', async () => {
      const failedPostPayment = () => Promise.resolve(false);
      const wrapper = ({children}: {children: ReactNode}) => (
        <PostPaymentContext.Provider value={failedPostPayment}>{children}</PostPaymentContext.Provider>
      );
      render(<Payment />, { wrapper });

      act(() => userEvent.click(screen.getByRole('button', { name: '読取'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '読取完了'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '決済'})));
      await waitFor(() => expect(screen.getByRole('heading', { name: '決済失敗' })).toBeInTheDocument());
      act(() => userEvent.click(screen.getByRole('button', { name: 'OK'})));

      expect(screen.getByRole('heading', { name: 'ホーム' })).toBeInTheDocument();
    });
    test('再読取ボタンを押下すると、バーコード読取待機の状態になる', async () => {
      const failedPostPayment = () => Promise.resolve(false);
      const wrapper = ({children}: {children: ReactNode}) => (
        <PostPaymentContext.Provider value={failedPostPayment}>{children}</PostPaymentContext.Provider>
      );
      render(<Payment />, { wrapper });

      act(() => userEvent.click(screen.getByRole('button', { name: '読取'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '読取完了'})));
      act(() => userEvent.click(screen.getByRole('button', { name: '決済'})));
      await waitFor(() => expect(screen.getByRole('heading', { name: '決済失敗' })).toBeInTheDocument());
      act(() => userEvent.click(screen.getByRole('button', { name: '再読取'})));

      expect(screen.getByRole('heading', { name: 'バーコード読み取り' })).toBeInTheDocument();
    });
  });
});
