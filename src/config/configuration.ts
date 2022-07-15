export default () => ({
  // app port
  env: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  port: parseInt(process.env.PORT, 10),
  version: process.env.VERSION,

  // mongo connection string
  mongodb: process.env.DB_MONGO_URI,
});
