import ContentCard from '@/components/ContentCard';
import ContentHeader from '@/components/ContentHeader';
import { beforeUpload, getBase64 } from '@/utils/file';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, UploadProps } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';
import { useState } from 'react';
import { useEffect } from 'react';
import { history } from 'umi';

interface IProps {
  match: any;
  location: any;
}

export default function BannerForm({ match, location }: IProps) {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState({
    imageLoading: false,
  });
  let bname = location.query.bname;
  const [isUpdated, setIsUpdated] = useState(() => {
    if (bname) {
      return true;
    } else {
      return false;
    }
  });
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading({ ...loading, imageLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        console.log(url);

        setLoading({ ...loading, imageLoading: false });
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading.imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <ContentCard>
      <ContentHeader
        label={isUpdated ? `Updated Homepage Banner:  ${bname}` : 'Create a new Homepage Banner'}
      />
      <div>
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 12 }} labelAlign="left">
          <Form.Item required label="Banner Name" name="bname">
            <Input placeholder="please Iinput your Banner name"></Input>
          </Form.Item>
          <Form.Item required label="Banner Upload" name="image">
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item required label="URL" name="url">
            <Input placeholder="URL"></Input>
          </Form.Item>
          <Form.Item>
            <Button onClick={history.goBack}>Cancel</Button>
            <Button htmlType="submit" type="primary" className="ml-8">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ContentCard>
  );
}
