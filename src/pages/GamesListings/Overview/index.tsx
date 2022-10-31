import SearchBar from '@/components/SearchBar';
import { IFormItem } from '@/types/form';
import { Button, Image, Space, Switch, Table, Avatar, Tag, message } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { timestampToTime } from '@/utils/format';
import IconFont from '@/components/IconFont';
import ContentCard from '@/components/ContentCard';
import { history, useModel } from 'umi';
import { IGame } from '@/types/gameListing';
import { LoadingOutlined } from '@ant-design/icons';
import {
  deleteGLOverviewItem,
  getGLOverviewList,
  editGLOverviewItem,
} from '@/service/gamelistings';
export default function GameListing() {
  const [searchValue, setSearchValue] = useState({});
  const [list, setList] = useState<IGame[]>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState({
    tableLoading: false,
    changePublishLoading: false,
  });
  const { setGlInfo } = useModel('glInfo');
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };
  const searchItem: IFormItem[] = [
    {
      name: 'game_name',
      type: 'input',
      col: 3,
      placeholder: 'Game Name',
    },
    // {
    //   name: 'chain',
    //   type: 'chain-groups',
    //   placeholder: 'Chain',
    // },
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
    {
      name: '',
      type: '',
      col: 3,
      render: (
        <Button type="primary" className="mr-4" onClick={() => onPushBanner()}>
          Create New Banner
        </Button>
      ),
    },
    {
      name: '',
      type: '',
      col: 3,
      render: (
        <Button type="primary" className="mr-4" onClick={() => onPublishStatusChange(0)}>
          Unpublish
        </Button>
      ),
    },
    {
      name: '',
      type: '',
      col: 3,
      render: (
        <Button type="primary" className="mr-4" onClick={() => onPublishStatusChange(1)}>
          Publish
        </Button>
      ),
    },
    {
      name: '',
      type: '',
      col: 3,
      render: <Button type="primary">Change Order</Button>,
    },
  ];
  const colums: ColumnsType<IGame> = [
    {
      title: 'Game Name ',
      dataIndex: 'game_name',
      key: 'game_name',
    },
    {
      title: 'Site URL',
      dataIndex: 'surl',
      key: 'srul',
    },
    {
      title: 'Chain',
      dataIndex: 'game_blockchain',
      key: 'game_blockchain',
      render: (_, { game_blockchain }) => {
        // return (
        //   <Avatar.Group>
        //     {game_blockchain?.map((item: number, index: number) => {
        //       const chainValue = getChainValue(item);
        //       if (index < 2 || (index == 2 && game_blockchain.length == 3)) {
        //         return <Avatar src={chainValue.imageUrl} key={chainValue.id} size={24} />;
        //       } else if (index == 2 && game_blockchain.length > 3) {
        //         return (
        //           <Avatar key={chainValue.id} size={24}>
        //             +{game_blockchain.length - 2}
        //           </Avatar>
        //         );
        //       } else {
        //         return;
        //       }
        //     })}
        //   </Avatar.Group>
        // );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => {
        if (status == 0) {
          return <Tag color="gold">Draft</Tag>;
        } else {
          return <Tag color="cyan">Publish</Tag>;
        }
      },
    },
    {
      title: 'Edit Status',
      dataIndex: 'editstatus',
      key: 'editstatus',
      render: (_, { editstatus }) => {
        if (editstatus == 0) {
          return <Tag>Unpublished Changes</Tag>;
        } else {
          return <Tag>Up to Date</Tag>;
        }
      },
    },
    {
      title: 'Operator',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: 'Last Edited',
      dataIndex: 'endEditedDate',
      key: 'endEditedDate',
      render: (_, { lastEditedDate }) => {
        return <p>{timestampToTime(lastEditedDate)}</p>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 180,
      render: (_, record, index) => (
        <Space size="middle">
          {loading.changePublishLoading ? (
            <LoadingOutlined />
          ) : (
            <IconFont
              type={record.status == 1 ? 'icon-unsee' : 'icon-see'}
              className="text-black text-xl cursor-pointer"
              onClick={() => onPublishStatusChange(record.status, [index])}
            />
          )}
          <IconFont
            type="icon-bianji"
            onClick={() => {
              onPushBanner(record.glid, index);
            }}
            className="text-black text-xl cursor-pointer"
          />
          <IconFont
            type="icon-delete"
            onClick={() => onDelete(record.glid as string, index)}
            className="text-black text-xl cursor-pointer"
          />
        </Space>
      ),
    },
  ];
  const getList = async () => {
    setLoading({ ...loading, tableLoading: true });
    const res = await getGLOverviewList({ page: 1, size: 10 });

    let _list: IGame[] = [];
    if (res.code != 1) {
      setLoading({ ...loading, tableLoading: false });
      return;
    }
    res.data.map((item: any, index: number) => {
      _list.push({
        glid: item.glid,
        // game_name: item.draft.game_name,
        surl: item?.draft?.official_links?.website,
        // game_blockchain: item.draft.game_blockchain,
        status: item.status,
        operator: item.operator,
        lastEditedDate: item.time,
        ...item.draft,
      });
    });
    console.log(_list);

    // debugger;
    setList(_list);

    setLoading({ ...loading, tableLoading: false });
  };

  //change Public Status
  const onPublishStatusChange = async (status = 0, statusArr = [-1]) => {
    setLoading({
      ...loading,
      tableLoading: true,
      changePublishLoading: true,
    });
    console.log({ status, statusArr });
    const _list = (list as IGame[]).concat([]);
    if (statusArr[0] == -1 && statusArr.length == 1) {
      const isStatusUnify = selectedRowKeys.every((item: React.Key, _) => {
        return _list[(item as number) - 1].status == status;
      });
      if (isStatusUnify) {
        selectedRowKeys.map((item: React.Key, _) => {
          _list[(item as number) - 1].status = Number(!status);
        });
      }
    } else {
      statusArr.map(async (item: number, _) => {
        console.log({
          ..._list[item],
          action: status == 0 ? 2 : 0,
        });

        const data = await editGLOverviewItem({
          ..._list[item],
          action: status == 0 ? 2 : 0,
        });
        _list[item].status = Number(!status);
      });
    }
    setList(_list);
    setLoading({
      ...loading,
      tableLoading: false,
      changePublishLoading: false,
    });
  };
  const onDelete = async (glid: string, index: number) => {
    setLoading({
      ...loading,
      tableLoading: true,
    });
    const res = await deleteGLOverviewItem({ glid });
    if (res.code == 0) {
      const _list = list?.concat([]);
      _list?.splice(index, 1);
      setList(_list);
    } else {
    }
    setLoading({
      ...loading,
      tableLoading: false,
    });
  };
  const onPushBanner = (glid?: string, index = 0) => {
    console.log(index);

    index != undefined && setGlInfo((list as IGame[])[index]);
    glid
      ? history.push(`/games-listings/game-listings-form?glid=${glid}`)
      : history.push('/games-listings/game-listings-form');
  };
  const onSearch = (e: any) => {
    setSearchValue(e);
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
          <Table
            rowSelection={rowSelection}
            rowKey={'glid'}
            loading={loading.tableLoading}
            columns={colums}
            dataSource={list}
          />
        </ContentCard>
      </section>
    </div>
  );
}
