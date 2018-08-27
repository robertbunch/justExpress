// Networking - http and tcp/udp
// - stateless
// - connectionless
// - flexible
// - HTTP message
// -- start line
// --- req: GET /blog http/1.1
// --- res: http/1.1 200 OK
// -- headers
// --- {key:values}
// ---- content-type:text/html
// ---- content-type:appliction/json
// ---- Cache-Control: public, max-age=0
// ---- Date: Fri, 24 Aug 2018 15:23:58 GMT
// -- BLANK LINE
// -- body
// --- STUFF - HTML, 4k video (binary), image

// Node server
// - write headers
// - write body
// -- used the fs module
// - close connection
// - server.listen
// -- 3000
// - req, res

// Express version
// - Express IS Nodesjs
// - app === express() === createApplcation()
// - server.listen ---> app.listen
// - router
// -- app.get, app.post, app.all, etc.
// - served up static files, with express.static() middleware

// 201
// - Middleware = is any function that has access to req, res, and next
// -- networking on the outside, node/express development on the inside
// -- app.use, anytime you see a callback/function (req, res, next)=>
// --- next() is the way to move a piece of middleware foward
// -- express.json() -- body parser
// -- express.urlencoded() -- body parser
// -- helmet() -- 3rd party module
// Request
// - req.ip - contains requesters ip
// - req.path - contains the requested path
// - req.body - parsed data
// Response
// - res.send (.end()) - send text/html
// - res.sendFile - send a file!
// - res.locals - is availale through the res
// - res.json (jsonp) - sends json back as application/json