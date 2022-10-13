import ContentCard from '@/components/ContentCard';
import IconFont from '@/components/IconFont';
import SearchBar from '@/components/SearchBar';
import { IChainValue, chainValueList } from '@/types/chainType';
import { IFormItem } from '@/types/form';
import { timestampToTime } from '@/utils/format';
import { LoadingOutlined } from '@ant-design/icons';
import { Avatar, Space, Table, Modal, Input, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import { useEffect } from 'react';
import ContentForm from '@/components/ContentForm';
import { useForm } from 'antd/lib/form/Form';

export default function BlockChain() {
  const [loading, setLoading] = useState({
    tableLoading: false,
    deleteLoading: false,
  });
  const [form] = useForm();
  const [modalStatus, setModalStatus] = useState({
    visiable: false,
    isEdit: false,
    name: '',
    imgUrl: '',
    index: 0,
  });
  const [list, setList] = useState<IChainValue[]>();
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
      dataIndex: 'imageUrl',
      render: (_, { imageUrl }) => {
        return <Avatar src={imageUrl} size={24} />;
      },
    },
    {
      title: 'Tagged Games',
      dataIndex: 'num',
      key: 'num',
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationdate',
      key: 'creationdate',
      render: (_, { creationdate }) => {
        return <p>{timestampToTime(creationdate as string)}</p>;
      },
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
  const chainForm = [
    {
      name: 'id',
      type: '',
    },
    {
      name: 'name',
      label: 'Name',
      type: 'input',
      require: true,
      placeholder: 'Please input name',
    },
  ];
  const getList = async () => {
    setLoading({
      ...loading,
      tableLoading: true,
    });
    setList(chainValueList);
    setLoading({
      ...loading,
      tableLoading: false,
    });
  };
  const onEdit = (record: IChainValue, index: number) => {
    setModalStatus({
      ...modalStatus,
      ...record,
      visiable: true,
      index,
      isEdit: true,
    });
  };
  const onDelete = async (record: IChainValue, index: number) => {
    const _list = list?.concat([]);
    _list?.splice(index, 1);
    setList(_list);
  };
  const onCreate = async () => {
    setModalStatus({
      ...modalStatus,
      isEdit: false,
      visiable: true,
    });
  };
  const onSaveForm = async (e: any) => {
    console.log(e);

    const _list = list?.concat([]);
    console.log(modalStatus);
    if (modalStatus.isEdit) {
      (_list as IChainValue[])[modalStatus.index].name = e.name;
      console.log(_list);
    } else {
      _list?.push({
        id: 123,
        name: e.name,
        imageUrl: modalStatus.imgUrl || '',
        num: 0,
      });
    }
    setList(_list);
    setModalStatus({
      visiable: false,
      isEdit: false,
      name: '',
      imgUrl: '',
      index: 0,
    });
  };
  const onSearch = async (e: any) => {
    console.log(e);
  };
  const onCancel = () => {
    setModalStatus({
      visiable: false,
      isEdit: false,
      name: '',
      imgUrl: '',
      index: 0,
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
          <Table rowKey={'id'} loading={loading.tableLoading} columns={colums} dataSource={list} />
        </ContentCard>
      </section>
      <Modal
        open={modalStatus.visiable}
        onOk={() => form.submit()}
        onCancel={onCancel}
        title={modalStatus.isEdit ? `Edit:${modalStatus.name}` : 'add New Chain'}
      >
        <ContentForm
          form={form}
          initialValues={{
            name: modalStatus.name,
            imageUrl: modalStatus.imgUrl,
          }}
          formItem={chainForm}
          onFinish={onSaveForm}
        ></ContentForm>
      </Modal>
    </div>
  );
}
