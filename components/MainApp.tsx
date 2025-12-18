import React, { useState, useCallback, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import { ConversationData, StepId } from "../types";
import { INITIAL_CONVERSATION_DATA, STEPS } from "../constants";

import StepTracker from "./StepTracker";
import Step0Welcome from "./steps/Step0Welcome";
import Step1Core from "./steps/Step1Core";
import Step2District from "./steps/Step2District";
import Step2Topics from "./steps/Step2Topics";
import Step3Initiatives from "./steps/Step3Initiatives";
import Step4Consent from "./steps/Step4Consent";
import Step5Reflection from "./steps/Step5Reflection";
import Step5Metrics from "./steps/Step5Metrics";
import Step5District from "./steps/Step5Districts";
import Step6Summary from "./steps/Step6Summary";
import ThankYou from "./steps/ThankYou";

interface MainAppProps {
  onNavigateToDashboard?: () => void;
}

const MainApp: React.FC<MainAppProps> = ({ onNavigateToDashboard }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [conversationData, setConversationData] = useState<ConversationData>({
    ...INITIAL_CONVERSATION_DATA,
    uuid: crypto.randomUUID(),
  });
  const [step2View, setStep2View] = useState<"district" | "topics">("district");

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  }, []);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const updateData = useCallback((data: Partial<ConversationData>) => {
    setConversationData((prev) => ({ ...prev, ...data }));
  }, []);

  const restart = useCallback(() => {
    setConversationData({
      ...INITIAL_CONVERSATION_DATA,
      uuid: crypto.randomUUID(),
    });
    setStep2View("district");
    setCurrentStep(0);
  }, []);

  // Progressive local draft save
  useEffect(() => {
    if (conversationData.uuid) {
      try {
        localStorage.setItem(
          `dialogue_${conversationData.uuid}`,
          JSON.stringify(conversationData)
        );
      } catch {}
    }
  }, [conversationData]);

  const navigateToStep = useCallback((stepId: StepId) => {
    const stepIndex = STEPS.findIndex((step) => step.id === stepId);
    if (stepIndex >= 0) {
      setCurrentStep(stepIndex);
    }
  }, []);

  const renderStep = () => {
    const stepId = STEPS[currentStep]?.id;

    const commonProps = {
      data: conversationData,
      updateData,
      onNext: handleNext,
      onBack: handleBack,
      onRestart: restart,
      navigateToStep,
    };

    switch (stepId) {
      case StepId.Welcome:
        return <Step0Welcome onNext={handleNext} />;
      case StepId.Core:
        return <Step1Core {...commonProps} />;
      case StepId.District:
        return <Step2District {...commonProps} />;
      case StepId.Topics:
        return <Step2Topics {...commonProps} />;
      case StepId.Initiatives:
        return <Step3Initiatives {...commonProps} />;
      case StepId.Consent:
        return <Step4Consent {...commonProps} />;
      case StepId.Reflection:
        return <Step5Reflection {...commonProps} />;
      case StepId.Metrics:
        return <Step5Metrics {...commonProps} />;
      case StepId.Summary:
        return <Step6Summary {...commonProps} onNext={handleNext} />;
      default:
        if (currentStep >= STEPS.length) {
          return <ThankYou {...commonProps} onNavigateToDashboard={onNavigateToDashboard} />;
        }
        // Fallback for step 0
        return <Step0Welcome onNext={handleNext} />;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 4 },
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {currentStep > 0 && currentStep < STEPS.length && (
        <StepTracker
          currentStep={currentStep}
          steps={STEPS}
          onBack={handleBack}
        />
      )}
      <Box sx={{ flex: 1, mt: 2 }}>{renderStep()}</Box>
    </Paper>
  );
};

export default MainApp;
