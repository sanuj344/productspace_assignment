require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');
require('./models'); // Register all models & associations

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Sync models (use { force: true } only in dev to reset tables)
    await sequelize.sync({ alter: true });
    console.log('✅ All models synced to the database.');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`   Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

startServer();
