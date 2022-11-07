import ContentCard from '@/components/ContentCard';
import IconFont from '@/components/IconFont';
import SearchBar from '@/components/SearchBar';
import { IFormItem } from '@/types/form';
import { getSearchList, timestampToTime } from '@/utils/format';
import { LoadingOutlined } from '@ant-design/icons';
import { Avatar, Space, Table, Modal, Input, Button, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import { useEffect } from 'react';
import ContentForm from '@/components/ContentForm';
import { useForm } from 'antd/lib/form/Form';
import { ICategories } from '@/types/gameListing';
import { addCategoryItem, editCategoryItem, getCategoryList } from '@/service/gamelistings';
import { delCategoryItem } from '../../../service/gamelistings';
import { useUserAuth } from '@/utils/user';

export default function Categories() {
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
  const [list, setList] = useState<ICategories[]>();
  const haveAuth = useUserAuth('Gamelistings');
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
  const colums: ColumnsType<ICategories> = [
    {
      title: 'Name ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tagged Games',
      dataIndex: 'num',
      key: 'num',
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
    haveAuth
      ? {
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
        }
      : {},
  ];
  const chainForm = [
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
    const res = await getCategoryList({});
    setList(res?.data);
    setLoading({
      ...loading,
      tableLoading: false,
    });
  };
  const onEdit = (record: ICategories, index: number) => {
    setModalStatus({
      ...modalStatus,
      ...record,
      visiable: true,
      index,
      isEdit: true,
    });
  };
  const onDelete = async (record: ICategories, index: number) => {
    const res = await delCategoryItem({ name: record.name });
    if (res.code == 1) {
      message.success('Sucess');
      const _list = list ? list?.concat([]) : [];
      _list?.splice(index, 1);
      setList(_list);
    }
  };
  const onCreate = async () => {
    setModalStatus({
      ...modalStatus,
      isEdit: false,
      visiable: true,
    });
  };
  const onSaveForm = async (e: any) => {
    const _list = list ? list?.concat([]) : [];
    const nameCheck = _list?.some((item, index) => {
      return item.name == e.name;
    });
    if (nameCheck) {
      message.error(e.name + ' already exists');
      return;
    }
    if (modalStatus.isEdit) {
      const res = await editCategoryItem({ oldname: modalStatus.name, newname: e.name });
      res?.code == 1 && ((_list as ICategories[])[modalStatus.index].name = e.name);
    } else {
      const res = await addCategoryItem({ name: e.name });
      res?.code == 1 &&
        _list?.push({
          name: e.name,
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
    if (e) {
      const _list = getSearchList(e, list);
      setList(_list);
    } else {
      await getList();
    }
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
          Game Categories
        </div>
        <p className="text-md">Create and manage game categories for game listings.</p>
      </section>
      <section>
        <ContentCard>
          <div className="flex justify-between">
            <SearchBar className={'mb-4'} searchItem={searchItem} search={onSearch} />
            {haveAuth && (
              <Button onClick={onCreate} type="primary">
                Create New
              </Button>
            )}
          </div>
          <Table
            rowKey={'name'}
            loading={loading.tableLoading}
            columns={colums}
            dataSource={list}
          />
        </ContentCard>
      </section>
      <Modal
        open={modalStatus.visiable}
        onOk={() => form.submit()}
        onCancel={onCancel}
        title={modalStatus.isEdit ? `Edit:${modalStatus.name}` : 'Add New Category'}
      >
        <ContentForm
          form={form}
          initialValues={{
            name: modalStatus.name,
          }}
          formItem={chainForm}
          onFinish={onSaveForm}
        ></ContentForm>
      </Modal>
    </div>
  );
}
