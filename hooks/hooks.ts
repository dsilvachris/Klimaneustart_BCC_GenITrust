import { useAppContext } from "../AppContext";

export const useConversation = () => {
  const { conversation, updateConversation } = useAppContext();
  return { data: conversation, updateData: updateConversation };
};

export const useContactInfo = () => {
  const { contactInfo, updateContactInfo } = useAppContext();
  return { data: contactInfo, updateData: updateContactInfo };
};

export const useReflection = () => {
  const { reflection, updateReflection } = useAppContext();
  return { data: reflection, updateData: updateReflection };
};

export const useStepNavigation = () => {
  
  
  const { 
    currentStep, 
    goToNext, 
    goToPrevious,
    step2View,
    setStep2View,
    restart
  } = useAppContext();
  console.log(currentStep,"currentStep");
  return {
    currentStep,
    onNext: goToNext,
    onBack: goToPrevious,
    step2View,
    setStep2View,
    restart
  };
};
