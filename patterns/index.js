// Centralizador dos Padrões de Projeto (GoF)

// 1. Singletons
export { default as prisma, prisma as dbClient } from "./singleton/DatabaseConnection";
export { default as appConfig } from "./singleton/AppConfigService";

// 2. Template Methods
export {
  DataExportTemplate,
  CsvInvoiceExport,
  JsonInvoiceExport,
} from "./template-method/DataExportTemplate";

export {
  TaskWorkflowTemplate,
  StartTaskWorkflow,
  PauseTaskWorkflow,
  CompleteTaskWorkflow,
  getWorkflowForTransition,
} from "./template-method/TaskWorkflowTemplate";

export {
  InvoiceImporterTemplate,
  SpedyInvoiceImporter,
} from "./template-method/InvoiceImporterTemplate";

// 3. Strategies
export {
  InterestStrategy,
  StandardInterestStrategy,
  VipInterestStrategy,
  GracePeriodInterestStrategy,
  InvoiceCalculatorContext,
} from "./strategy/interestStrategies";

export {
  PaymentStrategy,
  PixPaymentStrategy,
  BoletoPaymentStrategy,
  CreditCardPaymentStrategy,
  PaymentProcessingContext,
} from "./strategy/paymentStrategies";

export {
  TaskPriorityStrategy,
  DueDatePriorityStrategy,
  IdleTimePriorityStrategy,
  SeverityPriorityStrategy,
  TaskSorterContext,
} from "./strategy/taskPriorityStrategies";
