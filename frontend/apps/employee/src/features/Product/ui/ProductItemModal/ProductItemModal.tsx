'use client';

import { classNames } from '@repo/shared/lib';
import { Button } from '@repo/shared/ui';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import { Product } from '@/entities/Product';
import ozon from '@/shared/assets/images/ozon.png';
import { ModalSuccess } from '@/shared/ui/ModalSuccess';

import cls from './ProductItemModal.module.scss';

interface IProductItemModal {
  product?: Product;
  isOpen: boolean;
  setOpen: (arg: boolean) => void;
}

export const ProductItemModal = (props: IProductItemModal) => {
  const { product, isOpen, setOpen } = props;

  const [isSuccess, setSuccess] = useState(false);
  const [isSuccessPost, setSuccessPost] = useState(false);

  const userBalance = 200;
  if (!product) return null;
  return (
    <>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={() => {
              setOpen(false);
            }}
            className={cls.background}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={(e) => e.stopPropagation()}
              className={cls.ProductItemModal}
            >
              <Image
                className={cls.img}
                src={ozon}
                alt={product.title}
                width={480}
                height={320}
              />
              <div className={cls.body}>
                <div className={cls.header}>
                  <h3 className={cls.title}>{product.title}</h3>
                  <div className="">
                    <p className={cls.description}>{product.description}</p>
                    {userBalance < product.price && (
                      <p className={cls.error}>
                        Недостаточное количество баллов для совершения покупки
                      </p>
                    )}
                  </div>
                </div>
                <div className={cls.footer}>
                  <p className={cls.price}>{product.price} Б</p>
                  <Button
                    onClick={() => {
                      setSuccess(true);
                      setOpen(false);
                    }}
                    variant="primary"
                    size="l"
                    disabled={userBalance < product.price}
                  >
                    Приобрести
                  </Button>
                </div>
                <Button
                  className={cls.close}
                  variant="ghost"
                  onClick={() => setOpen(false)}
                >
                  <span
                    className={classNames('material-symbols-outlined', {}, [
                      cls.close_btn,
                    ])}
                  >
                    close
                  </span>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
      {isSuccess && (
        <ModalSuccess
          title="Вы точно хотите приобрести товар?"
          isOpen={isSuccess}
          onClose={() => {
            setSuccess(false);
          }}
          button={
            <div className={cls.btn_wrapper}>
              <Button
                variant="secondary"
                size="l"
                onClick={() => setSuccess(false)}
              >
                Отменить
              </Button>
              <Button
                size="l"
                onClick={() => {
                  setSuccessPost(true);
                  setSuccess(false);
                }}
              >
                Купить
              </Button>
            </div>
          }
        />
      )}
      {isSuccessPost && (
        <ModalSuccess
          isTimer
          title="Заявка успешно отправлена!"
          text="Ожидайте подтверждение от HR"
          isOpen={isSuccessPost}
          onClose={() => setSuccessPost(false)}
        />
      )}
    </>
  );
};
