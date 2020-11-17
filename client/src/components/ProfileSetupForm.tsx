import React from 'react';

import { Button, Form, Input, Select, Switch } from 'antd';

import Emoji from './Emoji';

import './ProfileSetupForm.css';

const { Option } = Select;

type ProfileSetupFormProps = {
  /** Callback function when the form is submitted */
  onFinish?: (result: any) => void;
  /** Text to be included on the submit button */
  submitLabel?: string;
  /** Used to display loading icon on submit button */
  isLoading?: boolean;
};

function ProfileSetupForm(props: ProfileSetupFormProps) {
  const onFinish = (result: any) => {
    if (props.onFinish) {
      props.onFinish(result);
    }
  };

  return (
    <div className="profile-form">
      <Form
        name="basic"
        initialValues={{
          remember: true,
          public: true,
          lookingForWork: true,
          publicLocation: true,
        }} // public and lookingForWork are set due to inconsistent inital value of Switch
        onFinish={onFinish}
      >
        <h3>
          <strong>Personal Information</strong>
        </h3>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please enter your first name',
              max: 50,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please enter your last name',
              max: 50,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: 'Please enter your gender or select prefer not to say',
            },
          ]}
        >
          <Select>
            <Option value="male">
              <Emoji symbol="👨‍💼" />
              Male
            </Option>
            <Option value="female">
              <Emoji symbol="👩‍💼" />
              Female
            </Option>
            <Option value="other">
              <Emoji symbol="🧑‍💼" />
              Other / Prefer not to say
            </Option>
          </Select>
        </Form.Item>

        {/* TODO: DOB: currently returns type as Moment which API does not accept (requires JS Date) - Can't see a way for DatePicker to convert from Moment to Date
        
        <Form.Item label="Date of Birth" name="DOB" rules={[]}>
          <DatePicker
            picker="date"
            format="DD/MM/YYYY"
            placeholder="DD/MM/YYYY"
          />
        </Form.Item> */}

        <h3>
          <strong>Profile Information</strong>
        </h3>

        <Form.Item
          label="Profile Privacy"
          name="public"
          valuePropName="checked"
        >
          <Switch
            checkedChildren={
              <>
                <Emoji symbol="🌏" /> Public
              </>
            }
            unCheckedChildren={
              <>
                <Emoji symbol="⛔️" /> Private
              </>
            }
          />
        </Form.Item>

        <Form.Item
          label="Show your location"
          name="publicLocation"
          valuePropName="checked"
        >
          <Switch
            checkedChildren={
              <>
                <Emoji symbol="🌏" /> Public
              </>
            }
            unCheckedChildren={
              <>
                <Emoji symbol="⛔️" /> Private
              </>
            }
          />
        </Form.Item>

        <Form.Item
          label="Work Status"
          name="lookingForWork"
          valuePropName="checked"
        >
          <Switch
            checkedChildren={
              <>
                <Emoji symbol="✅" /> Looking for work
              </>
            }
            unCheckedChildren={
              <>
                <Emoji symbol="❌" /> Not looking for work
              </>
            }
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={props.isLoading ? props.isLoading : false}
          >
            {props.submitLabel ? props.submitLabel : 'Submit'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProfileSetupForm;
