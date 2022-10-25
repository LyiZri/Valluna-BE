import { uploadFile } from '@/service/file';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import { requestDataWrap } from '@/utils/request';
interface IProps {
  onSuccess: Function;
  defaultSrc?: string;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const FileUpload = ({ onSuccess, defaultSrc = '' }: IProps) => {
  const [loading, setLoading] = useState(false);
  console.log('imgurl========', defaultSrc);

  const [imageUrl, setImageUrl] = useState<string>(defaultSrc);

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      onSuccess(info.file.response.data.url);
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="file"
      //   defaultFileList={[{url:defaultSrc}]}
      data={(e) => {
        return requestDataWrap({});
      }}
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      action="/api/accounts/fileupload"
      onChange={handleChange}
    >
      {defaultSrc ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};

export default FileUpload;
