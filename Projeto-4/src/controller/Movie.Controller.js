const Movie = require("../models/Movie");

module.exports = {
  async list(req, res) {
    try {
      const movies = await Movies.findAll();
      return res.json(movies);
    } catch (err) {
      return console.error("Erro na listagem: ", err);
    }
  },

  async show(req, res) {
    try {
      const movie = await Movie.findAll({ where: { id: req.params.id } });
      return res.json(movie);
    } catch (err) {
      return console.error("Weeo na busca: ", err);
    }
  },

  async create(req, res) {
    const { title, poster, overview } = req.body;

    try {
      const movie = await Movie.create({ title, poster, overview });
      return res.json(movie);
    } catch (error) {
      return console.error("Erro na criação: ", err);
    }
  },

  async update(req, res) {
    const Sequelize = require("sequelize");
    const Op = Sequelize.Op;
    const { title, poster, overview } = req.body;
    const id = req.params.id;

    try {
      await Movies.update(
        {
          title,
          poster,
          overview,
        },
        { where: { id: { [Op.eq]: id } } }
      );
      return res.json({
        msg: `Filme ${title} atualizado com successo!`,
      });
    } catch (error) {
      return res.json({
        msg: `Filme ${title} não foi atualizado com successo :(`,
      });
    }
  },

  async delete(req, res) {
    try {
      await Movie.destroy({ where: { id: req.params.id } });
      return res.json({
        msg: `Exclusão do item de ID ${req.params.id} feita com successo!`,
      });
    } catch (err) {
      return console.error("Erro na exclusão: ", err);
    }
  },
};
