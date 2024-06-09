import { memo } from 'react';

import tophr from '@/shared/assets/icons/top-hr.svg'
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Icon } from '@/shared/ui/Icon';

import cls from './Footer.module.scss';

interface FooterProps {
  className?: string;
}

const topLinks = [
  { title: 'Возможности', link: '/' },
  { title: 'Тарифы', link: '/' },
  { title: 'Меню или ссылка', link: '/' }
]

const bottomLinks = [
  { title: 'Политика обработки персональных данных', link: '/' },
  { title: 'Пользовательское соглашение', link: '/' },
  { title: 'Разработка Академии Абдрашитова', link: '/' }
]

export const Footer = memo((props: FooterProps) => {
  const { className } = props;

  return (
    <div className={classNames(cls.Footer, {}, [className])}>
      <div className={cls.top}>
        <Icon Svg={tophr} width={126} height={34} />
        <ul className={cls.top__links}>
          {topLinks.map((item, index) => (
            <li key={index}>
              <AppLink to={item.link}>
                {item.title}
              </AppLink>
            </li>
          ))}
        </ul>
      </div>
      <ul className={cls.bottom__links}>
        {bottomLinks.map((item, index) => (
          <li key={index}>
            <AppLink to={item.link}>
              {item.title}
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  );
});

