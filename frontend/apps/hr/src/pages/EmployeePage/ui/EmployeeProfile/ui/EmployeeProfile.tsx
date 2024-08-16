import { zodResolver } from '@hookform/resolvers/zod';
import { maskitoTransform } from '@maskito/core';
import { useMaskito } from '@maskito/react';
import { classNames } from '@repo/shared/lib';
import { Card, Input, SegmentedControl, Text, Toast } from '@repo/shared/ui';
import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toaster } from 'rsuite';
import { z } from 'zod';

import { editEmployee } from '../api/editEmployeeApi';
import dateOptions from '../lib/dateMask';
import salaryOptions from '../lib/salaryMask';

import { Employee } from '@/entities/Employee';
import { addEmployeeSchema } from '@/features/AddEmployee';
import { getAgeInFullYears, getDate } from '@/shared/lib/getDate/useDate';

import cls from './EployeeProfile.module.scss';

interface EmployeeProfileProps {
  employee?: Employee;
  className?: string;
}

const segments = [
  { value: 'working', label: 'Трудоустроен' },
  { value: 'fired', label: 'Уволен' },
];

const editEmployeeSchema = addEmployeeSchema.omit({
  password: true,
  password_confirmation: true,
  first_name: true,
  last_name: true,
  middle_name: true,
});

type EmployeeFormInputData = z.input<typeof editEmployeeSchema>;
export type EmployeeFormOutputData = z.output<typeof editEmployeeSchema>;

export const EmployeeProfile = (props: EmployeeProfileProps) => {
  const { employee, className } = props;

  const dobInputRef = useMaskito({ options: dateOptions });
  const doeInputRef = useMaskito({ options: dateOptions });
  const salaryInputRef = useMaskito({ options: salaryOptions });
  const balanceInputRef = useMaskito({ options: { mask: /^\d+$/ } });
  const [changeEmployee, { isSuccess, isLoading, isError }] = editEmployee();

  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<EmployeeFormInputData, any, EmployeeFormOutputData>({
    defaultValues: {
      birth_date: employee
        ? maskitoTransform(getDate(new Date(employee.birth_date)), dateOptions)
        : '',
      email: employee?.email ?? '',
      position: employee?.position ?? '',
      salary: employee
        ? maskitoTransform(
            parseInt(employee.salary, 10).toString(),
            salaryOptions,
          )
        : '',
      date_of_hiring: employee
        ? maskitoTransform(
            getDate(new Date(employee.date_of_hiring)),
            dateOptions,
          )
        : '',
      status: employee?.status ?? 'working',
      imgSrc: 'img',
      work_experience: employee?.work_experience ?? 0,
      balance: employee ? parseInt(employee.balance, 10) : 0,
    },
    resolver: zodResolver(editEmployeeSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<EmployeeFormOutputData> = async (data) => {
    if (isValid && employee) {
      const sendData = {
        ...data,
        id: employee.id,
      };
      await changeEmployee(sendData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset(getValues());
      toaster.push(
        <Toast
          text="Изменения сохранены!"
          size="l"
          variant="success"
          addOnLeft={
            <span className="material-symbols-outlined">check_circle</span>
          }
        />,
        { placement: 'bottomCenter' },
      );
    }
    if (isError) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  if (!employee) {
    return null;
  }

  return (
    <>
      <Card
        variant="light"
        padding="16"
        className={classNames(cls.EmployeeProfile, {}, [className])}
      >
        <Text title="Личные данные сотрудника" size="s" bold />
        <form noValidate className={cls.inputs}>
          <div className={cls.two_inputs}>
            <Input readonly value={employee.first_name} />
            <Input readonly value={employee.middle_name} />
          </div>
          <Input readonly value={employee.last_name} />
          <div className={cls.two_inputs}>
            <Controller
              name="birth_date"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  readonly={isLoading || employee.status === 'fired'}
                  maskedInputRef={dobInputRef}
                  placeholder="Дата рождения (ХХ.ХХ.ХХХХ)"
                  errorMessage={errors.birth_date?.message}
                  onInput={(event) => {
                    field.onChange(event.currentTarget.value);
                    if (errors.birth_date) trigger('birth_date');
                  }}
                  onBlur={() => {
                    field.onBlur();
                    if (dirtyFields.birth_date) handleSubmit(onSubmit)();
                  }}
                />
              )}
            />
            <Input
              readonly
              value={`Полных лет: ${getAgeInFullYears(employee.birth_date)}`}
            />
          </div>
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                readonly={isLoading || employee.status === 'fired'}
                placeholder="Должность"
                errorMessage={errors.position?.message}
                onInput={(event) => {
                  field.onChange(event.currentTarget.value);
                  if (errors.position) trigger('position');
                }}
                onBlur={() => {
                  field.onBlur();
                  if (dirtyFields.position) handleSubmit(onSubmit)();
                }}
              />
            )}
          />
          <Controller
            name="salary"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                readonly={isLoading || employee.status === 'fired'}
                maskedInputRef={salaryInputRef}
                placeholder="З/П, тыс. руб."
                errorMessage={errors.salary?.message}
                onInput={(event) => {
                  field.onChange(event.currentTarget.value);
                  if (errors.salary) trigger('salary');
                }}
                onBlur={() => {
                  field.onBlur();
                  if (dirtyFields.salary) handleSubmit(onSubmit)();
                }}
              />
            )}
          />

          <div className={cls.two_inputs}>
            <Controller
              name="date_of_hiring"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  readonly={isLoading || employee.status === 'fired'}
                  maskedInputRef={doeInputRef}
                  label="Дата трудоустройства"
                  placeholder="Дата трудоустройства (ХХ.ХХ.ХХХХ)"
                  errorMessage={errors.date_of_hiring?.message}
                  onInput={(event) => {
                    field.onChange(event.currentTarget.value);
                    if (errors.date_of_hiring) trigger('date_of_hiring');
                  }}
                  onBlur={() => {
                    field.onBlur();
                    if (dirtyFields.date_of_hiring) handleSubmit(onSubmit)();
                  }}
                />
              )}
            />
            <Input
              label="Лет стажа"
              value={`${getAgeInFullYears(employee.date_of_hiring)}`}
              readonly
            />
          </div>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <SegmentedControl
                name="status"
                className={cls.control}
                disabled={isLoading}
                segments={segments}
                callback={(value) => {
                  field.onChange(value);
                  handleSubmit(onSubmit)();
                }}
                defaultIndex={segments.findIndex(
                  (item) => item.value === field.value,
                )}
              />
            )}
          />
        </form>
      </Card>
      <Card variant="light" padding="16" className={cls.EmployeeBalance}>
        <Text title="Баланс, HR-коины" size="s" bold />
        <Controller
          name="balance"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              maskedInputRef={balanceInputRef}
              readonly={isLoading || employee.status === 'fired'}
              errorMessage={errors.balance?.message}
              onInput={(event) => {
                field.onChange(Number(event.currentTarget.value));
                if (errors.balance) trigger('balance');
              }}
              onBlur={() => {
                field.onBlur();
                if (dirtyFields.balance) handleSubmit(onSubmit)();
              }}
            />
          )}
        />
      </Card>
    </>
  );
};
