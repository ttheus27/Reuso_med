/**
 * Entidade / Value Object de Domínio: Address (Endereço Geográfico)
 * Centraliza validações de CEP, logradouro e formatação padronizada.
 */
export class Address {
  #street;
  #number;
  #neighborhood;
  #city;
  #state;
  #zipCode;

  constructor({
    street = null,
    number = null,
    neighborhood = null,
    city = null,
    state = null,
    zipCode = null,
  } = {}) {
    this.#street = street;
    this.#number = number;
    this.#neighborhood = neighborhood;
    this.#city = city;
    this.#state = state;
    this.#zipCode = zipCode ? zipCode.replace(/\D/g, "") : null;
  }

  get street() { return this.#street; }
  get number() { return this.#number; }
  get neighborhood() { return this.#neighborhood; }
  get city() { return this.#city; }
  get state() { return this.#state; }
  get zipCode() { return this.#zipCode; }

  formatCep() {
    if (!this.#zipCode || this.#zipCode.length !== 8) return this.#zipCode;
    return this.#zipCode.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  }

  formatFullAddress() {
    const parts = [
      this.#street ? `${this.#street}, ${this.#number || "S/N"}` : null,
      this.#neighborhood,
      this.#city && this.#state ? `${this.#city} - ${this.#state}` : this.#city,
      this.formatCep() ? `CEP: ${this.formatCep()}` : null,
    ].filter(Boolean);

    return parts.length > 0 ? parts.join(" • ") : "Endereço não informado";
  }

  toJSON() {
    return {
      street: this.#street,
      number: this.#number,
      neighborhood: this.#neighborhood,
      city: this.#city,
      state: this.#state,
      zipCode: this.formatCep(),
      formatted: this.formatFullAddress(),
    };
  }
}
