## A prompt response logging system with detailed metrics.

### A proxy layer through which all the requests will be routed. This proxy layer will do the following:
1. Forward the request to Cohere AI and return the response to the caller
2. Log the request to Clickhouse database along with few other metadata like number of tokens, response latency etc.
3. A dashboard to showcase the requests and some statistics about the requests. 
