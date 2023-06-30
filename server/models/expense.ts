import { DataTypes, Model, ModelAttributes } from 'sequelize';
import sequelize from './modelDB';
import Sequelize from 'sequelize';
import { BeExpense, BeUser } from '../utils';

interface ExpenseModel extends Model, BeExpense {}

const Expense = sequelize.define<ExpenseModel>('Expense', {
  item: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  purchaserId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  eventId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
}, { timestamps: false });

export default Expense;
