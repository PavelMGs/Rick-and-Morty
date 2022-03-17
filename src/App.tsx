import { useEvent } from 'effector-react';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout/MainLayout';
import Characters from './pages/Characters/Characters'
import WatchList from './pages/WatchList/WatchList';
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
        <Route path="/watch-list" element={<WatchList />} />
      </Routes>
    </MainLayout>
  )
}

export default App;