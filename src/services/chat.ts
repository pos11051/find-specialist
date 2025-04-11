import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
}

export const sendMessage = async (message: string): Promise<ChatMessage> => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { message });
    return {
      text: response.data.response,
      sender: 'bot'
    };
  } catch (error) {
    console.error('Error sending message:', error);
    return {
      text: 'Sorry, I encountered an error. Please try again.',
      sender: 'bot'
    };
  }
};

export async function chatWithGPT(message: string): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from server');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error:', error);
    return '죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.';
  }
} 