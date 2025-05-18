export default function Layout({headerRender, leftRender, centerRender, rightRender}) {
  return (
    <section className="layout">
      {
        headerRender && (<header className="header">
          {headerRender()}
        </header>)
      }
      <main className="main">
        {
          leftRender && (<div className="left">
            {leftRender()}
          </div>)
        }
        {
          centerRender && (<div className="center">
            {centerRender()}
          </div>)
        }

        {
          rightRender && (<div className="right">
            {rightRender()}
          </div>)
        }
      </main>
    </section>
  )
}