import {useState, useRef} from 'react'
import List from './List'
import Create from './Create'
import {usePage} from "./PageContext";

export default function Page() {
  const state = usePage();

  return (
    <div className='crud-page'>
      <List/>

      <Create visible={state.createVisible}/>
    </div>
  )
}
