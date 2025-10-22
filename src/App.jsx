import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ActivationProvider } from './context/ActivationContext';

// Pages
import Landing from './pages/Landing';
import BusinessPointLawProposal from './pages/BusinessPointLawProposal';
import Splash from './pages/Splash';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Cost from './pages/Cost';
import Human from './pages/Human';
import BDGoals from './pages/BD/Goals';
import BDEvents from './pages/BD/Events';
import BDContent from './pages/BD/Content';
import BDAds from './pages/BD/Ads';

function App() {
  return (
    <ActivationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/businesspoint-law-proposal" element={<BusinessPointLawProposal />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cost" element={<Cost />} />
          <Route path="/human" element={<Human />} />
          <Route path="/bd/goals" element={<BDGoals />} />
          <Route path="/bd/events" element={<BDEvents />} />
          <Route path="/bd/content" element={<BDContent />} />
          <Route path="/bd/ads" element={<BDAds />} />
        </Routes>
      </Router>
    </ActivationProvider>
  );
}

export default App;

