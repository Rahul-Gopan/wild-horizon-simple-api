export const sendResponse = (res, statusCode, payload) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(payload));
}

export const filterData = (req, res, destinationArray,  filterKey) => 
{
    const filter_value = req.url.split('/').pop();


    if(filter_value !== '')
    {
        const filteredCountry = destinationArray.filter( (countryName) => {
            return countryName[filterKey].toLowerCase() === filter_value.toLowerCase();
        });

        sendResponse(res, 200, filteredCountry);
    }
    else
    {
        sendResponse(res, 404, {error: "Route not found", message: "The requested route does not exist"});
    }
}

export const filterQueryParam = (res, destinationArray, searchParams) => {

    const filterData = destinationArray.filter( data => 
        Object.entries(searchParams).every(([key, value]) => 
        data[key] && data[key].toLowerCase() === value.toLowerCase()
        )
    )

    sendResponse(res, 200, filterData);

}