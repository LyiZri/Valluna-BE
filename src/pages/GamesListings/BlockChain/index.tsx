import ContentCard from '@/components/ContentCard';
import IconFont from '@/components/IconFont';
import SearchBar from '@/components/SearchBar';
import { IChainValue } from '@/types/chainType';
import { IFormItem } from '@/types/form';
import { timestampToTime } from '@/utils/format';
import { LoadingOutlined } from '@ant-design/icons';
import { Avatar, Space, Table, Modal, Input, Button, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import { useEffect } from 'react';
import ContentForm from '@/components/ContentForm';
import { useForm } from 'antd/lib/form/Form';
import {
  addGLBlockChainItem,
  delGLBlockChainItem,
  editGLBlockChainItem,
  getGLBlockChainList,
} from '@/service/gamelistings';
import FileUpload from '@/components/FileUpload';
import { Form } from 'antd';

export default function BlockChain() {
  const [loading, setLoading] = useState({
    tableLoading: false,
    deleteLoading: false,
  });
  const [form] = useForm();
  const [modalData, setModalData] = useState({
    visiable: false,
    isEdit: false,
    name: '',
    img_url: '',
    index: 0,
    ticker: '',
  });
  const [list, setList] = useState<IChainValue[]>([]);
  const searchItem: IFormItem[] = [
    {
      name: 'name',
      type: 'input',
      col: 5,
      placeholder: 'Name',
    },
    {
      name: '',
      type: 'link-reset',
      col: 1,
      icon: 'icon-shuaxin',
    },
    {
      name: '',
      type: 'link-submit',
      col: 1,
      icon: 'icon-chazhao',
    },
  ];
  const colums: ColumnsType<IChainValue> = [
    {
      title: 'Name ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'img_url',
      render: (_, { img_url }) => {
        return <Avatar src={img_url} size={24} />;
      },
    },
    {
      title: 'Tagged Games',
      dataIndex: 'tagged_games',
      key: 'tagged_games',
    },
    {
      title: 'Creation Date',
      dataIndex: 'time',
      key: 'time',
      render: (_, { time }) => {
        return <p>{timestampToTime(time as string)}</p>;
      },
    },
    {
      title: 'Operator',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: 'Action',
      key: 'action',
      width: 180,
      render: (_, record, index) => (
        <Space size="middle">
          <IconFont
            type="icon-bianji"
            onClick={() => {
              onEdit(record, index);
            }}
            className="text-black text-xl cursor-pointer"
          />
          {loading.deleteLoading ? (
            <LoadingOutlined />
          ) : (
            <IconFont
              type="icon-delete"
              onClick={() => onDelete(record, index)}
              className="text-black text-xl cursor-pointer"
            />
          )}
        </Space>
      ),
    },
  ];
  const getList = async () => {
    setLoading({
      ...loading,
      tableLoading: true,
    });
    const { data } = await getGLBlockChainList({});
    setList(data);
    setLoading({
      ...loading,
      tableLoading: false,
    });
  };
  const onEdit = (record: IChainValue, index: number) => {
    setModalData({
      ...modalData,
      ...record,
      visiable: true,
      index,
      isEdit: true,
    });
  };
  const onDelete = async (record: IChainValue, index: number) => {
    const res = await delGLBlockChainItem({ blid: record.blid });
    if (res.code == 1) {
      message.success('Sucess');
      const _list = list?.concat([]);
      _list?.splice(index, 1);
      setList(_list);
    }
  };
  const onCreate = async () => {
    setModalData({
      ...modalData,
      isEdit: false,
      visiable: true,
    });
  };
  const onSaveForm = async (e: any) => {
    console.log(e);
    let _list = list?.concat([]);
    if (modalData.isEdit) {
      const res = await editGLBlockChainItem({
        ...modalData,
        img_url: modalData.img_url,
        blid: _list[modalData.index].blid,
      });
      if (res.code == 1) {
        (_list as IChainValue[])[modalData.index] = {
          ..._list[modalData.index],
          ...modalData,
          img_url: modalData.img_url,
        };
      }
    } else {
      const nameCheck = _list?.some((item, index) => {
        return item.name == e.name;
      });
      if (nameCheck) {
        message.error(e.name + ' already exists');
        return;
      }
      const res = await addGLBlockChainItem({
        ...e,
        img_url: modalData.img_url,
      });
      res.code == 1 &&
        _list?.push({
          ...res.data,
        });
    }
    setList(_list);
    onCancel();
  };
  const onSearch = async (e: any) => {
    console.log(e);
  };
  const onCancel = () => {
    form.resetFields();
    setModalData({
      visiable: false,
      isEdit: false,
      name: '',
      img_url: '',
      index: 0,
      ticker: '',
    });
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="p-8">
      <section>
        <div className="text-2xl font-semibold w-full text-left pb-4 border-b border-gray-500">
          Blockchains
        </div>
        <p className="text-md">Create and manage blockchains for game listings</p>
      </section>
      <section>
        <ContentCard>
          <div className="flex justify-between">
            <SearchBar className={'mb-4'} searchItem={searchItem} search={onSearch} />
            <Button onClick={onCreate} type="primary">
              Create New
            </Button>
          </div>
          <Table
            rowKey={'blid'}
            loading={loading.tableLoading}
            columns={colums}
            dataSource={list}
          />
        </ContentCard>
      </section>
      <Modal
        open={modalData.visiable}
        onOk={() => form.submit()}
        onCancel={onCancel}
        title={modalData.isEdit ? `Edit:${modalData.name}` : 'add New Chain'}
      >
        <Form form={form} onFinish={onSaveForm}>
          <Form.Item label="Name" required>
            <Input
              value={modalData.name}
              onChange={(e) => {
                setModalData({
                  ...modalData,
                  name: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Ticker" required>
            <Input
              value={modalData.ticker}
              onChange={(e) => {
                setModalData({
                  ...modalData,
                  ticker: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Image" required>
            <FileUpload
              defaultSrc={modalData.isEdit ? modalData.img_url : ''}
              onSuccess={(e: string) => {
                setModalData({
                  ...modalData,
                  img_url: e,
                });
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
