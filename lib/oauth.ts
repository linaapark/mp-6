export async function exchangeCodeForToken(code: string): Promise<string | null> {
    const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
            redirect_uri: process.env.OAUTH_CALLBACK_URL,
        }),
    });

    const data = await res.json();
    return data.access_token || null;
}

export async function fetchGitHubUser(accessToken: string) {
    const res = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.github.v3+json',
        },
    });

    return res.json();
}
