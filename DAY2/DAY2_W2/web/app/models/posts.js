const fs = require('fs');

const privateCode = fs.existsSync('/flag.txt')
  ? fs.readFileSync('/flag.txt', 'utf8').trim()
  : 'Founder approval code unavailable';

const posts = [
  {
    slug: 'arrival-protocol',
    title: 'Arrival Protocol',
    category: 'Concierge',
    summary: 'Reserved parking, private lift timing, and check-in rules for approved guests.',
    body: [
      'The front desk holds all arrivals until the private lift is ready.',
      'Guests without an approved profile remain outside the lounge floor.'
    ]
  },
  {
    slug: 'quarterly-briefing',
    title: 'Quarterly Briefing',
    category: 'Executive',
    summary: 'A private note for the approved lounge profile.',
    body: [
      'This briefing is visible only from an approved VVIP session.',
      `Founder approval code: ${privateCode}`
    ]
  },
  {
    slug: 'guestlist-policy',
    title: 'Guestlist Policy',
    category: 'Membership',
    summary: 'Current admission policy for all unverified public applicants.',
    body: [
      'Public applications are rejected by default.',
      'Only the approved profile may review private lounge materials.'
    ]
  }
];

function listPosts() {
  return posts.map(({ slug, title, category, summary }) => ({
    slug,
    title,
    category,
    summary
  }));
}

function findPost(slug) {
  return posts.find((post) => post.slug === slug) || null;
}

module.exports = {
  listPosts,
  findPost
};
