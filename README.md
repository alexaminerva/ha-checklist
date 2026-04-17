# HouseAccount Checklist Generator

Year 1 home maintenance checklist tool for real estate agents.

## Setup

1. Add your Anthropic API key as an environment variable in Netlify:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your key from platform.anthropic.com

2. Deploy to Netlify — publish directory is `public`, functions directory is `netlify/functions`.

## Local Testing

To test locally, install the Netlify CLI:
```
npm install -g netlify-cli
netlify dev
```

Then open http://localhost:8888
