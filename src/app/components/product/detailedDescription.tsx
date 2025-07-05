import React from 'react';

const DetailedDescription = ({ description }: { description: string }) => {
  // Pre-process the text to handle common formatting issues
  const preprocessText = (text: string) => {
    // If the text contains ### or ## but no line breaks, it's likely improperly formatted
    // Split on common markdown indicators and add line breaks
    let processed = text
      // Add line breaks before headers
      .replace(/(\s)(#{1,6}\s)/g, '\n\n$2')
      // Add line breaks after headers
      .replace(/(#{1,6}\s[^\n]+)/g, '$1\n\n')
      // Add line breaks around horizontal rules
      .replace(/(\s)(---+|\*\*\*+|___+)(\s)/g, '\n\n$2\n\n')
      // Add line breaks before lists
      .replace(/(\s)([-*+]\s)/g, '\n$2')
      // Add line breaks before numbered lists
      .replace(/(\s)(\d+\.\s)/g, '\n$2')
      // Add line breaks before blockquotes
      .replace(/(\s)(>\s)/g, '\n$2')
      // Handle checkmarks as bullet points
      .replace(/✅/g, '\n- ✅')
      // Clean up multiple consecutive line breaks
      .replace(/\n{3,}/g, '\n\n')
      // Trim whitespace
      .trim();

    return processed;
  };

  const parseMarkdown = (text: string) => {
    // First preprocess the text
    const processedText = preprocessText(text);
    
    // Split text into lines to handle line breaks properly
    const lines = processedText.split('\n');
    const elements: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    let listItems: string[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = '';

    const processParagraph = (paragraph: string) => {
      if (!paragraph.trim()) return null;

      // Process inline markdown
      let parts = [paragraph];
      
      // Bold (**text** or __text__)
      parts = parts.flatMap(part => 
        typeof part === 'string' 
          ? part.split(/(\*\*[^*]+\*\*|__[^_]+__)/g)
          : [part]
      );

      // Italic (*text* or _text_)
      parts = parts.flatMap(part => 
        typeof part === 'string' 
          ? part.split(/(\*[^*\s][^*]*[^*\s]\*(?!\*)|_[^_\s][^_]*[^_\s]_(?!_))/g)
          : [part]
      );

      // Inline code (`text`)
      parts = parts.flatMap(part => 
        typeof part === 'string' 
          ? part.split(/(`[^`]+`)/g)
          : [part]
      );

      // Links [text](url)
      parts = parts.flatMap(part => 
        typeof part === 'string' 
          ? part.split(/(\[([^\]]+)\]\(([^)]+)\))/g)
          : [part]
      );

      // Convert parts to JSX
      return parts.map((part, index) => {
        if (typeof part !== 'string') return part;
        
        // Bold
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('__') && part.endsWith('__')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        
        // Italic
        if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
          return <em key={index}>{part.slice(1, -1)}</em>;
        }
        if (part.startsWith('_') && part.endsWith('_') && !part.startsWith('__')) {
          return <em key={index}>{part.slice(1, -1)}</em>;
        }
        
        // Inline code
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={index} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono">
              {part.slice(1, -1)}
            </code>
          );
        }
        
        // Links
        const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          return (
            <a 
              key={index} 
              href={linkMatch[2]} 
              className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {linkMatch[1]}
            </a>
          );
        }
        
        return part;
      });
    };

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(' ').trim();
        if (paragraphText) {
          const processed = processParagraph(paragraphText);
          if (processed && processed.some(p => p && p.toString().trim())) {
            elements.push(
              <p key={elements.length} className="mb-4 leading-relaxed">
                {processed}
              </p>
            );
          }
        }
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={elements.length} className="list-disc list-inside mb-6 space-y-2 ml-4">
            {listItems.map((item, index) => (
              <li key={index} className="leading-relaxed">{processParagraph(item)}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const flushCodeBlock = () => {
      if (codeBlockContent.length > 0) {
        elements.push(
          <div key={elements.length} className="mb-6">
            <pre className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 overflow-x-auto border border-gray-200 dark:border-gray-700">
              <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                {codeBlockContent.join('\n')}
              </code>
            </pre>
          </div>
        );
        codeBlockContent = [];
        codeBlockLanguage = '';
      }
    };

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock();
          inCodeBlock = false;
        } else {
          flushParagraph();
          flushList();
          inCodeBlock = true;
          codeBlockLanguage = line.slice(3).trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Handle headers
      if (line.startsWith('#')) {
        flushParagraph();
        flushList();
        const level = line.match(/^#+/)?.[0].length || 1;
        const text = line.replace(/^#+\s*/, '');
        const HeaderTag = `h${Math.min(level + 1, 6)}` as keyof JSX.IntrinsicElements;
        const headerClasses = {
          2: 'text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white',
          3: 'text-xl font-bold mb-3 mt-6 text-gray-900 dark:text-white',
          4: 'text-lg font-semibold mb-3 mt-5 text-gray-800 dark:text-gray-100',
          5: 'text-base font-semibold mb-2 mt-4 text-gray-800 dark:text-gray-100',
          6: 'text-sm font-semibold mb-2 mt-3 text-gray-700 dark:text-gray-200'
        }[Math.min(level + 1, 6)] || 'text-base font-medium mb-2 mt-3';
        
        elements.push(
          React.createElement(HeaderTag, {
            key: elements.length,
            className: headerClasses
          }, text)
        );
        return;
      }

      // Handle lists (including checkmarks)
      if (line.match(/^\s*[-*+]\s/) || line.match(/^\s*[-*+]\s*✅/)) {
        flushParagraph();
        const item = line.replace(/^\s*[-*+]\s*/, '');
        listItems.push(item);
        return;
      }

      // Handle numbered lists
      if (line.match(/^\s*\d+\.\s/)) {
        flushParagraph();
        flushList(); // Flush unordered list first
        const item = line.replace(/^\s*\d+\.\s/, '');
        elements.push(
          <ol key={elements.length} className="list-decimal list-inside mb-6 space-y-2 ml-4">
            <li className="leading-relaxed">{processParagraph(item)}</li>
          </ol>
        );
        return;
      }

      // Handle blockquotes
      if (line.startsWith('>')) {
        flushParagraph();
        flushList();
        const quoteText = line.replace(/^>\s*/, '');
        elements.push(
          <blockquote key={elements.length} className="border-l-4 border-blue-500 dark:border-blue-400 bg-gray-50 dark:bg-gray-800/50 pl-4 py-2 italic mb-6 rounded-r-lg">
            <div className="text-gray-700 dark:text-gray-300">
              {processParagraph(quoteText)}
            </div>
          </blockquote>
        );
        return;
      }

      // Handle horizontal rules
      if (line.match(/^[-*_]{3,}$/)) {
        flushParagraph();
        flushList();
        elements.push(
          <hr key={elements.length} className="my-8 border-gray-300 dark:border-gray-600" />
        );
        return;
      }

      // Handle empty lines
      if (line.trim() === '') {
        flushParagraph();
        flushList();
        return;
      }

      // Regular text - add to current paragraph
      currentParagraph.push(line);
    });

    // Flush remaining content
    flushParagraph();
    flushList();
    flushCodeBlock();

    return elements;
  };

  const renderedContent = parseMarkdown(description);

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden p-8 lg:p-12 mt-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Detailed Description
      </h2>
      <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        {renderedContent.length > 0 ? renderedContent : <p>No description provided.</p>}
      </div>
    </div>
  );
};

export default DetailedDescription;