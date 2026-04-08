import { useContext } from 'react';
import { FinFlowContext } from '../context/FinFlowContext';

export const useFinFlow = () => {
  const context = useContext(FinFlowContext);
  if (!context) {
    throw new Error('useFinFlow must be used within FinFlowProvider');
  }
  return context;
};
