"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Table extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // this.hasOne(models.User, { foreignKey: "userId", as: "users" });
            //this.belongsToMany(models.Chat, {through: 'ChatUser', foreignKey:'userId'})
            this.hasMany(models.Order, { foreignKey: "tableId", as: "orders" });
        }
    }
    Table.init(
        {
            name: DataTypes.STRING,
            userId: DataTypes.INTEGER,
            occupied: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Table",
        }
    );
    return Table;
};
