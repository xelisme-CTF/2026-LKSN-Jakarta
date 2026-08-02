FROM node:22-trixie-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates nginx supervisor varnish \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY app/package*.json ./app/
RUN cd /app/app \
  && npm install --omit=dev \
  && npm cache clean --force

COPY app ./app
COPY bot ./bot
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY config/varnish/default.vcl /etc/varnish/default.vcl
COPY flag.txt /flag.txt
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh \
  && useradd --system --home-dir /nonexistent --shell /usr/sbin/nologin appuser

EXPOSE 80

CMD ["/entrypoint.sh"]
