import React, { useState, useRef, useCallback } from 'react';
import './App.css';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { debounce, throttle } from 'lodash';

function App() {
  const [textDebounce, setTextDebounce] = useState('');
  const [textThrottle, setTextThrottle] = useState('');

  const delayedCall = useRef(
    debounce((value) => {
      setTextDebounce(value);
    }, 500)
  ).current;

  const delayedCallThrottle = useRef(
    throttle((value) => {
      setTextThrottle(value);
    }, 1000)
  ).current;

  const handleChange = useCallback(
    (e) => {
      delayedCall(e.target.value);
    },
    [delayedCall]
  );

  const handleChangeThrottle = useCallback(
    (e) => {
      delayedCallThrottle(e.target.value);
    },
    [delayedCallThrottle]
  );

  const onSubmit = useCallback((values) => {
    alert(JSON.stringify(values));
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required('Campo e-mail é obrigatório')
        .email('E-mail inválido'),
      password: Yup.string().required('Campo senha é obrigatório'),
    }),

    onSubmit,
  });

  return (
    <div className="App">
      <h3>Debounce after 500ms</h3>

      <div className="side-container">
        <input placeholder="Debounce" onChange={handleChange} />

        <input placeholder="Result Debonce" value={textDebounce} readOnly />
      </div>

      <h3>Throttle after 1000ms</h3>

      <div className="side-container">
        <input placeholder="Throttle" onChange={handleChangeThrottle} />

        <input placeholder="Result Throttle" value={textThrottle} readOnly />
      </div>

      <form onSubmit={formik.handleSubmit}>
        <h3>Formik and Yup</h3>

        <input
          id="email"
          name="email"
          placeholder="E-mail"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        {formik.touched.email && formik.errors.email && (
          <span className="error">{formik.errors.email}</span>
        )}

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        {formik.touched.password && formik.errors.password && (
          <span className="error">{formik.errors.password}</span>
        )}

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
