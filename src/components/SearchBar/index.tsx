import { IFormItem } from '@/types/form';
import { searchStatusData } from '@/types/user';
import { Button, Form, Input, Select, Tag, Avatar } from 'antd';
import React from 'react';
import IconFont from '@/components/IconFont/index';
import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { chainValueList } from '@/types/chainType';
import { IChainValue } from '../../types/chainType';
interface IProps {
  search: Function;
  searchItem: IFormItem[];
  className?: string;
}

export default function SearchBar(props: IProps) {
  const [form] = Form.useForm();
  const tagRender = (props: any) => {
    const { label, value, color, closable, onClose } = props;

    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={'#30373F'}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };
  return (
    <div className={`search-bar ${props.className}`}>
      <Form
        name="advanced_search"
        className="ant-advanced-search-form flex justify-between"
        form={form}
        onFinish={(e) => {
          props.search(e);
        }}
      >
        <div className="flex">
          {props.searchItem.map((item, index) => {
            if (item.type === 'input') {
              return (
                <Form.Item key={item.name} name={item.name}>
                  <Input
                    className=" rounded-lg w-32 mr-4"
                    value={item.value as string}
                    placeholder={item.placeholder}
                  />
                </Form.Item>
              );
            } else if (item.type == 'status-groups') {
              return (
                <Form.Item
                  key={item.name}
                  name={item.name}
                  label={item.label}
                  rules={[{ required: item.require }]}
                >
                  <Select
                    placeholder={item.placeholder}
                    className="mr-4 rounded-lg !w-32"
                    tagRender={tagRender}
                    options={searchStatusData}
                  ></Select>
                </Form.Item>
              );
            } else if (item.type == 'chain-groups') {
              return (
                <Form.Item
                  key={item.name}
                  name={item.name}
                  label={item.label}
                  rules={[{ required: item.require }]}
                >
                  <Select
                    placeholder={item.placeholder}
                    className="mr-4 rounded-lg !w-32"
                    tagRender={tagRender}
                    size="large"
                    // options={chainValueList}
                  >
                    {chainValueList.map((item: IChainValue, index: number) => {
                      return (
                        <Select.Option key={item.id}>
                          <div className="flex justify-between">
                            <Avatar size={24} src={item.imageUrl} />
                            <p color={item.color}>{item.slug}</p>
                          </div>
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              );
            }
          })}
        </div>
        <div className="flex">
          {props.searchItem.map((item, index) => {
            if (item.type == 'link-reset') {
              return (
                <Button
                  key={index}
                  type="link"
                  htmlType="reset"
                  onClick={() => props.search()}
                  className="px-1"
                >
                  <div className="px-1 rounded">
                    <Avatar
                      onClick={() => form.resetFields([])}
                      style={{ backgroundColor: '#fff' }}
                      icon={<RedoOutlined color="#000" className="text-black cursor-pointer" />}
                    />
                  </div>
                </Button>
              );
            } else if (item.type == 'link-submit') {
              return (
                <Button key={index} type="link" htmlType="submit" className="px-1">
                  <div className="px-1 rounded">
                    <Avatar
                      style={{ backgroundColor: '#fff' }}
                      icon={<SearchOutlined color="#000" className="text-black cursor-pointer" />}
                    />
                  </div>
                </Button>
              );
            } else if (item.render) {
              return (
                <Form.Item
                  key={index}
                  name={item.name}
                  label={item.label}
                  className={'text-white'}
                  rules={[{ required: item.require }]}
                >
                  {item.render}
                </Form.Item>
              );
            }
          })}
        </div>
      </Form>
    </div>
  );
}
