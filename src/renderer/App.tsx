import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@pages/home/Home';
import NiceModal from '@ebay/nice-modal-react';

export default function App() {
  return (
    <Router>
      <NiceModal.Provider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </NiceModal.Provider>
    </Router>
  );
}
