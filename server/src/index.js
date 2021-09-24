const path = require('path');

const app = require('./app');
const logger = require('./logger');

const port = process.env.PORT;

app.listen(port, () =>
  logger.info(
    `[${path.relative(
      process.cwd(),
      __filename
    )}] Server is up on port [${port}].`
  )
);
