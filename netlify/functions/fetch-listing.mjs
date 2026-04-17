export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  try {
    const { url } = await req.json();
    let pageText = '';

    // Primary: Firecrawl — best bot bypass for real estate sites
    if (process.env.FIRECRAWL_API_KEY) {
      try {
        const fcRes = await fetch('https://api.firecrawl.dev/v1/scrape', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.FIRECRAWL_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url,
            formats: ['markdown'],
            onlyMainContent: true,
            waitFor: 2000,
          }),
          signal: AbortSignal.timeout(25000),
        });
        if (fcRes.ok) {
          const fcData = await fcRes.json();
          pageText = (fcData.data?.markdown || fcData.markdown || '').slice(0, 8000);
        }
      } catch (fcErr) {
        // Firecrawl failed — fall through to Jina
      }
    }

    // Fallback: Jina AI Reader
    if (!pageText) {
      try {
        const jinaRes = await fetch(`https://r.jina.ai/${url}`, {
          headers: {
            'Accept': 'text/plain',
            'X-Return-Format': 'markdown',
          },
          signal: AbortSignal.timeout(15000),
        });
        if (jinaRes.ok) {
          const text = await jinaRes.text();
          pageText = text.slice(0, 8000);
        }
      } catch (jinaErr) {
        // Jina failed — return empty, client will use URL slug only
      }
    }

    return Response.json({ text: pageText, url }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });

  } catch (err) {
    return Response.json(
      { error: err.message, text: '', url: '' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
};

export const config = { path: '/api/fetch-listing' };
