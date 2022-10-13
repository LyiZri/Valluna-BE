import ContentCard from '@/components/ContentCard';
import ContentHeader from '@/components/ContentHeader';
import { chainValueList, IChainValue } from '@/types/chainType';
import { categoriesList, ICategories, IMedia } from '@/types/gameListing';
import { beforeUpload, getBase64 } from '@/utils/file';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Select, Upload, UploadProps } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';
import { useState } from 'react';
import { useEffect } from 'react';
import { history } from 'umi';
import axios from 'axios';
import OfficialLinks from './components/OfficialLinks';
import { IDynamicUrlItem } from '../../../types/form';
import ContentEditor from '@/components/ContentEditor';
import { getCoinPriceList } from '../../../service/other';
import TokenTicker from './components/TokenTicker';
import Media from './components/Media';

interface IProps {
  match: any;
  location: any;
}

export default function BannerForm({ match, location }: IProps) {
  const [imageUrl, setImageUrl] = useState<string>();
  const [richText, setRichText] = useState('');
  const [loading, setLoading] = useState({
    imageLoading: false,
  });
  const [officialLinksList, setOfficialLinksList] = useState<IDynamicUrlItem[]>([
    {
      name: 'whitepaper',
      url: '',
    },
  ]);
  const [addMediaList, setAddMediaList] = useState<IDynamicUrlItem[]>([
    {
      name: 'Telegram',
      url: '',
    },
    {
      name: 'Reddit',
      url: '',
    },
    {
      name: 'Medium',
      url: '',
    },
  ]);
  const [dowloadLinks, setDownloadList] = useState<IDynamicUrlItem[]>([
    {
      name: 'PC',
      url: '',
    },
    {
      name: 'Android',
      url: '',
    },
    {
      name: 'IOS',
      url: '',
    },
  ]);
  const [mediaList, setMediaList] = useState<IMedia[]>([]);
  const [priceList, setPriceList] = useState([]);
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
  const getPrice = async () => {
    const res = await getCoinPriceList({
      page: 1,
      type: -1,
      pagesize: 100,
      web: 1,
    });
    // const list = await axios.get(
    //   'https://dncapi.moveft.com/api/coin/web-coinrank?page=1&type=-1&pagesize=100&webp=1',
    // );
    if (res.code == 200) {
      setPriceList(res.data);
    }
  };
  const onFinish = async (e: any) => {
    console.log(e);
  };
  useEffect(() => {
    getPrice();
  }, []);
  return (
    <ContentCard>
      <ContentHeader
        label={isUpdated ? `Updated a Game Listing:  ${bname}` : 'Create a Game Listing'}
      />
      <div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          labelAlign="left"
          onFinish={onFinish}
        >
          <Form.Item required label="Game Name" name="bname">
            <Input placeholder="please Iinput your Game name"></Input>
          </Form.Item>
          <Form.Item required label="Game Image" name="image">
            <Upload
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
          <Form.Item required label="Game Description" name={'gamedes'}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item required label="Blockchain" name={'chainlist'}>
            <Select
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
          <Form.Item required label="Game Category" name={'gamecate'}>
            <Select>
              {categoriesList.map((item: ICategories, index: number) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    <p>{item.name}</p>
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item required label="Media">
            <Media list={mediaList} setList={setMediaList} />
          </Form.Item>
          <Form.Item required label="Official Links">
            <div>
              <OfficialLinks list={officialLinksList} setList={setOfficialLinksList} />
              <Button type="primary">Add</Button>
            </div>
          </Form.Item>
          <Form.Item required label="Additional Media">
            <OfficialLinks list={addMediaList} setList={setAddMediaList} />
          </Form.Item>
          <Form.Item required label="Additional Game Summary">
            <ContentEditor html={richText} setHtml={setRichText} />
          </Form.Item>
          <Form.Item required label="Token Ticker" name={'token'}>
            {/* <TokenTicker /> */}
            <Select mode="multiple">
              {priceList?.map((item: any, index) => {
                return (
                  <Select.Option value={item.name} key={item.code}>
                    <div className="flex justify-between">
                      <p>
                        <Avatar src={item.logo} className="mr-4" size={16} />
                        <span>{item.name}</span>
                      </p>
                      <p>{item.current_price_usd}USDT</p>
                    </div>
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item required label="Download Links">
            <OfficialLinks list={dowloadLinks} setList={setDownloadList} />
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
