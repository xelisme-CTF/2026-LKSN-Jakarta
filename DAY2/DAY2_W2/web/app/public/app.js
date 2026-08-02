document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-review-form]');
  if (!form) return;

  form.addEventListener('submit', () => {
    const button = form.querySelector('button[type="submit"]');
    if (!button) return;
    button.disabled = true;
    button.textContent = 'Submitting';
  });
});
