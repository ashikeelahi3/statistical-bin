"use client"

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'katex/dist/katex.min.css';
import { sampleQuestions, type Question, type CodeSnippets } from './questions';
import { openInColab } from './utils';

// Dynamically import components to avoid SSR issues with browser-only libraries
const Latex = dynamic(() => import('react-latex-next'), { ssr: false });
const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter/dist/cjs/prism'), { ssr: false });

// Import styles directly since they don't need to be React components
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// This component will render code from external files
export default function PracticalPage() {
  // Define a type for valid code snippet languages - must match keys in CodeSnippets interface
  type CodeLanguage = keyof CodeSnippets;
  const [selectedQuestion, setSelectedQuestion] = useState(sampleQuestions[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<CodeLanguage>('python');
  const [copySuccess, setCopySuccess] = useState<string>('');
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Statistical Practice Questions</h1>
      
      {/* Question selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select a question:</label>
        <select 
          title='question'
          className="w-full p-2 border rounded"
          value={selectedQuestion.id}
          onChange={(e) => {
            const questionId = parseInt(e.target.value);
            const question = sampleQuestions.find(q => q.id === questionId);
            if (question) setSelectedQuestion(question);
          }}
        >
          {sampleQuestions.map(q => (
            <option key={q.id} value={q.id}>Question {q.id}</option>
          ))}
        </select>
      </div>
      
      {/* Question display with LaTeX */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Question {selectedQuestion.id}</h2>
        <div className="question-text">
          <Latex>{selectedQuestion.text}</Latex>
        </div>
      </div>
      
      {/* Code display with language tabs */}
      <div className="bg-white p-4 rounded shadow">
        <div className="flex mb-4">
          <button 
            className={`px-4 py-2 mr-2 ${selectedLanguage === 'python' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
            onClick={() => setSelectedLanguage('python')}
          >
            Python
          </button>
          <button 
            className={`px-4 py-2 mr-2 ${selectedLanguage === 'r' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
            onClick={() => setSelectedLanguage('r')}
          >
            R
          </button>
          <button 
            className={`px-4 py-2 ${selectedLanguage === 'cpp' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
            onClick={() => setSelectedLanguage('cpp')}
          >
            C/C++
          </button>
        </div>          {/* Code snippet */}        <div className="bg-gray-800 p-4 rounded relative">
          {/* Copy button overlay */}
          <div className="absolute top-2 right-2">
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs flex items-center"
              onClick={() => {
                navigator.clipboard.writeText(selectedQuestion.codeSnippets[selectedLanguage])
                  .then(() => {
                    setCopySuccess('Copied!');
                    setTimeout(() => setCopySuccess(''), 2000);
                  })
                  .catch(err => {
                    console.error('Failed to copy text: ', err);
                    setCopySuccess('Failed to copy');
                  });
              }}
            >
              {copySuccess || (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          
          {selectedQuestion.codeSnippets && (
            <SyntaxHighlighter 
              language={selectedLanguage} 
              style={dracula} 
              className="text-sm"
              showLineNumbers={true}
              customStyle={{
                borderRadius: '0.25rem',
                fontSize: '0.875rem',
              }}
            >
              {selectedQuestion.codeSnippets[selectedLanguage]}
            </SyntaxHighlighter>
          )}
        </div>
            {/* Google Colab button */}
        <div className="mt-4 text-right">          <button 
            className="px-4 py-2 bg-yellow-500 text-white rounded flex items-center ml-auto"
            onClick={() => openInColab(
              selectedQuestion.codeSnippets[selectedLanguage],
              selectedQuestion,
              selectedLanguage,
              setCopySuccess
            )}
          ><svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.9 17.152V6.8483C16.9 5.99201 16.2038 5.2959 15.3475 5.2959H8.69614C7.83986 5.2959 7.14375 5.99201 7.14375 6.8483V17.152C7.14375 18.0083 7.83986 18.7044 8.69614 18.7044H15.3475C16.2038 18.7044 16.9 18.0083 16.9 17.152Z" fill="currentColor"/>
              <path d="M10.6162 15.0659C11.0551 15.0659 11.4686 14.8265 11.4686 14.3877C11.4686 13.9489 11.0551 13.7095 10.6162 13.7095C10.1774 13.7095 9.7639 13.9489 9.7639 14.3877C9.7639 14.8265 10.1774 15.0659 10.6162 15.0659Z" fill="#FFBA00"/>
              <path d="M13.0861 8.98111C12.6473 8.98111 12.2338 9.22051 12.2338 9.65932C12.2338 10.0981 12.6473 10.3375 13.0861 10.3375C13.525 10.3375 13.9385 10.0981 13.9385 9.65932C13.9385 9.22051 13.525 8.98111 13.0861 8.98111Z" fill="#FFBA00"/>
              <path d="M13.0861 15.0659C14.2204 15.0659 15.0655 14.2208 15.0655 13.0864C15.0655 11.9521 14.2204 11.107 13.0861 11.107C11.9517 11.107 11.1066 11.9521 11.1066 13.0864C11.1066 14.2208 11.9517 15.0659 13.0861 15.0659Z" fill="white"/>
              <path d="M10.6162 10.3375C11.7505 10.3375 12.5956 9.49242 12.5956 8.35806C12.5956 7.2237 11.7505 6.37866 10.6162 6.37866C9.48183 6.37866 8.63678 7.2237 8.63678 8.35806C8.63678 9.49242 9.48183 10.3375 10.6162 10.3375Z" fill="white"/>
            </svg>
            Open in {selectedLanguage === 'python' ? 'Google Colab' : 'New Tab'}
          </button>
          
          {/* Toast notification */}
          {copySuccess && (
            <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg flex items-center transition-opacity duration-500">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {copySuccess}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}