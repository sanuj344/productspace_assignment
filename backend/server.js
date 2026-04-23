require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');
require('./models');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    await sequelize.sync(); // 🔥 FIXED
    console.log('✅ All models synced to the database.');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });

  } catch (error) {
    console.error('❌ Unable to start server:');
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

startServer();