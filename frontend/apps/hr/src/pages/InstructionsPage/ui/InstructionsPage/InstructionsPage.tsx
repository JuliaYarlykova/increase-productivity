import { classNames } from '@repo/shared/lib';
import { AppLink, Card } from '@repo/shared/ui';
import { memo } from 'react';

import { Page } from '@/widgets/Page';

import cls from './InstructionsPage.module.scss';

interface InstructionsPageProps {
  className?: string;
}

const InstructionsPage = (props: InstructionsPageProps) => {
  const { className } = props;
  return (
    <Page className={classNames('', {}, [className])}>
      <Card variant="light">
        <AppLink
          target="_ blank"
          to="https://docs.google.com/document/d/1qTnV8oRyHc4c8oNaHrmKwKbQEZmTVNhTga7ULw2ySII/edit#heading=h.b7eu0ja0veyi"
          className={cls.btn}
          variant="button"
        >
          Скачать инструцкцию
          <span className="material-symbols-outlined">download</span>
        </AppLink>
      </Card>
    </Page>
  );
};

export default memo(InstructionsPage);
