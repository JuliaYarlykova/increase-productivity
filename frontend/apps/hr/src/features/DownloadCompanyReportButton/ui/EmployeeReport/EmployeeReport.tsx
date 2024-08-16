import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { memo } from 'react';

import { EmployeeRisk } from '../../api/getEmployeeRisks';
import { formatDate } from '../../lib/formatDate';

import { Data } from '@/entities/Diagrams';
import { Employee } from '@/entities/Employee';

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
  tableValues: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #CACACA',
  },
  riskName: {
    width: 300,
  },

  valueName: {
    width: 120,
    color: '#6C6F74',
  },
  valueNameMetrics: {
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
  input: {
    borderRadius: 4,
    border: ' 1px solid #CACACA',
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 8,
    paddingVertical: 11,
    fontSize: 10,
    fontWeight: 300,
    width: '30%',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },

  personalPage: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 20,
  },
  inputText: {
    fontSize: 10,
    fontWeight: 300,
    textAlign: 'left',
    width: '30%',
    color: '#6C6F74',
  },
  line: {
    width: '100%',
    height: 24,
    borderBottom: ' 2px solid #75777E',
  },
  note: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});

interface EmployeeReportProps {
  employee: Employee;
  data: EmployeeRisk[];
  values: Data;
  metrics: Data;
}

export const EmployeeReport = memo((props: EmployeeReportProps) => {
  const { employee, data, values, metrics } = props;

  return (
    <Document language="ru" style={styles.document}>
      <Page style={styles.mainPage}>
        <View style={styles.mainView}>
          <Text style={styles.subtitle}>Отчёт по сотруднику</Text>
          <Text style={[styles.title, { marginTop: 24 }]}>
            {employee.first_name}
          </Text>
          <Text style={[styles.title, { marginBottom: 24 }]}>
            {employee.last_name}
          </Text>
          <Text style={styles.subtitle}>{formatDate(new Date())}</Text>
        </View>
      </Page>
      <Page style={styles.personalPage}>
        <View>
          <Text>Личные данные сотрудника</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.input}>{employee.first_name}</Text>
          <Text style={styles.input}>{employee.middle_name}</Text>
          <Text style={styles.input}>{employee.last_name}</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.input}>{employee.birth_date}</Text>
          <Text style={styles.input}>
            Полных лет:
            {2024 - Number(employee.birth_date.slice(0, 4))}
          </Text>
          <Text style={styles.input}>{employee.position}</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.inputText}>Дата трудоустройства</Text>
          <Text style={styles.inputText}>Лет стажа</Text>
          <Text style={styles.inputText}>Зарплата </Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.input}>{employee.date_of_hiring}</Text>
          <Text style={styles.input}>{employee.work_experience}</Text>
          <Text style={styles.input}>
            {Math.round(Number(employee.salary))} тыс. руб.
          </Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.inputText}>Рейтинг ценностей</Text>
          <Text style={styles.inputText}>Баланс</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.input}>{employee.rating}</Text>

          <Text style={styles.input}>{employee.balance}</Text>
        </View>

        <View style={styles.note}>
          <Text>Заметки по сотруднику</Text>
          <Text style={styles.line} />
          <Text style={styles.line} />
          <Text style={styles.line} />
          <Text style={styles.line} />
          <Text style={styles.line} />
          <Text style={styles.line} />
          <Text style={styles.line} />
          <Text style={styles.line} />
          <Text style={styles.line} />
          <Text style={styles.line} />
          <Text style={styles.line} />
          <Text style={styles.line} />
          <Text style={styles.line} />
          <Text style={styles.line} />
        </View>
      </Page>
      <Page style={styles.tablePage}>
        <Text>Риски</Text>
        <Text style={styles.headTable}>тыс. руб.</Text>
        <View style={styles.table}>
          <Text style={styles.riskName}>Риск саботажа работы</Text>
          <Text style={styles.valueName}>Оценка вовлеченности персонала</Text>
          <Text style={styles.riskValue}>13</Text>
        </View>
        <View style={styles.table}>
          <Text style={styles.riskName}>Риск увольнения</Text>
          <Text style={styles.valueName}>Оценка лояльности сотрудников</Text>
          <Text style={styles.riskValue}>13</Text>
        </View>
        <View style={styles.table}>
          <Text style={styles.riskName}>
            Риск выгорания сотрудника с последующим увольнением
          </Text>
          <Text style={styles.valueName}>
            Индекс удовлетворённости сотрудников
          </Text>
          <Text style={styles.riskValue}>33</Text>
        </View>
        {data &&
          data.map((risk, i) => {
            if (risk.quality_name)
              return (
                <View style={styles.table}>
                  <Text style={styles.riskName}>{risk.risk_name}</Text>
                  <Text style={styles.valueName}>{risk.quality_name}</Text>
                  <Text style={styles.riskValue}>{risk.risk_value}</Text>
                </View>
              );
            return null;
          })}
      </Page>
      <Page style={styles.tablePage}>
        <Text>Динамика ценностей</Text>
        <View style={styles.table}>
          <Text style={[styles.riskName, { color: '#6C6F74' }]}>Дата</Text>
          <Text style={styles.valueName}>Ценность</Text>
          <Text style={[styles.riskName, { color: '#6C6F74' }]}>Значение</Text>
        </View>
        <View>
          {values.datasets.map((data) => (
            <View style={styles.table}>
              <Text style={styles.riskName}>{data.label}</Text>
              <View>
                {values.labels.map((val) => (
                  <Text style={styles.valueName}>{val}</Text>
                ))}
              </View>
              <View>
                {data.data.map((val) => (
                  <Text style={styles.riskName}>{val}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Page>
      <Page style={styles.tablePage}>
        <Text>Динамика метрик</Text>
        <View style={styles.table}>
          <Text style={[styles.riskName, { color: '#6C6F74' }]}>Метрика</Text>
          <Text style={styles.valueName}>Дата</Text>
          <Text style={[styles.riskName, { color: '#6C6F74' }]}>Значение</Text>
        </View>
        <View>
          {metrics.datasets.map((data) => (
            <View style={styles.table}>
              <Text style={styles.riskName}>{data.label}</Text>
              <View>
                {metrics.labels.map((val) => (
                  <Text style={styles.valueName}>{val}</Text>
                ))}
              </View>
              <View>
                {data.data.map((val) => (
                  <Text style={styles.riskName}>{val}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
});
