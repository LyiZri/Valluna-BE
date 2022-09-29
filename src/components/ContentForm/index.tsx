import React from 'react';
// import { Form, Input } from "antd";
import { IFormItem, ISelectOption } from '@/types/form';
import { Form, Input, Radio, Select, Space } from 'antd';
import { FormLayout } from 'antd/lib/form/Form';
import IconFont from '../IconFont';
interface IProps {
  onFinish: Function;
  formItem?: IFormItem[];
  children?: React.ReactNode;
  layoutObj?: object;
  layout?: FormLayout;
  form?: any;
  initialValues?: Object;
  className?: string;
}
export default function ContentForm({
  onFinish,
  formItem,
  className,
  children,
  layoutObj = { labelCol: { span: 4 }, wrapperCol: { span: 12 } },
  layout,
  form,
  initialValues = {},
}: IProps) {
  return (
    <Form
      layout={layout}
      {...layoutObj}
      form={form}
      initialValues={initialValues}
      labelAlign="left"
      onFinish={(e) => onFinish(e)}
      className={className}
    >
      {formItem &&
        formItem.map((item: IFormItem, index: number) => {
          if (item.render) {
            return (
              <Form.Item
                colon={false}
                key={index}
                name={item.name}
                label={item.label}
                rules={[{ required: item.require, message: item.requireMsg }]}
              >
                {item.render}
              </Form.Item>
            );
          }
          if (item.type === 'radio') {
            return (
              <Form.Item
                colon={false}
                key={index}
                name={item.name}
                label={item.label}
                rules={[{ required: item.require, message: item.requireMsg }]}
              >
                <Radio.Group value={1} disabled={item.disabled}>
                  <Space direction="vertical">
                    {item.selectOption?.map((item: ISelectOption, index: number) => {
                      return (
                        <Radio key={item.value} value={item.value}>
                          {item.text}
                        </Radio>
                      );
                    })}
                  </Space>
                </Radio.Group>
              </Form.Item>
            );
          }
          if (item.type === 'input') {
            return (
              <Form.Item
                colon={false}
                key={index}
                name={item.name}
                label={item.label}
                rules={
                  item.require
                    ? [{ required: true, message: '' }, { validator: item.validator }]
                    : [{ required: false }]
                }
              >
                <Input
                  className={`${item.className}`}
                  disabled={item.disabled}
                  value={item.value as string | number}
                  placeholder={item.placeholder}
                />
              </Form.Item>
            );
          }
          if (item.type == 'button') {
            return (
              <Form.Item
                colon={false}
                key={index}
                name={item.name}
                label={item.label}
                rules={[{ required: item.require, message: item.requireMsg }]}
              >
                {item.children}
              </Form.Item>
            );
          }
          if (item.type == 'password') {
            return (
              <Form.Item
                colon={false}
                key={item.name}
                name={item.name}
                label={item.label}
                rules={
                  item.require
                    ? [{ required: true, message: '' }, { validator: item.validator }]
                    : [{ required: false }]
                }
              >
                <Input.Password
                  iconRender={(visible: boolean) => {
                    return visible ? (
                      <IconFont type="icon-yanjing_xianshi"></IconFont>
                    ) : (
                      <IconFont type="icon-yanjing_yincang"></IconFont>
                    );
                  }}
                  placeholder={item.placeholder}
                  className={`${item.className}`}
                  disabled={item.disabled}
                  value={item.value as string | number}
                ></Input.Password>
              </Form.Item>
            );
          }
          if (item.type == 'repassword') {
            return (
              <Form.Item
                colon={false}
                key={item.name}
                name={item.name}
                label={item.label}
                rules={[
                  { required: item.require, message: '' },
                  {
                    validator: (rules: any, value: string, callback: Function) => {
                      if (form.getFieldsValue().password == value) {
                        callback();
                      } else if (value == '' || !value) {
                        callback('Please re-enter the password');
                      } else {
                        callback('Passwords do not match');
                      }
                    },
                  },
                ]}
              >
                <Input.Password
                  placeholder={item.placeholder}
                  className={` ${item.className}`}
                  disabled={item.disabled}
                  iconRender={(visible: boolean) => {
                    return visible ? (
                      <IconFont type="icon-yanjing_xianshi"></IconFont>
                    ) : (
                      <IconFont type="icon-yanjing_yincang"></IconFont>
                    );
                  }}
                  value={item.value as string | number}
                ></Input.Password>
              </Form.Item>
            );
          }
          if (item.type == 'select') {
            return (
              <Form.Item
                colon={false}
                key={item.name}
                name={item.name}
                label={item.label}
                rules={[{ required: item.require, message: item.requireMsg }]}
              >
                <Select placeholder={item.placeholder} disabled={item.disabled}>
                  {item.selectOption?.map((selectIthem: ISelectOption, selcetIndex: number) => {
                    return (
                      <Select.Option key={selcetIndex} value={selectIthem.value}>
                        {selectIthem.text}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            );
          }
          if (item.type == 'select-tag') {
            return (
              <Form.Item
                colon={false}
                key={item.name}
                name={item.name}
                label={item.label}
                rules={[{ required: item.require, message: item.requireMsg }]}
              >
                <Select mode="multiple" placeholder={item.placeholder}>
                  {item.selectOption?.map((selectIthem: ISelectOption, selcetIndex: number) => {
                    return (
                      <Select.Option key={selcetIndex} value={selectIthem.value}>
                        {selectIthem.text}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            );
          }
        })}
      {children}
    </Form>
  );
}
