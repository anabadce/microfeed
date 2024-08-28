import React from "react";
import {renderReactToHtml} from "../../edge-src/common/PageUtils";
import EdgeAdminHomeApp from "../../edge-src/EdgeAdminHomeApp";

export async function onRequestGet({ data }) {
  const {feedContent, onboardingResult} = data;

  // abadcer-com - 403 for /admin pages if host is Cloudflare's pages.dev
  const baseUrl = data.feedDb.baseUrl;
  // Check if the URL contains /admin
  if (baseUrl && baseUrl.includes('pages.dev')) {
    return new Response('Forbidden', { 
      status: 403,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      } 
    });
  }
  // abadcer-com END

  const fromReact = renderReactToHtml(<EdgeAdminHomeApp
    feedContent={feedContent}
    onboardingResult={onboardingResult}
  />);

  return new Response(fromReact, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
