import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ActivationProvider } from './context/ActivationContext';

// Pages
import Landing from './pages/Landing';
import LearnMore from './pages/LearnMore';
import BusinessPointLawProposal from './pages/BusinessPointLawProposal';
import Splash from './pages/Splash';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profilesetup from './pages/Profilesetup';
import CompanyCreateOrChoose from './pages/CompanyCreateOrChoose';
import CompanyProfile from './pages/CompanyProfile';
import JoinCompany from './pages/JoinCompany';
import Auth from './pages/Auth';
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
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/businesspoint-law-proposal" element={<BusinessPointLawProposal />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profilesetup" element={<Profilesetup />} />
          <Route path="/companycreateorchoose" element={<CompanyCreateOrChoose />} />
          <Route path="/companyprofile" element={<CompanyProfile />} />
          <Route path="/joincompany" element={<JoinCompany />} />
          <Route path="/auth" element={<Auth />} />
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

