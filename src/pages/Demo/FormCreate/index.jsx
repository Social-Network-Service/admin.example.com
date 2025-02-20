import Layout from './layout'
import ComponentBar from './components/ComponentBar'
import FormBar from './components/FormBar'
import PropertyBar from './components/PropertyBar'
import './index.scss'

export default () => {
  return (
    <Layout
      leftRender={() => (<ComponentBar/>)}
      centerRender={() => (<FormBar/>)}
      rightRender={() => (<FormBar/>)}
      rightRender={() => (<PropertyBar/>)}
    />
  )
}