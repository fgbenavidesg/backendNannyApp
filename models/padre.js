'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Padre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Padre.belongsTo(models.Usuario,{foreignKey:"usuario_id",as:"Usuario"})
    }
  }
  Padre.init({
    celular: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATE,
    disposicionPago: DataTypes.FLOAT,
    idiomaNativo: DataTypes.STRING,
    direccion: DataTypes.STRING,
    tareas: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Padre',
  });
  return Padre;
};