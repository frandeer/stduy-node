const axios = require('axios');

axios.get('http://example.com').then((res) => {
  console.log(res.data);
});