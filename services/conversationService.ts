import { ConversationData } from "../types";

const API_BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';

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
    const url = `${API_BASE_URL}/api/v1/conversations`;
    console.log('Submitting to:', url);
    console.log('Data:', JSON.stringify(data, null, 2));
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText || 'Unknown error' };
      }
      
      throw new Error(errorData.error || errorData.details || `HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Success response:', result);
    
    return { 
      success: true, 
      id: result.id || result.uuid || result.dialogue_id || 'unknown' 
    };
  } catch (error) {
    console.error('API Error:', error);
    
    // If it's a network error (server not running), provide helpful message
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to server');
    }
    
    throw error;
  }
};
