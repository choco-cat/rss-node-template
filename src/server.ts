const { PORT } = require('./common/config.ts');
const app = require("./app.ts");

const TryDBConnect = require('./helpers/db.ts');

TryDBConnect(() =>
app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
));
