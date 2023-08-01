function ajaxHandler(url, method, requestBody, expectedKeys, callback, debugOn) {
  if (debugOn) {
    // Simulate the response in debug mode
    const responseData = [];
    if (expectedKeys !== null) {
      for (let i = 0; i < 5; i++) {
        const item = generateRandomItem(expectedKeys);
        responseData.push(item);
      }
    }
    callback(200, responseData);
  } else {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        const responseCode = request.status;
        const responseData = [];
        if (responseCode === 200) {
          const responseDataString = request.responseText;
          if (expectedKeys !== null) {
            try {
              const jsonArray = JSON.parse(responseDataString);
              jsonArray.forEach((item) => {
                if (isValidItem(item, expectedKeys)) {
                  responseData.push(item);
                }
              });
            } catch (e) {
              console.error(e);
            }
          } else {
            try {
              const jsonObject = JSON.parse(responseDataString);
              responseData.push(jsonObject);
            } catch (e) {
              console.error(e);
            }
          }
        }
        callback(responseCode, responseData);
      }
    };

    request.open(method, url, true);
    if (method === 'POST' || method === 'PUT') {
      request.setRequestHeader('Content-Type', 'application/json');
    }
    request.send(requestBody);
  }
}

function generateRandomItem(expectedKeys) {
  const item = {};
  Object.keys(expectedKeys).forEach((key) => {
    item[key] = generateRandomValue(expectedKeys[key]);
  });
  return item;
}

function generateRandomValue(type) {
  switch (type) {
    case 'string':
      return 'test';
    case 'int':
      return Math.floor(Math.random() * 100);
    case 'boolean':
      return Math.random() < 0.5;
    default:
      return null;
  }
}

function isValidItem(item, expectedKeys) {
  for (const key in expectedKeys) {
    if (!item.hasOwnProperty(key) || item[key] !== expectedKeys[key]) {
      return false;
    }
  }
  return true;
}

