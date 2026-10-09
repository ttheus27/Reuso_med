import {
  CsvInvoiceExport,
  JsonInvoiceExport,
} from "../patterns/template-method/DataExportTemplate";
import invoiceRepository from "../repositories/invoiceRepository";

/**
 * Camada de Serviço para Exportação de Dados e Relatórios
 */
class ExportService {
  async exportInvoices(filters, format = "CSV") {
    const invoices = await invoiceRepository.findAll(filters);

    let exporter;
    switch (format?.toUpperCase()) {
      case "JSON":
        exporter = new JsonInvoiceExport();
        break;
      case "CSV":
      default:
        exporter = new CsvInvoiceExport();
        break;
    }

    return await exporter.exportData(invoices);
  }
}

export default new ExportService();
