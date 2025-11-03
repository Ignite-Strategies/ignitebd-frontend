import { useState } from 'react';
import { User, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import WelcomeScreen from './components/branding/WelcomeScreen';
import NarrativeArcSetup from './components/branding/NarrativeArcSetup';
import EventsMilestones from './components/branding/EventsMilestones';
import CadenceSetup from './components/branding/CadenceSetup';
import PostPlanner from './components/branding/PostPlanner';

export default function BrandingHub() {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    identity: null,
    narrativeArc: null,
    postCount: null,
    arcGoal: null,
    events: [],
    cadence: null,
    posts: []
  });

  const steps = [
    { component: WelcomeScreen, title: 'Welcome' },
    { component: NarrativeArcSetup, title: 'Narrative Arc' },
    { component: EventsMilestones, title: 'Events & Milestones' },
    { component: CadenceSetup, title: 'Cadence' },
    { component: PostPlanner, title: 'Planner' }
  ];

  const handleNext = (stepData) => {
    setUserData(prev => ({ ...prev, ...stepData }));
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const CurrentStep = steps[step].component;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Personal Branding Hub
              </h1>
              <p className="text-gray-600 mt-1">Design your authentic narrative arc</p>
            </div>
          </div>

          {/* Progress Bar */}
          {step < steps.length - 1 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Step {step + 1} of {steps.length - 1}
                </span>
                <span className="text-sm text-gray-500">{steps[step].title}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((step + 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <CurrentStep
            userData={userData}
            onNext={handleNext}
            onBack={handleBack}
            isFirstStep={step === 0}
            isLastStep={step === steps.length - 1}
          />
        </div>
      </div>
    </div>
  );
}