/**
 * Padrão GoF: TEMPLATE METHOD (Exemplo 3)
 * Processamento e importação em lote de cobranças/faturas a partir de payloads externos (JSON, ERPs, Spedy).
 */
export class InvoiceImporterTemplate {
  /**
   * Template Method
   * Define as etapas obrigatórias de processamento em lote.
   */
  async processImport(rawPayload, repository) {
    const records = this.parseRecords(rawPayload);
    const validatedRecords = this.validateRecords(records);
    const enrichedRecords = this.enrichRecords(validatedRecords);
    return await this.saveToDatabase(enrichedRecords, repository);
  }

  // Métodos primitivos
  parseRecords(rawPayload) {
    throw new Error("O método parseRecords() deve ser implementado pela subclasse.");
  }

  validateRecords(records) {
    if (!Array.isArray(records) || records.length === 0) {
      throw new Error("Nenhum registro para importação encontrado.");
    }
    for (const record of records) {
      if (!record.companyId || !record.amountCents || !record.dueDate) {
        throw new Error(`Registro inválido na importação: campos companyId, amountCents e dueDate são obrigatórios.`);
      }
    }
    return records;
  }

  // Hook padrão de enriquecimento
  enrichRecords(records) {
    return records.map((rec) => ({
      ...rec,
      createdAt: new Date(),
      status: rec.status || "PENDING",
      isFuture: rec.isFuture !== undefined ? rec.isFuture : new Date(rec.dueDate) > new Date(),
    }));
  }

  async saveToDatabase(records, repository) {
    if (!repository || typeof repository.createBatch !== "function") {
      throw new Error("Repositório não possui suporte ao método createBatch().");
    }
    return await repository.createBatch(records);
  }
}

/**
 * Subclasse Concreta: Importador via Integração ERP / Spedy
 */
export class SpedyInvoiceImporter extends InvoiceImporterTemplate {
  parseRecords(rawPayload) {
    const parsed = typeof rawPayload === "string" ? JSON.parse(rawPayload) : rawPayload;
    return parsed.invoices || parsed.cobrancas || parsed;
  }

  enrichRecords(records) {
    const enriched = super.enrichRecords(records);
    return enriched.map((rec) => ({
      ...rec,
      source: "SPEDY_INTEGRATION",
    }));
  }
}
