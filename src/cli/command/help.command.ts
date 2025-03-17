import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  getName(): string {
    return '--help';
  }

  execute(): void {
    console.log(chalk.bgBlue(`Программа для подготовки данных для REST API сервера.

Пример: cli.js --<command> [--arguments]

Команды:

 --version:                   # выводит номер версии
 --help:                      # печатает этот текст
 --import <path>:             # импортирует данные из TSV
 --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных`));
  }
}
