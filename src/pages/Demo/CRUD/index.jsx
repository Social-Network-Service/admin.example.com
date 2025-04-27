import {useRef, useState} from "react";
import {usePopup} from "@/hooks";
import List from './List'
import Create from './Create'
import './index.scss'

export default () => {
  const actionRef = useRef(null)
  const [currentRow, setCurrentRow] = useState(null)
  const {visible, setVisible, show} = usePopup({visible: true})

  return (
    <div className='crud-page'>
      <List/>

      <Create
        visible={visible}
        setVisible={setVisible}
        data={currentRow}
        actionRef={actionRef}
      />
    </div>
  )
}
