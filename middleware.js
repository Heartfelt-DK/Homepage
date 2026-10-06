// Sender besøgende uden for Danmark til den engelske side.
// Et aktivt valg i sprogvælgeren (cookie "lang") vinder altid; søgemaskiner omdirigeres ikke.
export const config = { matcher: ['/'] };

export default function middleware(request) {
  const cookie = request.headers.get('cookie') || '';
  const pref = /(?:^|;\s*)lang=(da|en)\b/.exec(cookie)?.[1];
  if (pref === 'da') return;

  const ua = request.headers.get('user-agent') || '';
  if (!pref && /bot|crawl|spider|slurp|preview|facebookexternalhit|linkedin/i.test(ua)) return;

  const country = request.headers.get('x-vercel-ip-country');
  if (pref === 'en' || (country && country !== 'DK')) {
    return Response.redirect(new URL('/en/', request.url), 307);
  }
}
