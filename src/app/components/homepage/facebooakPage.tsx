'use client'
import React, { useEffect, useState } from 'react';

// Extend Window interface for Facebook SDK
declare global {
  interface Window {
    FB: any;
  }
}

interface FacebookPageEmbedProps {
  pageUrl: string;
  tabName?: string;
}

const FacebookPageEmbed = ({ pageUrl, tabName = 'timeline' }: FacebookPageEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Load Facebook SDK
    if (typeof window !== 'undefined' && !window.FB) {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        setIsLoaded(true);
        // Parse Facebook elements
        if (window.FB) {
          window.FB.XFBML.parse();
        }
      };
      
      document.body.appendChild(script);

      // Cleanup
      return () => {
        try {
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
        } catch (error) {
          console.log('Script cleanup error:', error);
        }
      };
    } else if (window.FB) {
      setIsLoaded(true);
      window.FB.XFBML.parse();
    }
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="w-full p-8 text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {!isLoaded && (
        <div className="p-8 text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-4">Loading Facebook content...</p>
        </div>
      )}
      
      <div 
        className="fb-page" 
        data-href={pageUrl}
        data-tabs={tabName}
        data-width="500"
        data-height="700"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
        style={{ display: isLoaded ? 'block' : 'none' }}
      >
        <blockquote 
          cite={pageUrl}
          className="fb-xfbml-parse-ignore"
        >
          <a href={pageUrl} className="text-blue-600 hover:text-blue-800">
            Visit our Facebook Page
          </a>
        </blockquote>
      </div>
    </div>
  );
};

export default FacebookPageEmbed;