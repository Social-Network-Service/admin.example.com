import {ReactElement} from 'react'
import './index.scss'

type OnlyTitleSection = ReactElement<typeof TitleSection, typeof TitleSection>;

type ModuleProps = {
  children: OnlyTitleSection;
};

export function Module({children}: ModuleProps) {
  return <section>module:{children}</section>;
}

export function TitleSection() {
  return (
    <section>TitleSection</section>
  );
}

export default () => {
  return (
    <div className='mark-image-page'>
      Mark Image

      <Module>
        <div>Should error</div>
      </Module>

      {/*<Module>
        Should
      </Module>*/}
    </div>
  )
}