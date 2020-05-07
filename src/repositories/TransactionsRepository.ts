import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

interface ObjectTransactionAndBalance {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): ObjectTransactionAndBalance {
    const balance = this.getBalance();

    const transactionsAndBalance: ObjectTransactionAndBalance = {
      transactions: this.transactions,
      balance,
    };

    return transactionsAndBalance;
  }

  public findByTitleAndType(title: string, type: string): Transaction | null {
    const transactionSameTitleAndType = this.transactions.find(
      transaction => transaction.title === title && transaction.type === type,
    );

    return transactionSameTitleAndType || null;
  }

  public getBalance(): Balance {
    let sunIncome = 0;
    let sunOutcome = 0;

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        sunIncome += transaction.value;
      }
      if (transaction.type === 'outcome') {
        sunOutcome += transaction.value;
      }
    });

    const total = sunIncome - sunOutcome;

    const balance: Balance = {
      income: sunIncome,
      outcome: sunOutcome,
      total,
    };

    return balance;
  }

  public create(data: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(data);
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
