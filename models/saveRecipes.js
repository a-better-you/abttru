module.exports = function (sequelize, DataTypes) {
    var savedRecipes = sequelize.define("savedRecipes", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        patient_id: {
            type: DataTypes.INTEGER,
        },
        recipe: {
            type: DataTypes.STRING,
        },
        favorite: {
            type: DataTypes.BOOLEAN, defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    });

    return savedRecipes;
};