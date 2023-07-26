import { useState } from 'react'
import Header from '../common/Header'
import Sidebar from '../common/Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  const [menuToggle, setMenuToggle] = useState(false)
  return (
    <main className='flex transition-all duration-700 ease-in-out'>
      <nav
        className={`${
          menuToggle ? 'basis-0.5/12' : 'basis-2/12'
        } transition-all duration-700 ease-in-out`}
      >
        <Sidebar menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
      </nav>
      <section
        className={`${
          menuToggle ? 'basis-full' : 'basis-10/12'
        } transition-all duration-700 ease-in-out`}
      >
        <Header />
        <Outlet />
      </section>
    </main>
  )
}

export default MainLayout
