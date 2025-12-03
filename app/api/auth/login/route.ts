import { NextResponse } from 'next/server';

export async function GET() {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = process.env.OAUTH_CALLBACK_URL;

    const scope = "read:user user:email";

    const authUrl =
        `https://github.com/login/oauth/authorize` +
        `?client_id=${encodeURIComponent(clientId || '')}` +
        `&redirect_uri=${encodeURIComponent(redirectUri || '')}` +
        `&scope=${encodeURIComponent(scope)}`;

    return NextResponse.redirect(authUrl);
}
