'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Nineras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      celular: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      fechaNacimiento: {
        type: Sequelize.DATE
      },
      fotoDni: {
        type: Sequelize.STRING
      },
      disposicionCobro: {
        type: Sequelize.FLOAT
      },
      idiomaNativo: {
        type: Sequelize.STRING
      },
      idiomaSecundario: {
        type: Sequelize.STRING
      },
      profesion: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      habilidades: {
        type: Sequelize.STRING
      },
      experiencia: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Nineras');
  }
};