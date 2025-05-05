import http from 'node:http';

const server = http.createServer( (req, res) => {


    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const queryObj = Object.fromEntries(urlObj.searchParams);

    console.log(queryObj);

});

const PORT = 8000;
server.listen(PORT, () => console.log(`Server is listening on http://localhost${PORT}`));