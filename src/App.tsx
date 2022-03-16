import { useEvent } from 'effector-react';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout/MainLayout';
import Characters from './pages/Characters/Characters'
import { getEpisodesFx } from './store/episodes';

const App = () => {
  const events = useEvent({ getEpisodesFx: getEpisodesFx });
  useEffect(() => {
    events.getEpisodesFx();
  }, [])
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Characters />} />
      </Routes>
    </MainLayout>
  )
}

export default App;