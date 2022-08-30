import { Sequelize } from 'sequelize';
import config from 'config';

class sequelizeRepository {
  public sequelize: Sequelize;

  constructor() {
    this.sequelize = this._initDB();
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync();
      console.log(`Connection to DB has been established successfully.`);
    } catch (err) {
      console.error(err);
    }
  }

  _initDB() {
    return new Sequelize(config.get('DB_NAME'), config.get('USER_NAME'), config.get('PASSWORD'), {
      host: config.get('HOST'),
      dialect: config.get('TYPE_DB'),
    });
  }
}

export default new sequelizeRepository();
