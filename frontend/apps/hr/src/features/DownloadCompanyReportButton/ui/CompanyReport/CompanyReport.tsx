import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';
import { memo, useEffect, useState } from 'react';

import { CompanyRisk } from '../../api/getCompanyRisks';
import { canvasToSrc } from '../../lib/canvasToSrc';
import { formatDate } from '../../lib/formatDate';

import { StoreProvider } from '@/app/providers/StoreProvider';
import {
  CompanyMetricsChart,
  CompanyRiskChart,
  CompanyValuesChart,
} from '@/entities/Diagrams';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
});

const styles = StyleSheet.create({
  document: {
    fontFamily: 'Roboto',
  },
  title: {
    fontSize: 44,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  mainPage: {
    height: '100%',
    fontFamily: 'Roboto',
    padding: 20,
    display: 'flex',
  },
  mainView: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPage: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'space-between',
  },
  chartView: {},
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderBottom: '1px solid #CACACA',

    padding: 3,
  },
  riskName: {
    width: 300,
  },
  valueName: {
    width: 120,
    color: '#6C6F74',
  },
  tablePage: {
    padding: 80,
    gap: 8,
    display: 'flex',
    flexDirection: 'column',
    fontSize: 10,
    fontWeight: 300,
  },
  numberName: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  headTable: {
    textAlign: 'right',
    borderBottom: '1px solid #CACACA',
    color: '#6C6F74',
  },
  riskValue: {
    width: 100,
    textAlign: 'right',
  },
});

interface CompanyReportProps {
  data: CompanyRisk[];
}

export const CompanyReport = memo((props: CompanyReportProps) => {
  const { data } = props;
  const [companyMetricsSrc, setCompanyMetricsSrc] = useState('');
  const [companyRiskSrc, setCompanyRiskSrc] = useState('');
  const [companyValuesSrc, setCompanyValuesSrc] = useState('');

  useEffect(() => {
    const generateData = async () => {
      const companyMetricsSrc = await canvasToSrc(
        <StoreProvider>
          <CompanyMetricsChart />
        </StoreProvider>,
      );
      const companyRiskSrc = await canvasToSrc(
        <StoreProvider>
          <CompanyRiskChart />
        </StoreProvider>,
      );
      const companyValuesSrc = await canvasToSrc(
        <StoreProvider>
          <CompanyValuesChart />
        </StoreProvider>,
      );
      setCompanyMetricsSrc(companyMetricsSrc);
      setCompanyRiskSrc(companyRiskSrc);
      setCompanyValuesSrc(companyValuesSrc);
    };
    generateData();
  }, []);

  return (
    <Document language="ru" style={styles.document}>
      <Page style={styles.mainPage}>
        <View style={styles.mainView}>
          <Text style={styles.subtitle}>Отчёт по компании</Text>
          <Text style={styles.subtitle}>{formatDate(new Date())}</Text>
        </View>
      </Page>
      <Page style={styles.chartPage}>
        <View style={styles.chartView}>
          <Image src={companyMetricsSrc} />
        </View>
        {/* <View style={styles.chartView}>
          <Image src={companyQualitiesSrc} />
        </View> */}
      </Page>
      <Page style={styles.chartPage}>
        <View style={styles.chartView}>
          <Image src={companyRiskSrc} />
        </View>
        <View style={styles.chartView}>
          <Image src={companyValuesSrc} />
        </View>
      </Page>
      <Page style={styles.tablePage}>
        <Text style={styles.headTable}>сумма, руб.</Text>
        {data &&
          data.map((risk, i) => (
            <View style={styles.table}>
              <Text style={styles.riskName}>{risk.risk_name}</Text>
              <Text style={styles.valueName}>
                {risk.quality_name || 'Ценность/Метрика'}
              </Text>
              <Text style={styles.riskValue}>{risk.risk_value}</Text>
            </View>
          ))}
      </Page>
    </Document>
  );
});
