import { createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';
import { Field, Form, Formik } from 'formik';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useUserData } from '../../../utils/react/hooks/useUserData';
import styles from './commentform.css';


const updateComment = createEvent<string>();
const $comment = createStore('').on(updateComment, (_, newValue) => newValue)


export function CommentForm() {
  const value = useStore($comment);
  const { data } = useUserData();
  const [placeholder, setPlaceholder] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setPlaceholder(
      `${!!data.name ? data.name : "Аноним"}`
    );
  }, [data.name])

  useEffect(() => {
    ref.current?.focus();
  }, []);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.stopPropagation();
    updateComment(event.target.value);
  }

  function validateValue() {
    if (value.length <= 3) return 'Введите больше трех символов';
    return '';
  }

  return (
    <Formik
      initialValues={{
        comment: '',
      }}
      onSubmit={() => alert(`Комментарий отправлен`)}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <div className={styles.labelInTextarea}>
            <Field
              className={styles.input}
              as="textarea"
              name="comment"
              validate={validateValue}
              placeholder={''}
              innerRef={ref}
              value={value}
              onChange={handleChange}
              required
            />
            <label htmlFor="comment" className={styles.label}>
              <span className={styles.labelSpan} >{`${placeholder}, `}</span>оставьте ваш комментарий
            </label>
          </div>

          {errors.comment && touched.comment && <div>{errors.comment}</div>}

          <button type="submit" className={styles.button}>Комментировать</button>
        </Form>
      )}
    </Formik>
  );
}
