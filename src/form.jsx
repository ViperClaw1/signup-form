import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationFormScheme } from './registration-form-scheme.js';
import { InputField } from './components/input-field';
import styles from './form.module.css';

export const App = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { touchedFields, isValid, errors },
  } = useForm({
    defaultValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(registrationFormScheme),
    mode: 'onTouched',
  });

  const submitButtonRef = useRef(null);

  useEffect(() => {
    if (isValid) {
      submitButtonRef.current.focus();
    }
  }, [isValid]);

  const onSubmit = ({ email, password }) => {
    console.log({ email, password });
  };

  return (
    <div className={styles.app}>
      <form className={styles.formLogin} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Регистрация</h1>
        <InputField
          type="text"
          placeholder="Ваша почта..."
          error={errors.email?.message}
          {...register('email')}
        />
        <InputField
          type="password"
          placeholder="Ваш пароль..."
          error={errors.password?.message}
          {...register('password', {
            onChange: () =>
              touchedFields.passwordConfirm && trigger('passwordConfirm'),
          })}
        />
        <InputField
          type="password"
          placeholder="Подтверждение пароля..."
          error={errors.passwordConfirm?.message}
          {...register('passwordConfirm')}
        />
        <button
          type="submit"
          className={styles.btnSubmit}
          disabled={!isValid}
          ref={submitButtonRef}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};
