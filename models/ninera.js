'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ninera extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ninera.belongsTo(models.Usuario,{foreignKey:"usuario_id",as:"Usuario"})
    }
  }
  Ninera.init({
    celular: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATE,
    disposicionCobro: DataTypes.FLOAT,
    idiomaNativo: DataTypes.STRING,
    idiomaSecundario: DataTypes.STRING,
    profesion: DataTypes.STRING,
    direccion: DataTypes.STRING,
    habilidades: DataTypes.STRING,
    experiencia: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ninera',
  });
  return Ninera;
};