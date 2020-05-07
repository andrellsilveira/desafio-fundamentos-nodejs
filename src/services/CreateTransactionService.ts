import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: RequestDTO): Transaction {
    const transactionSameTitleAndType = this.transactionsRepository.findByTitleAndType(
      data.title,
      data.type,
    );

    if (transactionSameTitleAndType) {
      throw Error('Já existe uma transação com o título e tipo informados.');
    }

    const transaction = this.transactionsRepository.create({
      title: data.title,
      type: data.type,
      value: data.value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
