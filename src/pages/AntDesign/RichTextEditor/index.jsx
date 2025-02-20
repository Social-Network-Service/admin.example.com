import {Button} from 'antd';
import {useEffect, useRef} from "react";
import {createEditor, createToolbar} from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css'
import './index.scss'

export default function ButtonDemo() {
    const editorContainerRef = useRef(null);
    const toolbarContainerRef = useRef(null);

    useEffect(() => {
        const editorConfig = {
            placeholder: 'Type here...',
            onChange(editor) {
                const html = editor.getHtml()
                console.log('editor content', html)
                // 也可以同步到 <textarea>
            },
        }

        const editor = createEditor({
            selector: '#editor-container',
            html: '<p><br></p>',
            config: editorConfig,
            mode: 'default', // or 'simple'
        })

        const toolbarConfig = {
            excludeKeys: ["blockquote", "|", "group-more-style", "todo", "emotion", "insertLink", "group-video", "insertTable", "codeBlock", "divider", "fullScreen"]
        }

        const toolbar = createToolbar({
            editor,
            selector: '#toolbar-container',
            config: toolbarConfig,
            mode: 'default', // or 'simple'
        })
        console.log(toolbar.getConfig().toolbarKeys)
    }, [])

    return (
        <div id="editor—wrapper">
            <div ref={editorContainerRef} id="toolbar-container"></div>
            <div ref={toolbarContainerRef} id="editor-container"></div>
        </div>
    )
}