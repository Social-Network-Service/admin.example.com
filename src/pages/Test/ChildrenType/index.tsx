import React, {ReactElement, ComponentProps, ReactNode} from 'react'

// 方法一：使用 JSX.Element 并检查 type
type ModuleProps = {
  children: ReactElement<any, typeof TitleSection>;
};

// 方法二：使用自定义类型检查函数
function isTitleSection(child: ReactNode): child is ReactElement<any> {
  return React.isValidElement(child) && child.type === TitleSection;
}

export function Module({children}: ModuleProps) {
  // 可以在运行时也进行检查
  if (!isTitleSection(children)) {
    console.error('Module children must be TitleSection');
  }

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

      {/* <Module>
        error
      </Module> */}
    </div>
  )
}