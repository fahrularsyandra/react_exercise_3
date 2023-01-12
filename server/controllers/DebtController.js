const { number } = require('joi');
const {debt, transaction} = require('../models');
class DebtController {
    static async get (req,res){
        try {
            const newDebt = await debt.findAll({order: [
                ['createdAt', 'ASC']
            ],})
            res.json({ data: newDebt })
        } catch (error) {
            res.json({ error: error.message })
        }
    }
    static async create (req,res){
        try {
            const newDebt = await debt.create(req.body)
            const newTransaction = await transaction.create({
                description: req.body.description,
                debt_id: newDebt.id,
                amount: newDebt.amount,
                status: 2
            })
            res.json({
                message: "Success!"
            })
        } catch (error) {
            res.json({error: error})
        }
    }
    static async update (req,res){
        
    }
    static async delete (req,res){
        
        try {
            // res.json({data: typeof(req.params.id)})
            // console.log(req.params.id);
            const remove = await debt.destroy({
                where: { id: req.params.id },
            });
            const newDebt = await debt.findAll()
            res.json({ data: newDebt })
        } catch (error) {
            res.json({ error: error.message })
        }
    }
}

module.exports = DebtController