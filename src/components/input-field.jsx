import { forwardRef } from 'react';
import styles from './field.module.css';

export const InputField = forwardRef(({ error, ...props }, ref) => {
  return (
    <>
      <input ref={ref} className={styles.inputField} {...props} />
      {error && <p className={styles.errorLabel}>{error}</p>}
    </>
  );
});
