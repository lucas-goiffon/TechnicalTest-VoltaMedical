import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@pages/home/Home';
import NiceModal from '@ebay/nice-modal-react';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <Router>
      <Toaster />
      <NiceModal.Provider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </NiceModal.Provider>
    </Router>
  );
}
