# AI-Powered Recycling Helper — Backend

Microservices architecture, each a default Flask app, routed through Kong API Gateway (DB-less / declarative mode), all deployable via Docker Compose.

## Structure

```
recycling-helper/
├── docker-compose.yml
├── kong/
│   └── kong.yml                # Kong declarative config (routes/services)
├── image-recognition/
│   ├── app.py                  # default Flask app (port 5000)
│   ├── requirements.txt
│   └── Dockerfile
├── object-detection/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── nlp-chatbot/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── recycling-guide/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
└── bin-map-service/
    ├── app.py
    ├── requirements.txt
    └── Dockerfile
```

Each `app.py` is the unmodified default Flask scaffold (`/` returns "Hello, World!" on port 5000). Replace the logic in each service's `app.py` later — no other files need to change to add real features.

## Routing (via Kong, exposed on port 8000)

| Path prefix              | Forwards to              |
|---------------------------|---------------------------|
| `/api/image-recognition/*` | image-recognition (5000) |
| `/api/object-detection/*`  | object-detection (5000)  |
| `/api/chatbot/*`            | nlp-chatbot (5000)        |
| `/api/guide/*`               | recycling-guide (5000)    |
| `/api/bin-map/*`             | bin-map-service (5000)    |

`strip_path: true` means Kong removes the prefix before forwarding, so e.g. a request to
`http://localhost:8000/api/image-recognition/` arrives at the image-recognition Flask app as `/`.

## Running

```bash
docker compose up --build
```

- Kong proxy: http://localhost:8000
- Kong admin API: http://localhost:8001
- Each Flask service is internal-only (not published to host), reachable only through Kong.

## Notes

- Kong runs in DB-less (declarative) mode — no Postgres/Cassandra needed, config lives in `kong/kong.yml`.
- To add a new microservice: create a new folder with the same `app.py` / `requirements.txt` / `Dockerfile` pattern, add it to `docker-compose.yml`, and add a `services` + `routes` entry to `kong/kong.yml`.
- All services share the `recycling-net` Docker network and talk to each other / Kong using their container names as hostnames.
