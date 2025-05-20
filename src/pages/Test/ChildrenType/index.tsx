import {ReactElement} from 'react'

type OnlyTitleSection = ReactElement<typeof TitleSection, typeof TitleSection>;

type ModuleProps = {
  children: OnlyTitleSection;
};

export function Module({children}: ModuleProps) {
  return <section>module:{children}</section>;
}

export function TitleSection({children}: any) {
  return (
    <section>{children}</section>
  );
}

export default () => {
  return (
    <div>
      <Module>
        <TitleSection>TitleSection</TitleSection>
      </Module>

      <Module>
        <div>Should error</div>
      </Module>

      {/*<Module>
        error
      </Module>*/}
    </div>
  )
}