import {useState, useContext} from "react";
import {Tabs, Form, Button, Input, Radio, Modal} from 'antd';
import {PageContext} from "../contexts/PageContext";
import {parse} from '@babel/parser'
import Clipboard from 'clipboard'
import {saveAs} from 'file-saver'

function makeUpJs(formConfig, formItemConfig) {
  const formItems = formItemConfig.reduce((accumulator, currentValue) => {
    return accumulator + `
                    <div>
                    ${currentValue.tag}
                    </div>
                    `
  }, '')

  return `
                  export default ()=>{
                    return (
                      <div>
                        ${formItems}
                      </div>
                    )
                  }

                  `
}

async function checkClipboardPermission() {
  if (navigator.permissions) {
    const permissionStatus = await navigator.permissions.query({name: 'clipboard-write'});
    if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
      return true;
    }
  }
  return false;
}

async function copyTextWithPermission(text) {
  const hasPermission = await checkClipboardPermission();
  if (hasPermission) {
    await navigator.clipboard.writeText(text);
    alert('jsx代码已复制到剪贴板');
  } else {
    alert('没有获得剪贴板写入权限');
  }
}

export default function HeaderBar() {
  const {state: {formConfig, formItemConfig}} = useContext(PageContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='header-bar'>
      <Button size='small' type='primary'
              onClick={() => {
                showModal()
              }}>
        查看JSON
      </Button>

      <Button size='small' type='primary' onClick={() => {
        let fileName = prompt("请输入导出的文件名！", '未命名');
        if (fileName) {
          const jsCodeStr = JSON.stringify(formItemConfig, null, 2);
          const blob = new Blob([jsCodeStr], {type: 'text/plain;charset=utf-8'})
          saveAs(blob, `${fileName}.json`)
        }
      }}>
        导出JSON
      </Button>
      <Button size='small' type='primary'
              onClick={() => {
                const jsCodeStr = makeUpJs(formConfig, formItemConfig);
                copyTextWithPermission(jsCodeStr)
              }}>
        复制jsx代码
      </Button>
      <Button size='small' type='primary'
              onClick={() => {
                let fileName = prompt("请输入导出的文件名！", '未命名');
                if (fileName) {
                  const jsCodeStr = makeUpJs(formConfig, formItemConfig);
                  const blob = new Blob([jsCodeStr], {type: 'text/plain;charset=utf-8'})
                  saveAs(blob, `${fileName}.jsx`)
                }
              }}>
        导出jsx文件
      </Button>

      <Modal title="JSON内容" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p id='editorJson' style={{whiteSpace: 'pre'}}>
          {JSON.stringify(formItemConfig, null, 2)}
        </p>
      </Modal>

    </div>
  )
}