'use client';

import React, { useState, useEffect, useRef } from 'react';
import { APP_TEXTS, replaceVariables } from '@/lib/constants';

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

const ConversationalQuiz: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!quizStarted) {
      const welcomeMessage: Message = {
        id: 1,
        type: 'bot',
        content: replaceVariables(APP_TEXTS.QUIZ.WELCOME_MESSAGE, { votes: 'votações reais do Congresso' }),
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      setQuizStarted(true);
    }
  }, [quizStarted]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleStartQuiz = () => {
    const botMessage: Message = {
      id: messages.length + 1,
      type: 'bot',
      content: APP_TEXTS.QUIZ.DEVELOPMENT_MESSAGE,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {APP_TEXTS.QUIZ.CHAT_TITLE}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {replaceVariables(APP_TEXTS.QUIZ.CHAT_DESCRIPTION, { based: APP_TEXTS.REAL_CONGRESS_VOTES })}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {APP_TEXTS.QUIZ.CHAT_HEADER}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {APP_TEXTS.QUIZ.CHAT_SUBTITLE}
            </p>
          </div>

          <div ref={messagesContainerRef} className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-center">
              <button
                onClick={handleStartQuiz}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {APP_TEXTS.QUIZ.START_CONVERSATION}
              </button>
            </div>
            <p className="text-center text-sm text-gray-500 mt-3">
              {APP_TEXTS.QUIZ.DEV_NOTICE}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversationalQuiz;
