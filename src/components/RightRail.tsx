import React, { useState } from 'react';
import { MessageCircle, Send, Lightbulb, CheckCircle, ExternalLink, Minimize2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  proposal?: {
    title: string;
    description: string;
    tables: string[];
    confidence: number;
  };
}

export default function RightRail() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hi! I can help you understand your data relationships and create golden sets. What would you like to explore?',
      timestamp: new Date(Date.now() - 300000),
      suggestions: [
        'Why do 1,142 accounts duplicate?',
        'Show join logic for Tickets→Accounts',
        'Create customer 360 view'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };

    // Simulate AI response
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: `I found that ${inputText.toLowerCase().includes('duplicate') ? 'duplicates occur mainly due to email variations and missing phone standardization. The primary sources are Salesforce (67%) and ServiceNow (33%)' : 'the relationship shows strong correlation based on customer_id matching across systems'}.`,
      timestamp: new Date(),
      proposal: inputText.toLowerCase().includes('360') ? {
        title: 'Customer 360 Golden Set',
        description: 'Unified customer view combining Salesforce accounts, PostgreSQL orders, and ServiceNow tickets',
        tables: ['Customers', 'Orders', 'Tickets'],
        confidence: 94
      } : undefined
    };

    setMessages([...messages, userMessage, assistantMessage]);
    setInputText('');
  };

  const handleAcceptProposal = (message: ChatMessage) => {
    if (message.proposal) {
      // This would create a new tab in the playground
      console.log('Creating golden set:', message.proposal.title);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  if (isMinimized) {
    return (
      <div className="w-12 bg-white border-l border-gray-200 flex items-start justify-center pt-4">
        <button
          onClick={() => setIsMinimized(false)}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
        >
          <MessageCircle size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle size={20} className="text-blue-600" />
            <h3 className="font-semibold text-gray-900">Explainable Data Chat</h3>
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <Minimize2 size={16} />
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">Ask questions about your data relationships and patterns</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`${message.type === 'user' ? 'ml-4' : 'mr-4'}`}>
            <div className={`rounded-lg p-3 ${
              message.type === 'user' 
                ? 'bg-blue-600 text-white ml-auto max-w-xs' 
                : 'bg-gray-50 text-gray-900'
            }`}>
              <p className="text-sm">{message.content}</p>
              
              {message.suggestions && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left p-2 text-sm bg-white rounded border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {message.proposal && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb size={16} className="text-blue-600" />
                    <h4 className="font-medium text-blue-900">{message.proposal.title}</h4>
                  </div>
                  <p className="text-sm text-blue-800 mb-2">{message.proposal.description}</p>
                  <div className="text-xs text-blue-700 mb-3">
                    <strong>Sources:</strong> {message.proposal.tables.join(', ')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-700">
                      Confidence: {message.proposal.confidence}%
                    </span>
                    <button
                      onClick={() => handleAcceptProposal(message)}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors duration-200"
                    >
                      <CheckCircle size={14} />
                      <span>Accept</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about your data..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}