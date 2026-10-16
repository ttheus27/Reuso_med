/**
 * Entidade de Domínio: Company (Empresa / Cliente)
 * Representa os clientes corporativos do sistema com validações fiscais e de contato.
 */
export class Company {
  #id;
  #name;
  #cnpj;
  #email;
  #phone;
  #whatsapp;
  #address;
  #city;
  #state;
  #zipCode;
  #notes;
  #ownerId;
  #createdAt;

  constructor({
    id = null,
    name,
    cnpj = null,
    email = null,
    phone = null,
    whatsapp = null,
    address = null,
    city = null,
    state = null,
    zipCode = null,
    notes = null,
    ownerId,
    createdAt = new Date(),
  }) {
    if (!name || name.trim().length === 0) {
      throw new Error("Nome da empresa é obrigatório.");
    }

    this.#id = id;
    this.#name = name.trim();
    this.#cnpj = cnpj ? cnpj.replace(/\D/g, "") : null;
    this.#email = email;
    this.#phone = phone;
    this.#whatsapp = whatsapp;
    this.#address = address;
    this.#city = city;
    this.#state = state;
    this.#zipCode = zipCode;
    this.#notes = notes;
    this.#ownerId = ownerId;
    this.#createdAt = createdAt;
  }

  // Getters
  get id() { return this.#id; }
  get name() { return this.#name; }
  get cnpj() { return this.#cnpj; }
  get email() { return this.#email; }
  get phone() { return this.#phone; }
  get whatsapp() { return this.#whatsapp; }
  get address() { return this.#address; }
  get city() { return this.#city; }
  get state() { return this.#state; }
  get zipCode() { return this.#zipCode; }
  get notes() { return this.#notes; }
  get ownerId() { return this.#ownerId; }
  get createdAt() { return this.#createdAt; }

  // Métodos de Negócio
  validateCnpj() {
    if (!this.#cnpj) return false;
    return this.#cnpj.length === 14;
  }

  formatCnpj() {
    if (!this.#cnpj || this.#cnpj.length !== 14) return this.#cnpj;
    return this.#cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  }

  getCleanWhatsApp() {
    if (!this.#whatsapp && !this.#phone) return null;
    const digits = String(this.#whatsapp || this.#phone).replace(/\D/g, "");
    return digits.startsWith("55") ? digits : `55${digits}`;
  }

  isVipClient() {
    const text = (this.#notes || "").toLowerCase();
    return text.includes("vip") || text.includes("parceiro") || text.includes("premium");
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      cnpj: this.formatCnpj(),
      email: this.#email,
      phone: this.#phone,
      whatsapp: this.#whatsapp,
      address: this.#address,
      city: this.#city,
      state: this.#state,
      zipCode: this.#zipCode,
      notes: this.#notes,
      ownerId: this.#ownerId,
      isVip: this.isVipClient(),
      createdAt: this.#createdAt,
    };
  }
}
