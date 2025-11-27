import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className='min-h-screen'>
      <div className='flex'>

        {showSidebar && <Sidebar />}

        {/* Page Right Section */}
        <div className='flex-1 flex flex-col h-screen w-screen'>
          <Navbar />

          <main className='flex-1 overflow-y-auto p-4'>
            {children}
          </main>
        </div>

      </div>
    </div>
  )
}

export default Layout;
