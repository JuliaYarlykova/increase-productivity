import { Avatar, Icon, Button } from '@repo/shared/ui';

import logout from '@/shared/assets/icons/logout.svg';

import cls from './ProfileBlock.module.scss';

export function ProfileBlock() {
  return (
    <div className={cls.ProfileBlock}>
      <div className={cls.profile_info}>
        <Avatar size={40} />
        <div className={cls.profile_text}>
          <p className={cls.name}>Александр</p>
          <p className={cls.position}>Веб-разработчик</p>
        </div>
      </div>
      <div className={cls.buttons}>
        <Button
          size="s"
          className={cls.personal_page_link}
          variant="secondary"
          disabled
        >
          Профиль
        </Button>
        <Button size="s" variant="exit" className={cls.exit}>
          <Icon Svg={logout} width={14} height={14} />
        </Button>
      </div>
    </div>
  );
}
