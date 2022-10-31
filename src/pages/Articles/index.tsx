import SearchBar from '@/components/SearchBar';
import { IFormItem } from '@/types/form';
import { Button, Image, Select, Space, Switch, Table, Tabs, Tag } from 'antd';
import { useState } from 'react';

import { useEffect } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { timestampToTime } from '@/utils/format';
import IconFont from '@/components/IconFont';
import ContentCard from '@/components/ContentCard';
import { history, useModel } from 'umi';
import { getHPBannerList } from '@/service/homepage';
import { IArticles, IArticlesDraft } from '@/types/articles';
import {
  getArticlesList,
  editArticlesList,
  deleteArticlesList,
  changeArticlesListPublish,
} from '@/service/articles';
import { IGame } from '@/types/gameListing';
import { getGLOverviewList } from '@/service/gamelistings';
import { useForm } from 'antd/lib/form/Form';
interface ISearch {
  article_title?: string;
  glid?: string;
  featured?: number;
  article_status?: number;
  editstatus?: number;
}
export default function HomepageBanners() {
  let searchValue: ISearch = {
    article_title: '',
    game: '',
  };
  // const { gameInfo } = useModel('gameList');
  const { setAtInfo } = useModel('atInfo');
  const [list, setList] = useState<IArticles[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState({
    tableLoading: false,
    gameListLoading: false,
  });
  const [searchForm] = useForm();
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };
  const searchItem: IFormItem[] = [
    {
      name: 'article_title',
      type: 'input',
      col: 3,
      placeholder: 'Article Title',
    },
    {
      name: 'glid',
      type: 'game-groups',
      placeholder: 'Game',
      col: 6,
    },
    {
      name: 'status',
      type: 'status-groups',
      placeholder: 'Status',
    },
    {
      name: 'featured',
      type: 'featured-groups',
      placeholder: 'Featured',
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
    {
      name: '',
      type: '',
      col: 3,
      render: (
        <Button type="primary" onClick={() => onPublishStatusChange(3)}>
          Unpublish
        </Button>
      ),
    },
    {
      name: '',
      type: '',
      col: 3,
      render: (
        <Button type="primary" onClick={() => onPublishStatusChange(2)}>
          Publish
        </Button>
      ),
    },
    {
      name: '',
      type: '',
      col: 3,
      render: (
        <Button type="primary" onClick={() => onDelete()}>
          Delete
        </Button>
      ),
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
  ];
  const colums: ColumnsType<IArticles> = [
    {
      title: 'Article title',
      dataIndex: 'article_title',
      key: 'article_title',
      render: (_, { status, editstatus, article_title, draft }) => {
        if (status || editstatus == 2) {
          return <span>{article_title}</span>;
        } else {
          return <span>{draft.article_title}</span>;
        }
      },
    },
    {
      title: 'Side UTL',
      dataIndex: 'site_url',
      key: 'site_url',
    },
    {
      title: 'Game',
      dataIndex: 'games',
      key: 'games',
      render: (_, { status, games, draft, editstatus }) => {
        let _games = status || editstatus == 2 ? games : draft.games;
        return _games?.map((item: any, index) => {
          return (
            <Tag key={item.glid} color="orange">
              {item.game_name}
            </Tag>
          );
        });
        // return <span>{draft.games}</span>;
      },
    },
    {
      title: 'Total Views',
      dataIndex: 'total_views',
      key: 'total_views',
      render: () => {
        return <Tag color="cyan">-</Tag>;
      },
    },
    {
      title: 'Unique Views',
      dataIndex: 'unique_views',
      key: 'unique_views',
      render: () => {
        return <Tag color="cyan">-</Tag>;
      },
    },
    {
      title: 'Shares',
      dataIndex: 'shares',
      key: 'shares',
      render: () => {
        return <Tag color="cyan">-</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => {
        return <Tag color={!status ? 'orange' : 'green'}>{!status ? 'Draft' : 'Published'}</Tag>;
      },
    },
    {
      title: 'Edit Status',
      dataIndex: 'editstatus',
      key: 'editstatus',
      render: (_, { editstatus }) => {
        let editText = '',
          editColor = '';
        if (editstatus == 0) {
          editText = 'No Edit';
          editColor = 'red';
        } else if (editstatus == 1) {
          editText = 'Edited Unpublish';
          editColor = 'orange';
        } else if (editstatus == 2) {
          editText = 'Edited Published';
          editColor = 'green';
        }
        return <Tag color={editColor}>{editText}</Tag>;
      },
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      key: 'featured',
      render: (a, { status, featured }, index) => (
        <Switch
          checked={featured == 1}
          disabled={status == 0}
          onChange={() => onEnable(a, index)}
        ></Switch>
      ),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Operator',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: 'Last Edited',
      dataIndex: 'optime',
      key: 'optime',
      render: (_, { optime }) => <p>{timestampToTime(optime)}</p>,
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
              onPushBanner(record.atid, index);
            }}
            className="text-black text-xl cursor-pointer"
          />
          <IconFont
            type="icon-delete"
            onClick={() => {
              onDelete(index);
            }}
            className="text-black text-xl cursor-pointer"
          />
        </Space>
      ),
    },
  ];
  const getList = async () => {
    setLoading({ ...loading, tableLoading: true });
    const { data } = await getArticlesList({ ...searchValue });
    setList(data);
    setLoading({ ...loading, tableLoading: false });
  };
  const onEnable = async (a: boolean, index: number) => {
    const listCopy: IArticles[] = (list as IArticles[]).concat([]);
    listCopy[index].featured = Number(!Boolean(listCopy[index].featured));
    let _games: string[] = [];
    listCopy[index].games?.map((item: any, index) => {
      _games.push(item.glid);
    });
    const { code } = await editArticlesList({
      ...listCopy[index],
      action: 2,
      glids: _games,
      game_categorys: listCopy[index].categorys,
    });
    code == 1 && setList(listCopy);
  };
  const onPushBanner = (atid?: string, index = 0) => {
    index != undefined && setAtInfo((list as IArticles[])[index]);
    atid
      ? history.push(`/articels/airticle-form?atid=${atid}`)
      : history.push('/articels/airticle-form');
  };
  const onTabsChange = async (e: string) => {
    searchForm.resetFields();
    if (e == '0') {
      delete searchValue.article_status, delete searchValue.featured;
    } else if (e !== '3' && e !== '0') {
      searchValue = {
        ...searchValue,
        article_status: e == '1' ? 0 : e == '2' ? 1 : undefined,
      };
      delete searchValue.featured;
    } else {
      searchValue = {
        ...searchValue,
        featured: 1,
      };
      delete searchValue.article_status;
    }
    await getList();
  };
  const onDelete = async (index?: number) => {
    console.log(rowSelection);
    setLoading({
      ...loading,
      tableLoading: true,
    });
    const { code } = await deleteArticlesList({
      atids: index ? [list[index].atid] : rowSelection.selectedRowKeys,
    });
    setLoading({
      ...loading,
      tableLoading: false,
    });
    await getList();
  };
  /*
   * @type 2 publish 3 unpublish
   */
  const onPublishStatusChange = async (type: 2 | 3) => {
    setLoading({
      ...loading,
      tableLoading: true,
    });
    const { data } = await changeArticlesListPublish({
      atids: rowSelection.selectedRowKeys,
      action: type,
    });
    console.log(data);
    await getList();
  };
  const onSearch = async (e: any) => {
    searchValue = {
      ...searchValue,
      ...e,
      game: e.glid,
    };
    await getList();
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
          <Tabs
            defaultActiveKey="allarticles"
            onChange={onTabsChange}
            items={[
              {
                label: 'All Articles',
                key: '0',
              },
              {
                label: 'Drafts',
                key: '1',
              },
              {
                label: 'Published',
                key: '2',
              },
              {
                label: 'Featured',
                key: '3',
              },
            ]}
          />
          <SearchBar
            form={searchForm}
            className={'mb-4'}
            searchItem={searchItem}
            search={onSearch}
          />
          <Table
            rowSelection={rowSelection}
            rowKey={'atid'}
            loading={loading.tableLoading}
            columns={colums}
            dataSource={list}
          />
        </ContentCard>
      </section>
    </div>
  );
}
