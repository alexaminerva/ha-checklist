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

    // Primary: Jina AI Reader — bypasses Zillow/Redfin bot protection, returns clean markdown
    try {
      const jinaUrl = `https://r.jina.ai/${url}`;
      const res = await fetch(jinaUrl, {
        headers: {
          'Accept': 'text/plain',
          'X-Return-Format': 'markdown',
        },
        signal: AbortSignal.timeout(15000),
      });

      if (res.ok) {
        const text = await res.text();
        pageText = text.slice(0, 8000);
      }
    } catch (jinaErr) {
      // Jina failed — try direct fetch as fallback
      try {
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
          },
          redirect: 'follow',
          signal: AbortSignal.timeout(10000),
        });

        if (res.ok) {
          const html = await res.text();
          pageText = html
            .replace(/<script[\s\S]*?<\/script>/gi, '')
            .replace(/<style[\s\S]*?<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .slice(0, 8000);
        }
      } catch (fetchErr) {
        // Both failed — Claude will extract from URL slug only
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
