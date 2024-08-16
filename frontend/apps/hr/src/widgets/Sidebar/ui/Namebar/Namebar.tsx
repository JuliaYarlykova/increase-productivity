import { classNames } from '@repo/shared/lib';
import { Avatar, Button, Icon, Text } from '@repo/shared/ui';
import { useCallback } from "react";

import { userLogout } from "@/entities/User";
import Logout from '@/shared/assets/icons/logout.svg';
import { useAppDispatch } from "@/shared/lib";

import cls from './Namebar.module.scss';


interface NamebarProps {
  className?: string;
}

export const Namebar = (props: NamebarProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const onLogoutClick = useCallback(() => {
    dispatch(userLogout());
    window.location.reload();
  }, [dispatch])

  return (
    <div className={classNames(cls.Namebar, {}, [className])}>
      <div className={cls.namebar_info}>
        <Avatar size={40} />
        <div className={cls.namebar_info_text}>
          <Text title="Константин" size="xs" />
          <Text text="Компания X" size="xs" />
        </div>
      </div>
      <div className={cls.namebar_buttons}>
        <Button size="s" variant="secondary" disabled>
          Профиль
        </Button>
        <Button
          size="s"
          variant="exit"
          className={cls.logout_button}
          onClick={onLogoutClick}
        >
          <Icon Svg={Logout} width={14} height={14} />
        </Button>
      </div>
    </div>
  );
};
