import Layout from './layout'
import NavigationBar from './components/NavigationBar'
import ComponentBar from './components/ComponentBar'
import FormBar from './components/FormBar'
import PropertyBar from './components/PropertyBar'
import {PageProvider} from "./contexts/PageContext";
import './index.scss'

export default function FormCreate() {
  return (
    <PageProvider>
      <Layout
        headerRender={() => (<NavigationBar/>)}
        leftRender={() => (<ComponentBar/>)}
        centerRender={() => (<FormBar/>)}
        rightRender={() => (<PropertyBar/>)}
      >
      </Layout>
    </PageProvider>
  )
}