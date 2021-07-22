const express = require('express');

const app = express()

app.listen(8888, () => {
  console.log('PX | now listening for requests on port 8888')
})
