vcl 4.1;

backend default {
    .host = "127.0.0.1";
    .port = "8080";
}

sub vcl_recv {
    if (req.method == "GET" && req.url ~ "^/static/") {
        return (hash);
    }

    return (pass);
}

sub vcl_hash {
    hash_data(req.url);
    return (lookup);
}

sub vcl_backend_response {
    if (bereq.url ~ "^/static/") {
        set beresp.ttl = 60s;
        set beresp.grace = 0s;
    }
}

sub vcl_deliver {
    if (obj.hits > 0) {
        set resp.http.X-Cache = "HIT";
    } else {
        set resp.http.X-Cache = "MISS";
    }
}
