import SearchBar from '@/components/SearchBar';
import { IFormItem } from '@/types/form';
import { Button, Image, Space, Switch, Table, message } from 'antd';
import { useState } from 'react';
import { IBanners } from '../../../types/homepage';
import { useEffect } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { timestampToTime } from '@/utils/format';
import IconFont from '@/components/IconFont';
import ContentCard from '@/components/ContentCard';
import { history, useModel } from 'umi';
import { deleteHPBannerList, getHPBannerList, editHPBannerList } from '@/service/homepage';
import { LoadingOutlined } from '@ant-design/icons';
import ContentMoveTable from '@/components/ContentMoveTable';
import { useUserAuth } from '@/utils/user';
export default function HomepageBanners() {
  const [list, setList] = useState<IBanners[]>();
  const [loading, setLoading] = useState({
    tableLoading: false,
    deleteLoading: false,
    deleteIndex: -1,
  });
  const haveAuth = useUserAuth('Homepage');
  const { setBannerInfo } = useModel('bannerInfo');
  const searchItem: IFormItem[] = [
    {
      name: 'banner_name',
      type: 'input',
      col: 3,
      placeholder: 'Banner Name',
    },
    {
      name: 'enable',
      type: 'enable-groups',
      placeholder: 'Enable Status',
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
    {
      name: 'col',
      type: 'col',
      col: 3,
    },
    haveAuth
      ? {
          name: '',
          type: '',
          col: 3,
          render: (
            <Button type="primary" className="mr-4" onClick={() => onPushBanner()}>
              Create New Banner
            </Button>
          ),
        }
      : {},
    haveAuth
      ? {
          name: '',
          type: '',
          col: 3,
          render: (
            <Button onClick={() => onChangeOrder()} type="primary">
              Change Order
            </Button>
          ),
        }
      : {},
  ];
  const colums: ColumnsType<IBanners> = [
    {
      title: 'Banner Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image Preview',
      dataIndex: 'image',
      key: 'image',
      render: (_, { file }) => <Image src={file} width={200} height={50} />,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (_, { url }) => {
        return (
          <Button type="link" onClick={() => window.open(url)}>
            {url}
          </Button>
        );
      },
    },
    {
      title: 'Enable',
      dataIndex: 'enable',
      key: 'enable',
      render: (a, record, index) => (
        <Switch
          checked={record.enable === 1}
          disabled={!haveAuth}
          onChange={() => onEnable(a, record, index)}
        ></Switch>
      ),
    },
    {
      title: 'Creation Date',
      dataIndex: 'optime',
      key: 'optime',
      render: (_, { optime }) => <p>{timestampToTime(optime as string)}</p>,
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
                  onPushBanner(record);
                }}
                className="text-black text-xl cursor-pointer"
              />
              {loading.deleteLoading && loading.deleteIndex == index ? (
                <LoadingOutlined />
              ) : (
                <IconFont
                  type="icon-delete"
                  onClick={() => {
                    onDelete(record.bid, index);
                  }}
                  className="text-black text-xl cursor-pointer"
                />
              )}
            </Space>
          ),
        }
      : {},
  ];
  const getList = async (searchValue = {}) => {
    setLoading({ ...loading, tableLoading: true });
    const { data } = await getHPBannerList({ ...searchValue });
    setList(data);
    setLoading({ ...loading, tableLoading: false });
  };
  const onEnable = async (a: boolean, e: IBanners, index: number) => {
    const listCopy: IBanners[] = list ? (list as IBanners[]).concat([]) : [];
    listCopy[index].enable = Number(!Boolean(listCopy[index].enable));
    setList(listCopy);
  };
  const onPushBanner = (record?: IBanners) => {
    record ? setBannerInfo(record) : setBannerInfo(undefined);
    record
      ? history.push(`/homepage/banner-form?bid=${record.bid}`)
      : history.push('/homepage/banner-form');
  };
  const onSearch = async (e: any) => {
    await getList(e);
  };
  const onChangeOrder = async () => {
    list?.map(async (item, index) => {
      if (item.order == index) {
        return;
      } else {
        await editHPBannerList({
          ...list[index],
          order: index,
        });
      }
    });
    message.success('Change Success');
  };
  const onDelete = async (bid: number, index: number) => {
    setLoading({
      ...loading,
      deleteLoading: true,
      deleteIndex: index,
    });
    const _list = list ? list?.concat([]) : [];
    const { code } = await deleteHPBannerList({ bid });
    if (code == 1) {
      _list?.splice(index, 1);
      setList(_list);
      message.success('Success Deleted');
    }
    setLoading({
      ...loading,
      deleteLoading: false,
      deleteIndex: -1,
    });
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="p-8">
      <section>
        <div className="text-2xl font-semibold w-full text-left pb-4 border-b border-gray-500">
          Homepage Banner
        </div>
        <p className="text-md">
          Create and set the display order for Banners on the homepage. Maximum X banners can be
          enabled to be displayed on the site
        </p>
      </section>
      <section>
        <ContentCard>
          <SearchBar className={'mb-4'} searchItem={searchItem} search={onSearch} />
          <ContentMoveTable
            loading={loading.tableLoading}
            order="bid"
            setList={setList}
            columns={colums}
            rowkey="bid"
            list={list ? list : []}
          />
        </ContentCard>
      </section>
    </div>
  );
}
