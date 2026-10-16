/**
 * Entidade de Domínio: SubscriptionPlan (Perfil de Produto da LPS)
 * Representa os planos derivados da Linha de Produto de Software (Starter, Growth, VIP Enterprise)
 * com seus conjuntos de features habilitadas e pontos de variação ativos.
 */
export class SubscriptionPlan {
  #name;
  #profile; // 'STARTER', 'GROWTH', 'VIP'
  #priceCents;
  #features; // Set de features ativas
  #allowedPaymentMethods; // ['PIX', 'BOLETO', 'CREDIT_CARD']
  #interestStrategyType; // 'STANDARD', 'VIP', 'GRACE'
  #whiteLabelEnabled;

  constructor({
    name,
    profile = "STARTER",
    priceCents = 0,
    features = [],
    allowedPaymentMethods = ["PIX"],
    interestStrategyType = "STANDARD",
    whiteLabelEnabled = false,
  }) {
    this.#name = name;
    this.#profile = profile.toUpperCase();
    this.#priceCents = priceCents;
    this.#features = new Set(features);
    this.#allowedPaymentMethods = allowedPaymentMethods;
    this.#interestStrategyType = interestStrategyType;
    this.#whiteLabelEnabled = Boolean(whiteLabelEnabled);
  }

  get name() { return this.#name; }
  get profile() { return this.#profile; }
  get priceCents() { return this.#priceCents; }
  get allowedPaymentMethods() { return [...this.#allowedPaymentMethods]; }
  get interestStrategyType() { return this.#interestStrategyType; }
  get whiteLabelEnabled() { return this.#whiteLabelEnabled; }

  hasFeature(featureCode) {
    return this.#features.has(featureCode);
  }

  canAcceptPaymentMethod(method) {
    return this.#allowedPaymentMethods.includes(method.toUpperCase());
  }

  isVipEnterprise() {
    return this.#profile === "VIP";
  }

  static createStarterPlan() {
    return new SubscriptionPlan({
      name: "Starter PME",
      profile: "STARTER",
      priceCents: 9900,
      features: ["COMPANIES", "BASIC_INVOICES", "EXPORT_CSV"],
      allowedPaymentMethods: ["PIX"],
      interestStrategyType: "STANDARD",
      whiteLabelEnabled: false,
    });
  }

  static createGrowthPlan() {
    return new SubscriptionPlan({
      name: "Growth Comercial",
      profile: "GROWTH",
      priceCents: 24900,
      features: ["COMPANIES", "BASIC_INVOICES", "EXPORT_CSV", "EXPORT_JSON", "KANBAN_TASKS", "FUTURES"],
      allowedPaymentMethods: ["PIX", "BOLETO"],
      interestStrategyType: "STANDARD",
      whiteLabelEnabled: false,
    });
  }

  static createVipEnterprisePlan() {
    return new SubscriptionPlan({
      name: "VIP Enterprise",
      profile: "VIP",
      priceCents: 79900,
      features: ["COMPANIES", "BASIC_INVOICES", "EXPORT_CSV", "EXPORT_JSON", "KANBAN_TASKS", "FUTURES", "SPLIT_PAYMENT", "WHITE_LABEL"],
      allowedPaymentMethods: ["PIX", "BOLETO", "CREDIT_CARD"],
      interestStrategyType: "VIP",
      whiteLabelEnabled: true,
    });
  }

  toJSON() {
    return {
      name: this.#name,
      profile: this.#profile,
      priceCents: this.#priceCents,
      features: Array.from(this.#features),
      allowedPaymentMethods: this.#allowedPaymentMethods,
      interestStrategyType: this.#interestStrategyType,
      whiteLabelEnabled: this.#whiteLabelEnabled,
      isVipEnterprise: this.isVipEnterprise(),
    };
  }
}
