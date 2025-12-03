import { NextResponse } from 'next/server';
import { exchangeCodeForToken, fetchGitHubUser } from '@/lib/oauth';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: 'Missing code' }, { status: 400 });
    }

    const accessToken = await exchangeCodeForToken(code);

    if (!accessToken) {
        return NextResponse.json({ error: 'Token exchange failed' }, { status: 500 });
    }

    const user = await fetchGitHubUser(accessToken);

    const html = `
    <html>
      <head><meta charset="utf-8"/><title>GitHub User</title></head>
      <body style="font-family: sans-serif; padding: 24px;">
        <h1>Signed in with GitHub</h1>
        <img src="${user.avatar_url}" width="90" style="border-radius: 8px; margin-top: 12px;" />
        <p><strong>Name:</strong> ${user.name || "—"}</p>
        <p><strong>Username:</strong> ${user.login}</p>
        <p><strong>Email:</strong> ${user.email || "—"}</p>

        <p style="margin-top: 20px;"><a href="/">Return Home</a></p>
      </body>
    </html>
  `;

    return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html' } });
}
