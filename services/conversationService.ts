import { ConversationData } from "../types";

const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001';

export const saveConversation = async (
  data: ConversationData & {
    uuid?: string;
    sendCopy?: boolean;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }
): Promise<{ success: boolean; id: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/conversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return { 
      success: true, 
      id: result.id || result.dialogue_id || 'unknown' 
    };
  } catch (error) {
    console.error('API Error:', error);
    
    // If it's a network error (server not running), provide helpful message
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Backend server is not running. Please start the server first.');
    }
    
    throw error;
  }
};
