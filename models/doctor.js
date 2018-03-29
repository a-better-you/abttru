

module.exports = function (sequelize, DataTypes) {
    var nutriModel = sequelize.define("doctor", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        patient_id: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    });

    return doctor;
};