import sequelize from './config';

export const syncDatabase = async () => {
    try {
        console.log("Starting database sync...");
        await sequelize.sync({ force: false });
        console.log("Database synced!");
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};