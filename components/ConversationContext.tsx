import React, { createContext, useState, useCallback, useContext } from "react";
import { ConversationData, StepId } from "../types";
import { INITIAL_CONVERSATION_DATA, STEPS } from "../constants";

interface ConversationContextType {
  data: ConversationData;
  updateData: (data: Partial<ConversationData>) => void;
  currentStep: number;
  goToNext: () => void;
  goToPrevious: () => void;
  restart: () => void;
  step2View: "district" | "topics";
  setStep2View: (view: "district" | "topics") => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ConversationData>(INITIAL_CONVERSATION_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [step2View, setStep2View] = useState<"district" | "topics">("district");

  const updateData = useCallback((newData: Partial<ConversationData>) => {
    setData(prev => ({ ...prev, ...newData }));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const restart = useCallback(() => {
    setData(INITIAL_CONVERSATION_DATA);
    setStep2View("district");
    setCurrentStep(0);
  }, []);

  return (
    <ConversationContext.Provider
      value={{
        data,
        updateData,
        currentStep,
        goToNext,
        goToPrevious,
        restart,
        step2View,
        setStep2View,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error("useConversation must be used within a ConversationProvider");
  }
  return context;
};