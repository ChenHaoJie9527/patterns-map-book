import { SidebarLayout } from "./components/ui/layout"

function App() {
  return (
    <SidebarLayout
      sidebar={
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">侧边栏</h2>
          <nav className="space-y-2">
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">菜单项 1</a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">菜单项 2</a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">菜单项 3</a>
          </nav>
        </div>
      }
    >
      <div>
        <h1 className="text-2xl font-bold mb-6">主要内容区</h1>
        <p className="text-gray-600">
          这是主要内容区域。您可以在这里放置任何内容。
        </p>
      </div>
    </SidebarLayout>
  )
}

export default App;
