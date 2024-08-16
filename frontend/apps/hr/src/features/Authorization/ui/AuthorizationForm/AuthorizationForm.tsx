import { zodResolver } from '@hookform/resolvers/zod';
import { classNames } from '@repo/shared/lib';
import { AppLink, Button, Card, Icon, Input, Text } from '@repo/shared/ui';
import { memo, useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from "react-redux";

import {
  AuthorizationFormSchema,
  authorizationFormSchema,
} from '../../lib/authorizationFormSchema';
import {
  getLoginState
} from '../../model/selectors/getLoginState/getLoginState';
import { login } from '../../model/services/login/login';
import { loginActions } from '../../model/slice/loginSlice';

import Visible from '@/shared/assets/icons/visibility.svg';
import Invisible from '@/shared/assets/icons/visibility_off.svg';
import { useAppDispatch } from "@/shared/lib";

import cls from './AuthorizationForm.module.scss';

export interface AuthorizationFormProps {
  className?: string;
}

export const AuthorizationForm = memo((props: AuthorizationFormProps) => {
  const { className } = props;
  const { email, password, error, isLoading } = useSelector(getLoginState);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const onChangeEmail = useCallback((value: string) => {
    dispatch(loginActions.setEmail(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const {
    handleSubmit,
    reset,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm<AuthorizationFormSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(authorizationFormSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<AuthorizationFormSchema> = useCallback(() => {
    reset();
  }, [reset]);

  const onLoginClick = useCallback(() => {
    dispatch(login({ email, password }))
  }, [dispatch, email, password]);

  const handleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card
      className={classNames(cls.AuthorizationForm, {}, [className])}
      variant="light"
      padding="32"
    >
      <Text title="Авторизация" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className={cls.form}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              value={email}
              placeholder="email"
              size="l"
              type="email"
              errorMessage={errors.email?.message}
              onChange={(event) => {
                field.onChange(event.target.value);
                onChangeEmail(event.target.value);
                if (errors.email) trigger('email');
              }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              value={password}
              size="l"
              type={showPassword ? 'text' : 'password'}
              errorMessage={errors.password?.message}
              placeholder="Пароль"
              onChange={(event) => {
                field.onChange(event.target.value);
                onChangePassword(event.target.value);
                if (errors.password) trigger('password');
              }}
              addonRight={
                <Icon
                  Svg={showPassword ? Invisible : Visible}
                  clickable
                  width={18}
                  height={12}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleVisibility()}
                  tabIndex={-1}
                />
              }
            />
          )}
        />
        <AppLink to='/' className={cls.link}>
          Забыли пароль?
        </AppLink>
        <Button
          type="submit"
          disabled={!isValid || isLoading}
          className={cls.form_button}
          fullWidth
          size="l"
          onClick={onLoginClick}
        >
          Войти
        </Button>
        { error && <Text variant="error" size="s" text="Неверные имя пользователя или пароль" className={cls.error}/> }
      </form>
    </Card>
  );
});