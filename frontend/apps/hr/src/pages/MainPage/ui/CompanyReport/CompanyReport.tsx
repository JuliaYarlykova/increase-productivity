import { classNames } from '@repo/shared/lib';
import { Card, Text } from '@repo/shared/ui';

import { DownloadCompanyReportButton } from '@/features/DownloadCompanyReportButton';

import cls from './CompanyReport.module.scss';

export const CompanyReport = () => (
  <Card variant="light" className={classNames(cls.wrapper_common, {}, [])}>
    <Text text="Отчёт по компании" bold size="s" className={cls.title} />
    <Text
      text="Вся страница будет в формате PDF будет выгружена на ваш компьютер"
      size="xs"
      variant="grey"
      className={cls.text}
    />

    <DownloadCompanyReportButton />
  </Card>
);
