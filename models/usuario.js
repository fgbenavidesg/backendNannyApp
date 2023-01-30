'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.hasOne(models.Padre,{foreignKey:"usuario_id",as:"Usuario"});
      Usuario.hasOne(models.Ninera,{foreignKey:"usuario_id",as:"UsuarioN"});
    }
  }
  Usuario.init({
    dni: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: DataTypes.STRING,
    foto: DataTypes.STRING,
    activo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};