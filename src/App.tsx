import React from 'react';
import { Route, Routes } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout/MainLayout';
import Characters from './pages/Characters/Characters'

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Characters />} />
      </Routes>
    </MainLayout>
  )
}

export default App;