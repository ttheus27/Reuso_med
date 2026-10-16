/**
 * Entidade de Domínio: User (Usuário / Operador do Sistema)
 * Encapsula dados de autenticação, perfil de acesso (RBAC) e regras de segurança.
 */
export class User {
  #id;
  #name;
  #email;
  #role; // 'ADMIN', 'SUBSCRIBER', 'OPERATOR'
  #cpf;
  #phoneNumber;
  #createdAt;

  constructor({
    id = null,
    name,
    email,
    role = "SUBSCRIBER",
    cpf = null,
    phoneNumber = null,
    createdAt = new Date(),
  }) {
    if (!email || !email.includes("@")) {
      throw new Error("E-mail válido é obrigatório para instanciar User.");
    }

    this.#id = id;
    this.#name = name ? name.trim() : null;
    this.#email = email.trim().toLowerCase();
    this.#role = role.toUpperCase();
    this.#cpf = cpf ? cpf.replace(/\D/g, "") : null;
    this.#phoneNumber = phoneNumber;
    this.#createdAt = createdAt;
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get email() { return this.#email; }
  get role() { return this.#role; }
  get cpf() { return this.#cpf; }
  get phoneNumber() { return this.#phoneNumber; }
  get createdAt() { return this.#createdAt; }

  isAdmin() {
    return this.#role === "ADMIN";
  }

  hasPermission(action) {
    if (this.isAdmin()) return true;
    const permissionsMap = {
      SUBSCRIBER: ["VIEW_DASHBOARD", "VIEW_COMPANIES", "CREATE_TASK"],
      OPERATOR: ["VIEW_DASHBOARD", "VIEW_COMPANIES", "EDIT_TASK", "VIEW_INVOICE"],
    };
    return (permissionsMap[this.#role] || []).includes(action);
  }

  maskCpf() {
    if (!this.#cpf || this.#cpf.length !== 11) return "—";
    return this.#cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.***.***-$4");
  }

  getInitials() {
    if (!this.#name) return "U";
    return this.#name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0].toUpperCase())
      .join("");
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      role: this.#role,
      cpfMasked: this.maskCpf(),
      phoneNumber: this.#phoneNumber,
      initials: this.getInitials(),
      isAdmin: this.isAdmin(),
      createdAt: this.#createdAt,
    };
  }
}
