/**
 * Padrão GoF: SINGLETON
 * Gerenciador centralizado e imutável de configurações e regras fiscais/operacionais do sistema.
 */
class AppConfigService {
  constructor() {
    if (AppConfigService.instance) {
      return AppConfigService.instance;
    }

    this.config = {
      appName: "Dashboard de Gestão e Cobranças",
      defaultCurrency: "BRL",
      invoiceGracePeriodDays: 5,
      defaultFinePercent: 0.02, // 2% multa
      defaultDailyInterestPercent: 0.00033, // ~1% ao mês proporcional
      environment: process.env.NODE_ENV || "development",
      pagination: {
        defaultLimit: 20,
        maxLimit: 100,
      },
    };

    AppConfigService.instance = this;
    Object.freeze(this);
  }

  get(key) {
    return this.config[key];
  }

  getAll() {
    return { ...this.config };
  }
}

const instance = new AppConfigService();
export default instance;
