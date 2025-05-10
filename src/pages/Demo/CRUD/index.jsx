import {useRef, useState} from "react";
import {usePopup} from "@/hooks";
import {PageProvider} from './PageContext'
import Page from './Page'
import './index.scss'
import List from './List'
import Create from './Create'

export const PageEvent = {
  REFRESH_TABLE: 'refresh_table',
  CREATE_SHOW: 'create_show',
}

export default function Index() {
  return (
    <PageProvider>
      <List/>
      <Create/>
    </PageProvider>
  )
}
