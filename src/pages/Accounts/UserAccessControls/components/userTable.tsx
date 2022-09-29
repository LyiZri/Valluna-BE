import ContentForm from '@/components/ContentForm';
import IconFont from '@/components/IconFont';
import { IFormItem } from '@/types/form';
import { IUsers, rolesData, tableData } from '@/types/user';

import { Button, Modal, Space, Table, Tag } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import ContentCard from '@/components/ContentCard';

interface IProps {
  openModal: Function;
}
let editorId = 0;
export default function userTable() {
  const [userlist, setUserList] = useState<IUsers[]>();
  const [form] = useForm();
  const [modelValue, setModalValue] = useState({
    title: <></>,
    open: false,
    content: <></>,
    okText: '',
    isDelete: false,
  });

  const [loading, setLoading] = useState({
    listLoading: false,
    confirmLoading: false,
  });
  const [pageData, setPageData] = useState({
    size: 10,
    amount: 10,
  });
  /**
   *
   * @param type 0:Add,1 ：Editor, 2:Delelte
   */
  const openModal = (type: number, userValue?: IUsers) => {
    if (type == 0) {
      setModalValue({
        ...modelValue,
        open: true,
        title: (
          <p>
            <b>Add a New User</b>
          </p>
        ),
        content: (
          <ContentForm
            form={form}
            initialValues={undefined}
            formItem={permissionModalFormItem}
            onFinish={onAdd}
          />
        ),
        okText: 'Save',
        isDelete: false,
      });
    } else if (type == 1) {
      form.setFieldsValue(userValue);
      editorId = userValue?.id as number;
      setModalValue({
        ...modelValue,
        open: true,
        title: (
          <p>
            <b>Edit User:</b>
            {userValue?.email}
          </p>
        ),
        content: (
          <>
            <ContentForm form={form} formItem={permissionModalFormItem} onFinish={onEditor} />
          </>
        ),
        okText: 'Save',
        isDelete: false,
      });
    } else {
      editorId = userValue?.id as number;
      console.log('id=====', editorId, userValue);

      setModalValue({
        ...modelValue,
        open: true,
        title: (
          <p>
            <b>Delete:</b>
            {userValue?.email}
          </p>
        ),
        content: (
          <p>
            Are you sure you wish to delete this user? They will no longer be able to access the
            portal
          </p>
        ),
        okText: 'Delete',
        isDelete: true,
      });
    }
  };
  const onEditor = (e: IUsers) => {
    setLoading({
      ...loading,
      confirmLoading: true,
    });
    //临时
    setTimeout(() => {
      console.log(e);
      setLoading({
        ...loading,
        confirmLoading: false,
      });
      let listCopy = (userlist as IUsers[]).concat([]);
      userlist?.map((item: IUsers, index: number) => {
        console.log({ item, e, editorId });
        if (item.id == editorId) {
          listCopy[index] = e;
        }
        setUserList(listCopy);
      });
      onModalCancel();
    }, 300);
  };
  const onAdd = (e: IUsers) => {
    setLoading({
      ...loading,
      confirmLoading: true,
    });
    //临时
    setTimeout(() => {
      setLoading({
        ...loading,
        confirmLoading: false,
      });
      setUserList(userlist?.concat(e));
      onModalCancel();
    }, 300);
  };
  const onDelete = async () => {
    let listCopy = userlist?.concat([]);
    listCopy?.map((item: IUsers, index: number) => {
      if (item.id == editorId) {
        listCopy?.splice(index, 1);
      }
    });
    setUserList(listCopy);
    onModalCancel();
  };
  const onModalCancel = () => {
    form.resetFields();
    setModalValue({
      title: <></>,
      open: false,
      content: <></>,
      okText: '',
      isDelete: false,
    });
  };
  const getList = async () => {
    setLoading({ ...loading, listLoading: true });
    //临时
    setUserList(tableData);
    setPageData({ ...pageData, amount: tableData.length });
    setLoading({ ...loading, listLoading: false });
  };
  const pageChange = (e: any) => {};
  useEffect(() => {
    getList();
  }, []);
  const userColumns: ColumnsType<IUsers> = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Roles',
      key: 'roles',
      dataIndex: 'roles',
      render: (_, { roles }) => (
        <>
          {roles && roles?.length > 0 ? (
            roles.map((item) => {
              return <Tag>{item}</Tag>;
            })
          ) : (
            <Tag>-</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="middle">
          <IconFont
            type="icon-bianji"
            onClick={() => {
              openModal(1, record);
            }}
            className="text-black text-xl cursor-pointer"
          />
          <IconFont
            type="icon-delete"
            onClick={() => openModal(2, record)}
            className="text-black text-xl cursor-pointer"
          />
        </Space>
      ),
    },
  ];
  const permissionModalFormItem: IFormItem[] = [
    {
      name: 'id',
      type: '',
    },
    {
      name: 'email',
      type: 'input',
      col: 3,
      label: 'Email',
      require: true,
      placeholder: 'Please enter your Email',
    },
    {
      name: 'roles',
      type: 'select-tag',
      label: 'Role',
      require: true,
      placeholder: 'Please select the permissions you want to grant',
      selectOption: rolesData,
    },
  ];
  return (
    <div>
      <ContentCard className={'m-0'}>
        <div className="flex justify-end mb-4">
          <Button
            shape="round"
            type="primary"
            onClick={() => {
              openModal(0);
            }}
          >
            Add New User +
          </Button>
        </div>
        <Table
          loading={loading.listLoading}
          columns={userColumns}
          dataSource={userlist}
          rowKey={'id'}
          pagination={{
            pageSize: 10,
            total: pageData.amount,
            onChange: (e) => {
              pageChange(e);
            },
          }}
        />
      </ContentCard>
      <Modal
        open={modelValue.open}
        title={modelValue.title}
        onCancel={onModalCancel}
        onOk={() => (modelValue.isDelete ? onDelete() : form.submit())}
        cancelText="Cancel"
        okText={modelValue.okText}
        confirmLoading={loading.confirmLoading}
      >
        {modelValue.content}
      </Modal>
    </div>
  );
}
