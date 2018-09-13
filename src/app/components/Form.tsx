import * as React from 'react';
import styled from 'styled-components';
import { InjectedFormikProps, withFormik } from 'formik';
import * as Yup from 'yup';

import Slider, { DIRECTIONS } from './Slider';

import Final from './formContents/Final';

interface FormValues {
  login: string;
  password: string;
}

interface FormProps {
  login?: string;
  password?: string;
  onSubmit: () => void;
}

const InnerForm: React.SFC<InjectedFormikProps<FormProps, FormValues>> = (props) => (
  <form onSubmit={props.handleSubmit}>
    <Slider
      slides={[
        {
          render: () => <Final {...props} />,
          fadeInFrom: DIRECTIONS.left
        }
      ]}
    />
  </form>
);

const StyledForm = styled(InnerForm)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Form = withFormik<FormProps, FormValues>({
  mapPropsToValues: () => ({ login: '', password: '' }),
  validationSchema: Yup.object().shape({
    login: Yup.string()
      .max(16, 'Please input 16 characters or less')
      .required('Please input login name'),
    password: Yup.string()
      .max(8, '馬鹿め')
      .required('Please input password')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit();
  }
})(StyledForm);