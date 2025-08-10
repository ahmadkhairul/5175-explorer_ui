export default async (request, context) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    })
  }

  // ... your main Edge Function logic ...

  const response = await context.next()

  response.headers.set('Access-Control-Allow-Origin', '*')

  return response
}
