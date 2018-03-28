

module.exports = function (sequelize, DataTypes) {
    var nutriModel = sequelize.define("nutriModel", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        patient_name: {
            type: DataTypes.STRING,
        },

        password: {
            type: DataTypes.STRING,
        },

        fav_recipe: {
            type: DataTypes.STRING,
        },

        diet_option: {
            type: DataTypes.STRING,
        },
        risk_factor: {
            type: DataTypes.STRING,
        },
        diet_restriction: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    });

    return nutriModel;
};