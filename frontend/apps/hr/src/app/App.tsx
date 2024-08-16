import { MainLayout } from '@repo/shared/layouts';
import React, { Suspense, useEffect } from 'react';
import { useSelector } from "react-redux";

import { AppRouter } from './providers/router';

import { initAuthData , getInitedState } from '@/entities/User';
import { AuthPage } from "@/pages/AuthPage";
import { USER_SECRET_TOKEN } from "@/shared/const/localstorage";
import { useAppDispatch } from "@/shared/lib";
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';


function App() {
  const dispatch = useAppDispatch();
  const inited = useSelector(getInitedState);

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData())
    }
  })

  const token = localStorage.getItem(USER_SECRET_TOKEN);

  if (!token || !inited) {
    return (
      <AuthPage />
    )
  }

  return (
    <div className="app">
      <Suspense fallback="Loading...">
        <MainLayout header={<Navbar />} sidebar={<Sidebar />}>
          <AppRouter />
        </MainLayout>
      </Suspense>
    </div>
  );
}

export default App;
