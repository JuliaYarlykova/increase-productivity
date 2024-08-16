import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@repo/shared/ui';

import { CompanyRisk, getCompanyRisks } from '../../api/getCompanyRisks';
import { CompanyReport } from '../CompanyReport/CompanyReport';

export function DownloadCompanyReportButton() {
  const { data } = getCompanyRisks(null);

  const setData = (data: CompanyRisk[]) => {
    const uniq = new Set(data.map((e) => JSON.stringify(e)));

    const res = Array.from(uniq).map((e) => JSON.parse(e));
    return res;
  };

  if (!data) return null;

  return (
    <PDFDownloadLink
      document={<CompanyReport data={setData(data)} />}
      fileName="Отчёт"
    >
      {({ loading }) => (
        <Button
          fullWidth
          disabled={loading}
          size="s"
          addonRight={
            <span className="material-symbols-outlined">download</span>
          }
        >
          Сформировать отчёт
        </Button>
      )}
    </PDFDownloadLink>
  );
}
