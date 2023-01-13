const Joi = require("joi");
const { verifyToken } = require("../helpers/jwt");
const { debt, transaction, User } = require("../models");
class DebtController {
  static async get(req, res) {
    try {
        const newDebt = await debt.findAll({
          where: {
            user_id: req.headers.user_id,
          },
        });
        res.status(200).json({ data: newDebt });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async create(req, res) {
    try {
      const schema = Joi.object({
        description: Joi.string().required(),
        amount: Joi.number().required(),
        status: Joi.number().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(401).json({ message: error.details[0].message });
      }
        const newDebt = await debt.create({
          description: req.body.description,
          user_id: req.headers.user_id,
          amount: req.body.amount,
          status: 1
        });
        const newTransaction = await transaction.create({
          description: newDebt.description,
          debt_id: newDebt.id,
          user_id: req.headers.user_id,
          amount: newDebt.amount,
          status: 2,
        });
        res.json({
          message: "Success!",
          data: newDebt
        });
    } catch (error) {
      res.json({ error: error });
    }
  }
  static async update(req, res) {}
  static async delete(req, res) {
    try {
        const remove = await debt.destroy({
          where: { id: req.params.id },
        });
        const newDebt = await debt.findAll();
        res.json({ data: newDebt });
    } catch (error) {
      res.json({ error: error.message });
    }
  }
}

module.exports = DebtController;
