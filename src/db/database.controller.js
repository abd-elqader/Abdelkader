import { Sequelize } from "sequelize";


export const sequelize = new Sequelize('assignment8', 'root', '',{
    dialect: 'mysql',
    host: 'localhost',
})

const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}