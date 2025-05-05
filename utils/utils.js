export const sendResponse = (res, statusCode, payload) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-control-Allow-Origin', '*');
    res.setHeader('Access-control-Allow-methods', 'GET');
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
  const filterData = destinationArray.filter(data =>
    Object.entries(searchParams).every(([key, value]) => {
      const dataValue = data[key];

      // Handle string comparison (case-insensitive)
      if (typeof dataValue === 'string' && typeof value === 'string') {
        return dataValue.toLowerCase() === value.toLowerCase();
      }

      // Convert value to the same type if necessary for loose comparison
      if (typeof dataValue === 'boolean') {
        // 'true'/'false' string to boolean
        return dataValue === (value === 'true');
      }

      if (typeof dataValue === 'number') {
        // Try to parse string to number before comparing
        return dataValue === Number(value);
      }

      // Fallback to strict equality
      return dataValue === value;
    })
  );

  sendResponse(res, 200, filterData);
};