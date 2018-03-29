module.exports = function (sequelize, DataTypes) {
    var savedRecipes = sequelize.define("savedRecipes", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        recipe: {
            type: DataTypes.STRING,
        },
        patient_id: {
            type: DataTypes.INTEGER,
        }
    });

    return savedRecipes;
};