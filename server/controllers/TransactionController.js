const { number } = require("joi");
const { transaction, debt } = require("../models");
class TransactionController {
  static async get(req, res) {
    try {
      const newTransactions = await transaction.findAll();
      res.json({ data: newTransactions });
    } catch (error) {
      res.json({ error: error.message });
    }
  }
  static async create(req, res) {
    try {
      const newTransactions = await transaction.create(req.body);
      if (req.body.status === 1) {
        const newDebt = await debt.findByPk(newTransactions.debt_id);
        const result = newDebt.amount - newTransactions.amount;
        if (result <= 0) {
          await newDebt.update({
            amount: 0,
            status: 0,
          });
        } else {
          await newDebt.update({
            amount: result,
          });
        }
      }
      if (req.body.status === 2) {
        const newDebt = await debt.create({
          description: req.body.description,
          amount: req.body.amount,
          status: 1,
        });
        await newTransactions.update({ debt_id: newDebt.id });
        await newTransactions.save();
      }
      res.json({ data: newTransactions });
    } catch (error) {
      res.json({ error: error.message });
    }
  }
  static async update(req, res) {}
  static async delete(req, res) {
    try {
      // res.json({data: typeof(req.params.id)})
      // console.log(req.params.id);
      const remove = await transaction.destroy({
        where: { id: req.params.id },
      });
      const newTransactions = await transaction.findAll();
      res.json({ data: newTransactions });
    } catch (error) {
      res.json({ error: error.message });
    }
  }
}

module.exports = TransactionController;
