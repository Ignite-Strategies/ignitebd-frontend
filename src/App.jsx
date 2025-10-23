import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ActivationProvider } from './context/ActivationContext';
import Navigation from './components/Navigation';

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
import BDPipeline from './pages/BDPipeline';
import CompanyDashboard from './pages/CompanyDashboard';
import Assessment from './pages/Assessment';
import AssessmentResults from './pages/AssessmentResults';
import Revenue from './pages/Revenue';
import RevenueTotalOutlook from './pages/RevenueTotalOutlook';
import HumanCapital from './pages/HumanCapital';
import HumanCapitalTotalOutlook from './pages/HumanCapitalTotalOutlook';
import TargetAcquisition from './pages/TargetAcquisition';
import BDAssessmentTotalOutlook from './pages/BDAssessmentTotalOutlook';
import GrowthDashboard from './pages/GrowthDashboard';
import Ecosystem from './pages/Ecosystem';
import Persona from './pages/Persona';
import Ads from './pages/Ads';
import Seo from './pages/Seo';
import Content from './pages/Content';
import Events from './pages/Events';
import EmailCampaigns from './pages/EmailCampaigns';
import GrowthCostOutlook from './pages/GrowthCostOutlook';
import RevenueToTargetOutlook from './pages/RevenueToTargetOutlook';
import BDBaselineAssessment from './pages/BDBaselineAssessment';
import BDBaselineResults from './pages/BDBaselineResults';
import Settings from './pages/Settings';
import Roadmap from './pages/Roadmap';
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
        <Route path="/revenue-total-outlook" element={<RevenueTotalOutlook />} />
        <Route path="/human-capital" element={<HumanCapital />} />
        <Route path="/human-capital-total-outlook" element={<HumanCapitalTotalOutlook />} />
        <Route path="/target-acquisition" element={<TargetAcquisition />} />
        <Route path="/bd-assessment-total-outlook" element={<BDAssessmentTotalOutlook />} />
        <Route path="/growth-dashboard" element={<GrowthDashboard />} />
        <Route path="/ecosystem" element={<Ecosystem />} />
        <Route path="/persona" element={<Persona />} />
        <Route path="/bdpipeline" element={<BDPipeline />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/seo" element={<Seo />} />
        <Route path="/content" element={<Content />} />
        <Route path="/events" element={<Events />} />
        <Route path="/email-campaigns" element={<EmailCampaigns />} />
        <Route path="/growth-cost-outlook" element={<GrowthCostOutlook />} />
        <Route path="/revenue-target-outlook" element={<RevenueToTargetOutlook />} />
        <Route path="/bd-baseline-assessment" element={<BDBaselineAssessment />} />
        <Route path="/bd-baseline-results" element={<BDBaselineResults />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/roadmap" element={<Roadmap />} />
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
        </Routes>
      </Router>
    </ActivationProvider>
  );
}

export default App;

