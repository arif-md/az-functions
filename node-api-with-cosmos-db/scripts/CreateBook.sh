#!/bin/bash
curl -X POST http://localhost:7071/api/CreateBook \
	  -H "Content-Type: application/json" \
	    -d '{"author": "Adnan", "title": "TypeScript", "date_published": "April, 2025"}'
