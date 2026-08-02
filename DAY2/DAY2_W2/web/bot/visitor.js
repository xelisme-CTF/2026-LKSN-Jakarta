const http = require('http');
const https = require('https');

const { COOKIE_NAME, makeMemberCookie } = require('../app/auth');

const VISIT_TIMEOUT_MS = 8000;
const REVIEWER_NAME = 'lordrukie';

async function visitUrl(rawUrl) {
  const target = new URL(rawUrl);
  const client = target.protocol === 'https:' ? https : http;
  const port = target.port || (target.protocol === 'https:' ? 443 : 80);

  return new Promise((resolve, reject) => {
    const req = client.request({
      hostname: target.hostname,
      port,
      method: 'GET',
      path: `${target.pathname}${target.search}`,
      headers: {
        Host: target.host,
        'User-Agent': 'office-reviewer/1.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        Cookie: `${COOKIE_NAME}=${encodeURIComponent(makeMemberCookie(REVIEWER_NAME))}`
      },
      timeout: VISIT_TIMEOUT_MS
    }, (res) => {
      res.resume();
      res.on('end', () => resolve(res.statusCode));
    });

    req.on('timeout', () => req.destroy(new Error('visit timeout')));
    req.on('error', reject);
    req.end();
  });
}

module.exports = {
  visitUrl
};
