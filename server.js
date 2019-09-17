const express = require('express');

const app = express();
const port = 3000;

// Set public folder as root
app.use(express.static('public'));

// Provide access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`./src`));

app.listen(process.env.PORT || 3000, function () {
  // eslint-disable-next-line no-console
  console.info('listening on %d', port);
});
