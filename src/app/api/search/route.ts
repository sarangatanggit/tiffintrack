import { NextResponse } from 'next/server';

const API_URL = 'https://gateway.apyflux.com/search';
const APP_ID = '1948be40-3210-4d66-bb38-b660249ef2dc';
const CLIENT_ID = 'NF3UFAwOBNbBouyKZyLwbtnFb8W2';
const API_KEY = 'QhKsuOGIT1YzbF+jxqWKV11PSbI+0ickzkxuTnem238=';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const value = searchParams.get('value');

  if (!value) {
    return NextResponse.json({ error: 'Search value is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${API_URL}?value=${encodeURIComponent(value)}`, {
      headers: {
        'x-app-id': APP_ID,
        'x-client-id': CLIENT_ID,
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Limit to top 10 results
    data.items = data.items.slice(0, 10);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search results' },
      { status: 500 }
    );
  }
} 