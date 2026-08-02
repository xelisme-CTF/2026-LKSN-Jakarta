const { visitUrl } = require('../../bot/visitor');
const { readMember } = require('../auth');
const posts = require('../models/posts');

function renderRejection(res, statusCode = 200, message = null, submittedUrl = '') {
  res.status(statusCode).render('rejection', {
    title: 'Application Rejected',
    member: null,
    message,
    submittedUrl
  });
}

function getRejection(req, res) {
  renderRejection(res);
}

function getReview(req, res) {
  renderRejection(res);
}

function validSubmittedUrl(value) {
  if (typeof value !== 'string' || value.length < 8 || value.length > 700) {
    return null;
  }

  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    return url;
  } catch {
    return null;
  }
}

function postReview(req, res) {
  const rawUrl = String(req.body.url || '').trim();
  const parsed = validSubmittedUrl(rawUrl);

  if (!parsed) {
    renderRejection(res, 400, 'The address could not be scheduled.', rawUrl);
    return;
  }

  visitUrl(parsed.toString())
    .catch((err) => console.error('Review visit failed:', err.message));

  renderRejection(res, 200, 'The submitted address is being reviewed.', rawUrl);
}

function requireMember(req, res) {
  const member = readMember(req);
  if (member !== 'lordrukie') {
    renderRejection(res, 403, 'The lounge is reserved for approved VVIP members.');
    return null;
  }

  return member;
}

function getMembers(req, res) {
  const member = requireMember(req, res);
  if (!member) return;

  res.render('member', {
    title: 'Members Area',
    member,
    posts: posts.listPosts()
  });
}

function getPost(req, res) {
  const member = requireMember(req, res);
  if (!member) return;

  const post = posts.findPost(req.params.slug);
  if (!post) {
    renderRejection(res, 404, 'The requested lounge post is not available.');
    return;
  }

  res.render('post', {
    title: post.title,
    member,
    post
  });
}

function notFound(req, res) {
  renderRejection(res, 404, 'The requested address is not listed in the registry.');
}

module.exports = {
  getRejection,
  getReview,
  postReview,
  getMembers,
  getPost,
  notFound
};
