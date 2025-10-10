import React, { createContext, useState, useCallback, useContext } from "react";
import { ConversationData, ContactInfo, DeineReflection } from "./types";
import {
  INITIAL_CONVERSATION_DATA,
  CONTACT_INFO,
  DEINE_REFLECTION,
  STEPS,
} from "./constants";

interface AppContextType {
  // State
  conversation: ConversationData;
  contactInfo: ContactInfo;
  reflection: DeineReflection;
  currentStep: number;
  step2View: "district" | "topics";

  // Updaters
  updateConversation: (data: Partial<ConversationData>) => void;
  updateContactInfo: (data: Partial<ContactInfo>) => void;
  updateReflection: (data: Partial<DeineReflection>) => void;

  // Navigation
  goToNext: () => void;
  goToPrevious: () => void;
  setStep2View: (view: "district" | "topics") => void;
  restart: () => void;
}

// ✅ Correctly typed context
const AppContext = createContext<AppContextType | undefined>(undefined);

// ✅ Custom hook for consuming the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// ✅ Provider component with all values passed correctly
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [conversation, setConversation] = useState<ConversationData>(
    INITIAL_CONVERSATION_DATA
  );
  const [contactInfo, setContactInfo] = useState<ContactInfo>(CONTACT_INFO);
  const [reflection, setReflection] =
    useState<DeineReflection>(DEINE_REFLECTION);

  const [currentStep, setCurrentStep] = useState(0);
  const [step2View, setStep2View] = useState<"district" | "topics">("district");

  const updateConversation = useCallback(
    (newData: Partial<ConversationData>) => {
      setConversation((prev) => ({ ...prev, ...newData }));
    },
    []
  );

  const updateContactInfo = useCallback((newData: Partial<ContactInfo>) => {
    setContactInfo((prev) => ({ ...prev, ...newData }));
  }, []);

  const updateReflection = useCallback((newData: Partial<DeineReflection>) => {
    setReflection((prev) => ({ ...prev, ...newData }));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const restart = useCallback(() => {
    setConversation(INITIAL_CONVERSATION_DATA);
    setContactInfo(CONTACT_INFO);
    setReflection(DEINE_REFLECTION);
    setStep2View("district");
    setCurrentStep(0);
  }, []);

  const contextValue: AppContextType = {
    conversation,
    contactInfo,
    reflection,
    currentStep,
    step2View,
    updateConversation,
    updateContactInfo,
    updateReflection,
    goToNext,
    goToPrevious,
    setStep2View,
    restart,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
