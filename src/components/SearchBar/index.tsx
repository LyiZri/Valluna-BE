import { IFormItem } from '@/types/form';
import { searchFeaturedData, searchStatusData } from '@/types/user';
import { Button, Form, Input, Select, Tag, Avatar, FormInstance } from 'antd';
import React from 'react';
import IconFont from '@/components/IconFont/index';
import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { IChainValue } from '../../types/chainType';
import { IGame } from '@/types/gameListing';
import { useEffect } from 'react';
import { useState } from 'react';
import { getGLOverviewList } from '@/service/gamelistings';
interface IProps {
  search: Function;
  searchItem: IFormItem[];
  className?: string;
  form?: FormInstance<any>;
}

export default function SearchBar(props: IProps) {
  const form = props.form ? props.form : Form.useForm()[0];
  const [loading, setLoading] = useState({
    gameListLoading: false,
  });
  const [gameList, setGameList] = useState<IGame[]>([]);
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
  const getGameList = async () => {
    setLoading({
      ...loading,
      gameListLoading: true,
    });
    const { data } = await getGLOverviewList({});
    setGameList(data);
    setLoading({
      ...loading,
      gameListLoading: false,
    });
  };
  useEffect(() => {
    getGameList();
  }, []);
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
            } else if (item.type == 'featured-groups') {
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
                    options={searchFeaturedData}
                  ></Select>
                </Form.Item>
              );
            } else if (item.type == 'game-groups') {
              return (
                <Form.Item
                  key={item.name}
                  name={item.name}
                  label={item.label}
                  rules={[{ required: item.require }]}
                >
                  <Select
                    className="mr-4 rounded-lg !w-32 rounded-xl"
                    placeholder={item?.placeholder}
                    loading={loading.gameListLoading}
                  >
                    {gameList.map((item: IGame, index: number) => {
                      if (item.status == 0) return;
                      if (item.editstatus == 0 && item.draft.game_name) {
                        return (
                          <Select.Option key={item.glid} value={item.glid}>
                            <p>{item.draft.game_name}</p>
                          </Select.Option>
                        );
                      } else {
                        return (
                          <Select.Option key={item.game_name} value={item.glid}>
                            <p>{item.game_name}</p>
                          </Select.Option>
                        );
                      }
                    })}
                  </Select>
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
                  ChainGrops
                  {/* <Select
                    placeholder={item.placeholder}
                    className="mr-4 rounded-lg !w-32"
                    tagRender={tagRender}
                    size="large"
                    // options={chainValueList}
                  >
                    {chainValueList.map((item: IChainValue, index: number) => {
                      return (
                        <Select.Option key={item.blid}>
                          <div className="flex justify-between">
                            <Avatar size={24} src={item.img_url} />
                            <p color={item.color}>{item.slug}</p>
                          </div>
                        </Select.Option>
                      );
                    })}
                  </Select> */}
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
