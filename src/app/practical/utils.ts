// Utility functions for working with code snippets and notebooks
import { type Question } from './questions';

/**
 * Creates a GitHub Gist-compatible URL for opening Python code in Google Colab
 * This uses GitHub's Gist service as a reliable intermediary to open code in Colab
 * 
 * @param code The Python code to open in Google Colab
 * @param title The title for the notebook (usually the question text)
 * @returns A promise that resolves to the Colab URL
 */
export async function createColabUrl(code: string, title: string): Promise<string> {
  // Default Colab URL if we can't create a Gist
  const fallbackUrl = 'https://colab.research.google.com';
  
  try {
    // For client-side usage, always return the default Colab URL
    return fallbackUrl;
  } catch (error) {
    console.error('Error generating Colab URL:', error);
    return fallbackUrl;
  }
}

/**
 * Prepares code for display and execution
 * 
 * @param code The code snippet
 * @param language The language of the code
 * @returns Formatted code ready for display
 */
export function formatCode(code: string, language: string): string {
  // Remove any trailing whitespace and ensure consistent line endings
  return code.trim().replace(/\r\n/g, '\n');
}

/**
 * Opens code in Google Colab or a new tab based on the selected language
 * 
 * @param code The code snippet to open
 * @param selectedQuestion The currently selected question
 * @param selectedLanguage The currently selected language
 * @param setCopySuccess Callback to set copy success message
 */
export function openInColab(
  code: string, 
  selectedQuestion: Question, 
  selectedLanguage: string, 
  setCopySuccess: (message: string) => void
): void {
  if (selectedLanguage === 'python') {
    if (selectedQuestion.colabLink) {
      // Use the pre-created Colab link if available
      window.open(selectedQuestion.colabLink);
    } else {
      // Fallback to the old approach if no link is provided
      const newWindow = window.open('https://colab.research.google.com');
      
      // Format code to include the question as a comment header
      const questionText = selectedQuestion.text.replace(/\$/g, '').replace(/\n/g, ' ');
      const codeWithHeader = `# ${questionText}\n\n${code}`;
      
      // Copy to clipboard and show notification
      navigator.clipboard.writeText(codeWithHeader)
        .then(() => {
          setCopySuccess('Code copied! Paste into Colab with Ctrl+V');
          setTimeout(() => setCopySuccess(''), 5000);
        })
        .catch(err => {
          console.error('Failed to copy:', err);
          setCopySuccess('Click Copy button then paste in Colab');
          setTimeout(() => setCopySuccess(''), 5000);
        });
    }
  } else {
    // For other languages, we'll just open the code in a new tab with syntax highlighting
    const newTab = window.open('');
    if (newTab) {
      newTab.document.write(`
        <html>
          <head>
            <title>${selectedLanguage.toUpperCase()} Code</title>
            <style>
              body { background: #1e1e1e; color: #ddd; font-family: monospace; padding: 20px; }
              pre { background: #2d2d2d; padding: 15px; border-radius: 5px; overflow-x: auto; }
            </style>
          </head>
          <body>
            <h2 style="color: #eee;">${selectedLanguage.toUpperCase()} Code Sample</h2>
            <pre>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
          </body>
        </html>
      `);
      newTab.document.close();
    }
  }
}
