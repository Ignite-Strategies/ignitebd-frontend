import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ActivationProvider } from './context/ActivationContext';
import Sidebar from './components/Sidebar';

// ScrollToTop component to fix scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Pages
import ProposalPage from './pages/proposals/ProposalPage';
import ProposalsList from './pages/proposals/ProposalsList';
import AssessmentIntro from './pages/assessment/AssessmentIntro';
import Splash from './pages/Splash';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import Profilesetup from './pages/Setup/Profilesetup';
import CompanyCreateOrChoose from './pages/Setup/CompanyCreateOrChoose';
import CompanyProfile from './pages/company/CompanyProfile';
import JoinCompany from './pages/company/JoinCompany';
import Cost from './pages/assessment/Cost';
import Human from './pages/assessment/Human';
import BDPipeline from './pages/Setup/BDPipeline';
import CompanyDashboard from './pages/company/CompanyDashboard';
import Assessment from './pages/assessment/Assessment';
import AssessmentResults from './pages/assessment/AssessmentResults';
import Revenue from './pages/assessment/Revenue';
import RevenueTotalOutlook from './pages/assessment/RevenueTotalOutlook';
import HumanCapital from './pages/assessment/HumanCapital';
import HumanCapitalTotalOutlook from './pages/assessment/HumanCapitalTotalOutlook';
import TargetAcquisition from './pages/assessment/TargetAcquisition';
import BDAssessmentTotalOutlook from './pages/assessment/BDAssessmentTotalOutlook';
import GrowthDashboard from './pages/GrowthDashboard';
import Ecosystem from './pages/Setup/Ecosystem';
import Persona from './pages/Setup/Persona';
import Ads from './pages/attract/Ads';
import Seo from './pages/attract/Seo';
import Content from './pages/attract/Content';
import Events from './pages/events/Events';
import OutreachHome from './pages/outreach/OutreachHome';
import CampaignCreator from './pages/outreach/CampaignCreator';
import CampaignPreview from './pages/outreach/CampaignPreview';
import CampaignSuccess from './pages/outreach/CampaignSuccess';
import CampaignAnalytics from './pages/outreach/CampaignAnalytics';
import IndividualEmail from './pages/outreach/IndividualEmail';
import Templates from './pages/outreach/Templates';
import TemplateView from './pages/outreach/TemplateView';
import GrowthCostOutlook from './pages/assessment/GrowthCostOutlook';
import RevenueToTargetOutlook from './pages/assessment/RevenueToTargetOutlook';
import BDBaselineAssessment from './pages/assessment/BDBaselineAssessment';
import BDBaselineResults from './pages/assessment/BDBaselineResults';
import Settings from './pages/Settings';
import Roadmap from './pages/Roadmap';

function App() {
  return (
    <ActivationProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex">
          <Sidebar />
          <div className="flex-1 ml-64">
            <Routes>
          <Route path="/" element={<GrowthDashboard />} />
          <Route path="/growth-dashboard" element={<GrowthDashboard />} />
          <Route path="/proposals" element={<ProposalsList />} />
          <Route path="/proposals/:clientId" element={<ProposalPage />} />
          <Route path="/assessment-intro" element={<AssessmentIntro />} />
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
        <Route path="/outreach" element={<OutreachHome />} />
        <Route path="/outreach/campaign-creator" element={<CampaignCreator />} />
        <Route path="/outreach/campaign-preview" element={<CampaignPreview />} />
        <Route path="/outreach/campaign-success" element={<CampaignSuccess />} />
        <Route path="/outreach/analytics" element={<CampaignAnalytics />} />
        <Route path="/outreach/individual-email" element={<IndividualEmail />} />
        <Route path="/outreach/templates" element={<Templates />} />
        <Route path="/outreach/templates/:templateId" element={<TemplateView />} />
        <Route path="/growth-cost-outlook" element={<GrowthCostOutlook />} />
        <Route path="/revenue-target-outlook" element={<RevenueToTargetOutlook />} />
        <Route path="/bd-baseline-assessment" element={<BDBaselineAssessment />} />
        <Route path="/bd-baseline-results" element={<BDBaselineResults />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profilesetup" element={<Profilesetup />} />
        <Route path="/companycreateorchoose" element={<CompanyCreateOrChoose />} />
        <Route path="/companyprofile" element={<CompanyProfile />} />
        <Route path="/joincompany" element={<JoinCompany />} />
        <Route path="/companydashboard" element={<CompanyDashboard />} />
          <Route path="/cost" element={<Cost />} />
          <Route path="/human" element={<Human />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ActivationProvider>
  );
}

export default App;

