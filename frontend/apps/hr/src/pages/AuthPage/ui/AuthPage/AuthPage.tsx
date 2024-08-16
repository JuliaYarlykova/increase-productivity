import { classNames } from '@repo/shared/lib';
import { Icon } from "@repo/shared/ui";
import { memo } from "react";

import { AuthorizationForm } from "@/features/Authorization";
import logo from "@/shared/assets/icons/redcat.staff.svg";

import cls from './AuthPage.module.scss';


interface AuthPageProps {
  className?: string;
}

const AuthPage = (props: AuthPageProps) => {
  const { className } = props;

  return (
    <div className={classNames(cls.AuthPage, {}, [className])}>
      <header className={cls.Navbar}>
        <div className={cls.navbar_wrapper}>
          <Icon Svg={logo} width={148} height={28} className={cls.navbar_logo}/>
        </div>
      </header>
      <div className={cls.authForm}>
        <AuthorizationForm />
      </div>
    </div>
  );
};

export default memo(AuthPage);

