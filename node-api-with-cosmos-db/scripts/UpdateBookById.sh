#!/bin/bash
curl -X PUT "http://localhost:7071/api/UpdateBookById?id=1c07626e-0c29-420a-bab1-cadb4531e51a&partitionKeyValue=Adnan" \
	  -H "Content-Type: application/json" \
	    -d '{"title": "TypeScript Updated"}'
