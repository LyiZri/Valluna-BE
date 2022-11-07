import ContentCard from '@/components/ContentCard';
import ContentHeader from '@/components/ContentHeader';
import { ICategories, IMedia, IGame } from '@/types/gameListing';
import { Form, Input, Select, message, Modal, Button, Switch, Radio } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { useModel } from 'umi';
import ContentEditor from '@/components/ContentEditor';
import { history } from 'umi';
import FileUpload from '@/components/FileUpload';
import { getCategoryList, getGLOverviewList } from '@/service/gamelistings';
import { addArticlesList, editArticlesList } from '@/service/articles';
import { IArticles, IArticlesDraft } from '@/types/articles';
import { useForm } from 'antd/lib/form/Form';

interface IProps {
  match: any;
  location: any;
}

export default function BannerForm({ match, location }: IProps) {
  const [imageUrl, setImageUrl] = useState<string>();
  const [richText, setRichText] = useState('');
  const [loading, setLoading] = useState({
    imageLoading: false,
    categoriesListLoding: false,
    finishLoading: false,
  });
  const [form] = useForm();
  //0 is draft 1 is publish
  const [saveStatus, setSaveStatus] = useState(0);
  const { atInfo } = useModel('atInfo');
  const [formValue, setFormValue] = useState<IArticlesDraft | IArticles>();
  const [categoryList, setCategoryList] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [gameDefalutList, setGameDefalutList] = useState<string[]>([]);
  let atid = location.query.atid;
  const [isUpdated, setIsUpdated] = useState<any>(() => {
    if (atid) {
      return true;
    } else {
      return false;
    }
  });
  const onFinish = async (e: any) => {
    setLoading({
      ...loading,
      finishLoading: true,
    });
    const finishData = {
      ...e,
      article_img: imageUrl,
      content: richText,
    };
    console.log({
      ...finishData,
      article_img: imageUrl,
      action: saveStatus ? 2 : 0,
      featured: formValue?.featured ? formValue.featured : 0,
      atid,
      glids: finishData?.glids ? finishData.glids : gameDefalutList,
      game_categorys: finishData?.game_categorys ? finishData.game_categorys : formValue?.categorys,
    });

    try {
      const data = isUpdated
        ? await editArticlesList({
            ...finishData,
            article_img: imageUrl,
            action: saveStatus ? 2 : 0,
            featured: formValue?.featured ? formValue.featured : 0,
            atid,
            glids: finishData?.glids ? finishData.glids : gameDefalutList,
            game_categorys: finishData?.game_categorys
              ? finishData.game_categorys
              : formValue?.categorys,
          })
        : await addArticlesList({
            ...formValue,
            ...finishData,
            action: saveStatus ? 2 : 0,
            featured: 0,
          });
      console.log(data);
      if (data.code == 1) {
        message.success('Success!');
      }
    } catch (error) {}
    setLoading({
      ...loading,
      finishLoading: false,
    });
  };
  const getList = async () => {
    setLoading({
      ...loading,
      categoriesListLoding: true,
    });
    const { data: categoryData } = await getCategoryList({});
    const { data: gameData } = await getGLOverviewList({});
    setCategoryList(categoryData);
    setGameList(gameData);
    setLoading({
      ...loading,
      categoriesListLoding: false,
    });
  };

  useEffect(() => {
    if (isUpdated) {
      let _atInfo = atInfo?.status == 1 || atInfo?.editstatus == 2 ? atInfo : atInfo?.draft;
      setFormValue(_atInfo);
      setImageUrl(_atInfo?.article_img);
      setRichText(_atInfo?.content ? _atInfo?.content : '');
      let _gamelist: string[] = [];
      _atInfo?.games?.map((item: any, index) => {
        _gamelist.push(item.glid);
      });
      setGameDefalutList(_gamelist);
    } else {
      setFormValue(undefined);
    }
  }, [atInfo]);
  useEffect(() => {
    getList();
    // return setFormValue(undefined);
  }, []);
  return (
    <ContentCard>
      <ContentHeader
        label={isUpdated ? `Updated a Game Listing:  ${atid}` : 'Create a Game Listing'}
      />
      <div>
        {(!isUpdated || formValue) && (
          <Form
            form={form}
            initialValues={formValue}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 12 }}
            labelAlign="left"
            onFinish={onFinish}
          >
            <Form.Item required label="Article Name" name="article_title">
              <Input
                defaultValue={isUpdated ? formValue?.article_title : ''}
                placeholder="please Iinput your Article name"
              ></Input>
            </Form.Item>
            <Form.Item required label="Article Image">
              <FileUpload
                defaultSrc={imageUrl}
                onSuccess={(e: string) => {
                  setImageUrl(e);
                }}
              />
            </Form.Item>
            <Form.Item required label="Game" name="glids">
              <Select
                mode="multiple"
                defaultValue={gameDefalutList}
                loading={loading.categoriesListLoding}
              >
                {gameList.map((item: IGame, index: number) => {
                  if (item.status == 0) return;
                  if (item.editstatus == 0 && item.draft.game_name) {
                    return (
                      <Select.Option key={item.glid} value={item.glid}>
                        <p>{item.draft.game_name}</p>
                      </Select.Option>
                    );
                  } else {
                    console.log('item============', { item, gameDefalutList });
                    return (
                      <Select.Option key={item.game_name} value={item.glid}>
                        <p>{item.game_name}</p>
                      </Select.Option>
                    );
                  }
                })}
              </Select>
            </Form.Item>
            <Form.Item required label="Game Category" name={'game_categorys'}>
              <Select
                mode="multiple"
                defaultValue={formValue?.categorys}
                loading={loading.categoriesListLoding}
              >
                {categoryList.map((item: ICategories, index: number) => {
                  return (
                    <Select.Option key={index} value={item.name}>
                      <p>{item.name}</p>
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item required label="Article">
              <ContentEditor html={richText} setHtml={setRichText} />
            </Form.Item>
            <Form.Item>
              <Button onClick={history.goBack}>Cancel</Button>
              <Button
                onClick={() => {
                  setSaveStatus(0);
                  form.submit();
                }}
                style={{ backgroundColor: 'orange', color: '#fff' }}
                className="ml-8"
              >
                Save as Draft
              </Button>
              <Button
                onClick={() => {
                  setSaveStatus(1);
                  form.submit();
                }}
                type="primary"
                className="ml-8"
              >
                Pubilish
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </ContentCard>
  );
}
