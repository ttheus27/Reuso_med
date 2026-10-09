/**
 * Padrão GoF: TEMPLATE METHOD (Exemplo 1)
 * Estrutura invariante para geração e exportação de dados tabulares (CSV, JSON, etc).
 */
export class DataExportTemplate {
  /**
   * Template Method principal
   * Orquestra o ciclo de vida da exportação.
   */
  async exportData(dataList) {
    const rawData = await this.fetchData(dataList);
    const header = this.formatHeader(rawData);
    const body = this.formatBody(rawData);
    const footer = this.formatFooter(rawData);
    return this.buildFile(header, body, footer);
  }

  // Hook padrão
  async fetchData(dataList) {
    return Array.isArray(dataList) ? dataList : [];
  }

  // Métodos abstratos (devem ser implementados pelas subclasses)
  formatHeader(data) {
    throw new Error("O método formatHeader() deve ser implementado pela subclasse.");
  }

  formatBody(data) {
    throw new Error("O método formatBody() deve ser implementado pela subclasse.");
  }

  // Hook opcional
  formatFooter(data) {
    return "";
  }

  buildFile(header, body, footer) {
    throw new Error("O método buildFile() deve ser implementado pela subclasse.");
  }
}

/**
 * Subclasse Concreta: Exportação em CSV
 */
export class CsvInvoiceExport extends DataExportTemplate {
  formatHeader() {
    return "ID,Empresa,Valor_Centavos,Vencimento,Status,Pago_Em\n";
  }

  formatBody(invoices) {
    return invoices
      .map((inv) => {
        const companyName = (inv.company?.name || inv.companyName || "N/A").replace(/,/g, " ");
        const paidAt = inv.paidAt ? new Date(inv.paidAt).toISOString() : "";
        const dueDate = inv.dueDate ? new Date(inv.dueDate).toISOString().split("T")[0] : "";
        return `${inv.id},"${companyName}",${inv.amountCents},${dueDate},${inv.status},${paidAt}`;
      })
      .join("\n");
  }

  buildFile(header, body, footer) {
    return {
      contentType: "text/csv; charset=utf-8",
      extension: "csv",
      content: header + body + (footer ? `\n${footer}` : ""),
    };
  }
}

/**
 * Subclasse Concreta: Exportação em JSON Estruturado
 */
export class JsonInvoiceExport extends DataExportTemplate {
  formatHeader() {
    return "";
  }

  formatBody(invoices) {
    return JSON.stringify(
      invoices.map((inv) => ({
        id: inv.id,
        companyName: inv.company?.name || inv.companyName || null,
        amountCents: inv.amountCents,
        amountFormatted: (inv.amountCents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
        dueDate: inv.dueDate,
        status: inv.status,
        paidAt: inv.paidAt,
      })),
      null,
      2
    );
  }

  buildFile(header, body) {
    return {
      contentType: "application/json; charset=utf-8",
      extension: "json",
      content: body,
    };
  }
}
