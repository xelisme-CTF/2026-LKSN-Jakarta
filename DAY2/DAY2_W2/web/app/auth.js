const crypto = require('crypto');
const fs = require('fs');

const COOKIE_NAME = 'member_session';
const secret = fs.existsSync('/app/member-secret')
  ? fs.readFileSync('/app/member-secret', 'utf8').trim()
  : crypto.randomBytes(32).toString('hex');

function sign(value) {
  return crypto
    .createHmac('sha256', secret)
    .update(value)
    .digest('base64url');
}

function makeMemberCookie(name) {
  const value = String(name);
  return `${value}.${sign(value)}`;
}

function readMember(req) {
  const raw = req.cookies?.[COOKIE_NAME];
  if (!raw || !raw.includes('.')) return null;

  const idx = raw.lastIndexOf('.');
  const name = raw.slice(0, idx);
  const mac = raw.slice(idx + 1);
  const expected = sign(name);

  if (
    mac.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))
  ) {
    return null;
  }

  return name;
}

module.exports = {
  COOKIE_NAME,
  makeMemberCookie,
  readMember
};
