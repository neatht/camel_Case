import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Space, Steps } from 'antd';

import './ProfileSetup.css';
import 'emoji-mart/css/emoji-mart.css';

import Header from '../components/Header';
import CompanyAutoComplete from '../components/CompanyAutoComplete';

import Emoji from '../components/Emoji';

const { Step } = Steps;

function ProfileSetup() {
  const [step, setStep] = useState(0);

  const NUM_STEPS = 3;

  function incrementStep() {
    if (step < NUM_STEPS) {
      setStep(step + 1);
    }
  }

  function decrementStep() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  const onFinish = (result: any) => {
    console.log('finished form', result);
  };

  return (
    <div className="App">
      <Header pageKey="profile" />

      <div className="content-area">
        <h1>
          <Emoji symbol="👋" />
          <strong> Welcome</strong>
        </h1>

        <div className="steps" style={{ padding: 30 }}>
          <Steps size="small" current={step}>
            <Step title="Personal Information" />
            <Step title="Education and Experience" />
            <Step title="Projects" />
          </Steps>
        </div>

        <div className="profile-form">
          <Form
            //{...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            //onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[
                { required: true, message: 'Please enter your first name!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[
                { required: true, message: 'Please enter your last name!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Company" name="company" rules={[]}>
              <CompanyAutoComplete />
            </Form.Item>

            <Form.Item label="Date" name="date" rules={[]}>
              <DatePicker picker="month" format="MMM YYYY" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="step-buttons">
          <Space>
            {step > 0 && <Button onClick={decrementStep}> Back </Button>}
            <Button type="primary" onClick={incrementStep}>
              {' '}
              Next{' '}
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetup;
