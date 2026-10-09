import exportService from "../../../services/exportService";

/**
 * Endpoint de API: Exportação de Faturas
 * Utiliza o padrão TEMPLATE METHOD (DataExportTemplate, CsvInvoiceExport, JsonInvoiceExport)
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Método ${req.method} não permitido` });
  }

  try {
    const { format = "CSV", status, companyId } = req.query;
    const exportResult = await exportService.exportInvoices({ status, companyId }, format);

    res.setHeader("Content-Type", exportResult.contentType);
    res.setHeader("Content-Disposition", `attachment; filename=invoices_${Date.now()}.${exportResult.extension}`);
    return res.status(200).send(exportResult.content);
  } catch (error) {
    console.error("Erro na exportação de faturas:", error);
    return res.status(500).json({ error: error.message || "Erro interno na exportação" });
  }
}
