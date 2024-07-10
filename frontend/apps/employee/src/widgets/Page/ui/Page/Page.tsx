import { ReactNode } from 'react'

import { classNames } from '@repo/shared/lib'

import cls from './Page.module.scss'

interface PageProps {
  className?: string
  children: ReactNode
}

export const Page = (props: PageProps) => {
  const { className, children } = props

  return <main className={classNames(cls.Page, {}, [className])}>{children}</main>
}
