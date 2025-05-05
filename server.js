import http from "node:http";
import { URL } from 'url';
import { getDataFromDatabase } from './database/db.js';
import { sendResponse, filterData, filterQueryParam } from './utils/utils.js';
const PORT = 8000;

const server = http.createServer( async (req, res) => {

    let host = req.headers.host || `localhost:${PORT}/`; // fallback host


    const destinations = await getDataFromDatabase();

    const urlObj = new URL(req.url, `http://${host}/`);



    const queryObj = Object.fromEntries(urlObj.searchParams);

    console.log(urlObj)


    if(req.url === '/api/destinations' && req.method === 'GET' || urlObj.search !== '')
    {
        if(urlObj.search !== '')
        {
            const filterData = filterQueryParam(res, destinations, Object.fromEntries(urlObj.searchParams));

            console.log(filterData);

            // sendResponse(res, 200, filterData);

        }
        else
        {
            sendResponse(res, 200, destinations);
        }
    }
    else if(req.url.startsWith('/api/continent') && req.method === 'GET' )
    {
        filterData(req, res, destinations, 'continent');

    }
    else if(req.url.startsWith('/api/country') && req.method === 'GET')
    {
        filterData(req, res, destinations, 'country');
    }
    else
    {
        sendResponse(res, 404, {error: "Route not found", message: "The requested route does not exist"});
    }
});



server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



