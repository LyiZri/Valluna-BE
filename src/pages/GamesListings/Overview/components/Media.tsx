import React from 'react';
import { Button, Table, Modal, Form, Input, Radio, Upload } from 'antd';
import { IMedia } from '@/types/gameListing';
import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import ContentMoveTable from '@/components/ContentMoveTable/index';

interface IProps {
  list: IMedia[];
  setList: Function;
}
export default function Media({ list, setList }: IProps) {
  const [form] = useForm();
  const [type, setType] = useState(0);
  const [loading, setLoading] = useState({
    imageLoading: false,
  });
  const [modalStatus, setModalStatus] = useState({
    visible: false,
    isAdd: true,
    modalData: {
      name: '',
      type: 0,
      url: '',
    },
  });
  const onAdd = () => {
    setModalStatus({
      ...modalStatus,
      visible: true,
      isAdd: true,
    });
  };
  const uploadButton = (
    <div>
      {loading.imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const onFinish = async (e: any) => {
    console.log(e, modalStatus.modalData.url);
    setModalStatus({
      visible: false,
      isAdd: true,
      modalData: {
        name: '',
        type: 0,
        url: '',
      },
    });
    setType(0);
    form.resetFields();
  };
  const onCancel = async () => {
    setModalStatus({
      visible: false,
      isAdd: true,
      modalData: {
        name: '',
        type: 0,
        url: '',
      },
    });
    setType(0);
    form.resetFields();
  };
  return (
    <div>
      <div className="text-right">
        <Button type="primary" onClick={onAdd}>
          Add Media+
        </Button>
      </div>
      {/* <Table /> */}
      <ContentMoveTable />
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
            <Input></Input>
          </Form.Item>
          <Form.Item name={'type'} label="Type" required>
            <Radio.Group
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <Radio value={0}>Image</Radio>
              <Radio value={1}>Video</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label={type == 0 ? 'Game Image' : 'Youtube Link'}>
            {type == 0 && (
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              >
                {modalStatus.modalData.url ? (
                  <img src={modalStatus.modalData.url} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            )}
            {type == 1 && (
              <div>
                <Input
                  value={modalStatus.modalData.url}
                  onChange={(e: any) =>
                    setModalStatus({
                      ...modalStatus,
                      modalData: {
                        ...modalStatus.modalData,
                        url: e.target.value,
                      },
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
