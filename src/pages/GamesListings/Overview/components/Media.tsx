import { Button, Modal, Form, Input, Radio, Image, Switch, Space } from 'antd';
import { IMedia } from '@/types/gameListing';
import { useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import ContentMoveTable from '@/components/ContentMoveTable/index';
import { ColumnsType } from 'antd/lib/table';
import IconFont from '@/components/IconFont';
import FileUpload from '@/components/FileUpload';

interface IProps {
  list: IMedia[];
  setList: Function;
}
export default function Media({ list, setList }: IProps) {
  const [form] = useForm();
  const [type, setType] = useState(0);
  const [modalStatus, setModalStatus] = useState({
    visible: false,
    isAdd: true,
    index: -1,
  });
  const [modalData, setModalData] = useState({
    name: '',
    type: 1,
    url: '',
  });
  const columns: ColumnsType<IMedia> = [
    {
      title: 'Name',
      dataIndex: 'name',
      className: 'drag-visible',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (_, { type }) => {
        return type == 0 ? 'Video' : 'Image';
      },
    },
    {
      title: 'Preview/Link',
      dataIndex: 'url',
      render: (_, { type, url }) => {
        return type == 1 ? (
          <Image src={url} height={80} />
        ) : (
          <p
            className="text-blue-600 cursor-pointer !w-72"
            onClick={() => {
              window.open(url);
            }}
          >
            {url}
          </p>
        );
      },
      width: 300,
    },
    {
      title: 'Enable',
      dataIndex: 'enable',
      render: (_, { enable }, index) => {
        return (
          <Switch
            defaultChecked={enable == 1}
            onChange={(e) => {
              const _list = list;
              console.log(_list[index].enable == 0 ? 1 : 0);
              _list[index].enable = _list[index].enable == 0 ? 1 : 0;
              console.log(_list[index]);

              console.log(_list);
              setList(_list);
            }}
          />
        );
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
              onEdit(index);
            }}
            className="text-black text-xl cursor-pointer"
          />
          <IconFont
            type="icon-delete"
            onClick={() => {
              const _list = list ? list.concat([]) : [];
              _list.splice(index, 1);
              setList(_list);
            }}
            className="text-black text-xl cursor-pointer"
          />
        </Space>
      ),
    },
  ];

  const onAdd = () => {
    setModalStatus({
      ...modalStatus,
      visible: true,
      isAdd: true,
    });
  };
  const onEdit = (index: number) => {
    setModalStatus({
      ...modalStatus,
      visible: true,
      isAdd: false,
      index,
    });
    setModalData({
      ...list[index],
    });
  };
  const onFinish = async (e: any) => {
    const _list = list?.length ? list.concat([]) : [];
    if (modalStatus.isAdd) {
      _list.push({
        ...e,
        url: modalData.url,
        enable: 1,
        rank: _list.length,
      });
    } else {
      _list[modalStatus.index] = {
        ...e,
        url: modalData.url,
        enable: 1,
        rank: _list.length,
      };
    }
    setList(_list);
    initModalStatus();
    setType(0);
    form.resetFields();
  };
  const onCancel = async () => {
    initModalStatus();
    setType(0);
    form.resetFields();
  };
  const initModalStatus = () => {
    setModalStatus({
      visible: false,
      isAdd: true,
      index: -1,
    });
    setModalData({
      name: '',
      type: 1,
      url: '',
    });
  };
  return (
    <div>
      <div className="text-right">
        <Button type="primary" onClick={onAdd}>
          Add Media+
        </Button>
      </div>
      {/* <Table /> */}
      {list?.length && <ContentMoveTable setList={setList} columns={columns} list={list} />}
      <Modal
        onOk={form.submit}
        onCancel={onCancel}
        okText="Save"
        cancelText="Cancel"
        open={modalStatus.visible}
        title={modalStatus.isAdd ? 'Add Media' : ''}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item name={'name'} label="Name" required>
            <Input value={modalData.name}></Input>
          </Form.Item>
          <Form.Item
            name={'type'}
            label="Type"
            required
            initialValue={modalData.type ? modalData.type : 1}
          >
            <Radio.Group
              value={modalData.type}
              onChange={(e) => {
                setModalData({
                  ...modalData,
                  type: e.target.value,
                });
              }}
            >
              <Radio value={1} checked={modalData.type == 1}>
                Image
              </Radio>
              <Radio value={0} checked={modalData.type == 1}>
                Video
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label={type == 0 ? 'Game Image' : 'Youtube Link'}>
            {modalData.type == 1 && (
              <FileUpload
                defaultSrc={modalData.url}
                onSuccess={(e: string) => {
                  setModalData({
                    ...modalData,
                    url: e,
                  });
                }}
              />
            )}
            {modalData.type == 0 && (
              <div>
                <Input
                  defaultValue={modalData.url}
                  onChange={(e: any) =>
                    setModalData({
                      ...modalData,
                      url: e.target.value,
                    })
                  }
                />
                <span>Ensure the Youtube video is shareable</span>
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
