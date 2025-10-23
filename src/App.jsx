import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ActivationProvider } from './context/ActivationContext';

// ScrollToTop component to fix scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

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
import BDPipeline from './pages/BDPipeline';
import CompanyDashboard from './pages/CompanyDashboard';
import Assessment from './pages/Assessment';
import AssessmentResults from './pages/AssessmentResults';
import Revenue from './pages/Revenue';
import HumanCapital from './pages/HumanCapital';
import TargetAcquisition from './pages/TargetAcquisition';
import GrowthDashboard from './pages/GrowthDashboard';
import Ecosystem from './pages/Ecosystem';
import Persona from './pages/Persona';
import Pipeline from './pages/Pipeline';
import Ads from './pages/Ads';
import Seo from './pages/Seo';
import Events from './pages/Events';
import EmailCampaigns from './pages/EmailCampaigns';
import GrowthCostOutlook from './pages/GrowthCostOutlook';
import RevenueToTargetOutlook from './pages/RevenueToTargetOutlook';
import BDBaselineAssessment from './pages/BDBaselineAssessment';
import Prices from './pages/Prices';

function App() {
  return (
    <ActivationProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/businesspoint-law-proposal" element={<BusinessPointLawProposal />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment-results" element={<AssessmentResults />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/human-capital" element={<HumanCapital />} />
        <Route path="/target-acquisition" element={<TargetAcquisition />} />
        <Route path="/growth-dashboard" element={<GrowthDashboard />} />
        <Route path="/ecosystem" element={<Ecosystem />} />
        <Route path="/persona" element={<Persona />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/seo" element={<Seo />} />
        <Route path="/events" element={<Events />} />
        <Route path="/email-campaigns" element={<EmailCampaigns />} />
        <Route path="/growth-cost-outlook" element={<GrowthCostOutlook />} />
        <Route path="/revenue-target-outlook" element={<RevenueToTargetOutlook />} />
        <Route path="/bd-baseline-assessment" element={<BDBaselineAssessment />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profilesetup" element={<Profilesetup />} />
          <Route path="/companycreateorchoose" element={<CompanyCreateOrChoose />} />
          <Route path="/companyprofile" element={<CompanyProfile />} />
          <Route path="/joincompany" element={<JoinCompany />} />
          <Route path="/companydashboard" element={<CompanyDashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/cost" element={<Cost />} />
          <Route path="/human" element={<Human />} />
                  <Route path="/bd/goals" element={<BDGoals />} />
                  <Route path="/bd/events" element={<BDEvents />} />
                  <Route path="/bd/content" element={<BDContent />} />
                  <Route path="/bd/ads" element={<BDAds />} />
                  <Route path="/bd/pipeline" element={<BDPipeline />} />
        </Routes>
      </Router>
    </ActivationProvider>
  );
}

export default App;

