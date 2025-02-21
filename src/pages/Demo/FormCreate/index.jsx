import {useState} from "react";
import Layout from './layout'
import ComponentBar from './components/ComponentBar'
import FormBar from './components/FormBar'
import PropertyBar from './components/PropertyBar'
import './index.scss'
import {FormContext} from "./contexts/FormContext";

export default () => {
  const [state, setState] = useState({
    layout: "horizontal",
    labelAlign: "right",
  })

  return (
    <FormContext.Provider value={{state, setState}}>
      <Layout
        leftRender={() => (<ComponentBar/>)}
        centerRender={() => (<FormBar/>)}
        rightRender={() => (<PropertyBar/>)}
      >
      </Layout>
    </FormContext.Provider>
  )
}