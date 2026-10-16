/**
 * Padrão GoF: STRATEGY (Exemplo 1)
 * Estratégias intercambiáveis para cálculo de juros e multas por atraso de pagamento.
 */

import appConfig from "../singleton/AppConfigService";

// Interface Conceitual de Estratégia de Juros
export class InterestStrategy {
  calculate(amountCents, daysLate) {
    throw new Error("calculate() deve ser implementado.");
  }
}

/**
 * Estratégia 1: Padrão Comercial
 * Utiliza o Singleton AppConfigService para obter taxa de multa (ex: 2%) e juros diários (0.033%)
 */
export class StandardInterestStrategy extends InterestStrategy {
  calculate(amountCents, daysLate) {
    if (daysLate <= 0) return amountCents;
    const fineRate = appConfig.get("defaultFinePercent") ?? 0.02;
    const dailyRate = appConfig.get("defaultDailyInterestPercent") ?? 0.00033;
    const fine = amountCents * fineRate;
    const dailyInterest = amountCents * (dailyRate * daysLate);
    return Math.round(amountCents + fine + dailyInterest);
  }
}

/**
 * Estratégia 2: Cliente VIP / Parceiro
 * Isenção de multa contratual e juros reduzidos (0.015% ao dia)
 */
export class VipInterestStrategy extends InterestStrategy {
  calculate(amountCents, daysLate) {
    if (daysLate <= 0) return amountCents;
    const dailyInterest = amountCents * (0.00015 * daysLate);
    return Math.round(amountCents + dailyInterest);
  }
}

/**
 * Estratégia 3: Isenção / Período de Tolerância
 * Valor nominal sem acréscimos
 */
export class GracePeriodInterestStrategy extends InterestStrategy {
  calculate(amountCents) {
    return amountCents;
  }
}

/**
 * Contexto: Calculadora de Faturas
 */
export class InvoiceCalculatorContext {
  constructor(strategy = new StandardInterestStrategy()) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  getFinalAmount(amountCents, daysLate) {
    return this.strategy.calculate(amountCents, daysLate);
  }
}
