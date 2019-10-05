
module.exports = function(request, context) {

    // TODO: make this configurable

    const origin = request.headers.get('Origin');

    if (request.method === 'OPTIONS') {

        // Make sure the necesssary headers are present for this to be a
        // valid pre-flight request
        if (request.headers.get('Origin') !== null &&
            request.headers.get('Access-Control-Request-Method') !== null &&
            request.headers.get('Access-Control-Request-Headers') !== null)
        {
            // Handle CORS pre-flight request.
            // If you want to check the requested method + headers
            // you can do that here.

            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin':  origin,
                    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            })
        }
        else {
            // Handle standard OPTIONS request.
            return new Response(null, {
                headers: {
                    Allow: 'GET, HEAD, OPTIONS',
                },
            })
        }
    }
    else {
        context.responseHeaders = {
            'Access-Control-Allow-Origin': origin,
            'Vary': 'Origin'
        }
    }
}
