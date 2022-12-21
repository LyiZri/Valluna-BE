import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { i18nChangeLanguage } from '@wangeditor/editor';
import React, { useState, useEffect } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
interface IProps {
  html: string;
  setHtml: Function;
  isExternal?: boolean
}
export default function ContentEditor({ html, setHtml, isExternal = false }: IProps) {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  i18nChangeLanguage('en');

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '...',
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  useEffect(() => {
    console.log(isExternal);

  }, [isExternal])
  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        {!isExternal ?
          <Editor
            defaultConfig={editorConfig}
            value={html}
            onCreated={setEditor}
            onChange={editor => {
              setHtml(editor.getHtml())
            }
            }
            mode="default"
            style={{ height: '500px', overflowY: 'hidden' }}
          /> : <textarea value={html} onChange={(e) => setHtml(e.target.value)} style={{ height: '500px', width: "100%", overflowY: 'auto' }}>

          </textarea>
        }
      </div>
      <div className='mt-8 p-8' style={{ background: "#f1f1f1" }} dangerouslySetInnerHTML={{ __html: html }}>
      </div>
    </>
  );
}
