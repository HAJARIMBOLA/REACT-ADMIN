import { downloadCSV } from "react-admin";
import jsonExport from "jsonexport/dist";

export const exporter = (records: any[], _fetchRelatedRecords: any, _dataProvider: any, resource: string) => {
  // Remove avatar binary data before export
  const cleanRecords = records.map(({ avatar, ...rest }) => rest);
  jsonExport(cleanRecords, (_err: any, csv: string) => {
    downloadCSV(csv, resource ?? "export");
  });
};