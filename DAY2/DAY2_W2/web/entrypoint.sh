#!/bin/sh
set -eu

node -e "require('fs').writeFileSync('/app/member-secret', require('crypto').randomBytes(32).toString('hex'), { mode: 0o640 })"
chown appuser:appuser /app/member-secret

/usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
