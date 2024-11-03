from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        SimpleHTTPRequestHandler.end_headers(self)

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

server_address = ('', 8000)
httpd = HTTPServer(server_address, CORSRequestHandler)
print('Server running at http://localhost:8000')
httpd.serve_forever() 