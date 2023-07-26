import imgVN from '../../../assets/images/vietnam.png'
import avatar from '../../../assets/images/avatar.png'

import { BsBellFill } from 'react-icons/bs'
import { IoIosLogOut } from 'react-icons/io'
import { useState } from 'react'
import MenuToggle from '../Modal/ModalToggle'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [showMenuInfo, setShowMenuInfo] = useState(false)
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate('/')
    localStorage.clear()
  }
  return (
    <header>
      <div className='container flex items-center justify-between px-6 py-8'>
        <h3 className='text-xl font-semibold whitespace-nowrap'>
          Trường Đại học A
        </h3>
        <div className='flex items-center'>
          <button className='rounded-full cursor-pointer'>
            <img src={imgVN} alt='viet-lang' />
          </button>
          <button className='mx-4 rounded-full cursor-pointer'>
            <BsBellFill fill='#aaa' />
          </button>
          <button
            className='w-8 h-8 mr-10 rounded-full cursor-pointer border relative'
            onClick={() => setShowMenuInfo(!showMenuInfo)}
          >
            <img src={avatar} alt='Avatar' />
            {showMenuInfo && (
              <MenuToggle className='absolute w-[260px] bg-gray-50 shadow-2xl top-10 -right-3 z-50'>
                <div className='flex flex-col gap-3 items-center'>
                  <img
                    src={avatar}
                    alt='Avatar'
                    className='w-[70px] h-[70px] rounded-full object-cover'
                  />
                  <p className='text-base font-medium capitalize'>
                    Nguyễn Văn A
                  </p>
                  <button className='px-2 py-1 border mb-5'>
                    Quản lý tài khoản
                  </button>
                </div>
                <div className='flex items-center border-t'>
                  <IoIosLogOut className='ml-6 w-5 h-5' />
                  <button className='px-4 py-4' onClick={handleLogout}>
                    {' '}
                    Đăng xuất
                  </button>
                </div>
              </MenuToggle>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
