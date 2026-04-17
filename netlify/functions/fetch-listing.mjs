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

    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Cache-Control': 'no-cache',
        },
        redirect: 'follow',
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
      // Page fetch failed — Claude will extract from URL only
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
