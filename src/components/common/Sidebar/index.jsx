import { useState } from 'react'
import { Link } from 'react-router-dom'

import iconQuantri from '../../../assets/images/icons/quantri.png'
import iconDanhmuc from '../../../assets/images/icons/danhmuc.png'
import iconDoan from '../../../assets/images/icons/doan.png'
import iconTochuc from '../../../assets/images/icons/tochuc.png'

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import ModalToggle from '../Modal/ModalToggle'

const Sidebar = ({ menuToggle, setMenuToggle }) => {
  const [toggleDanhMuc, setToggleDanhMuc] = useState(false)
  const [toggleDoAn, setToggleDoAn] = useState(false)

  const handleToggleDanhmuc = (e) => {
    e.preventDefault()
    setToggleDanhMuc(!toggleDanhMuc)
  }

  const handleToggleDoAn = (e) => {
    e.preventDefault()
    setToggleDoAn(!toggleDoAn)
  }

  const handleToggleMenu = (e) => {
    e.preventDefault()
    setToggleDanhMuc(false)
    setToggleDoAn(false)
    setMenuToggle(!menuToggle)
  }

  const handleAfterLinkActive = (toggle, setToggle) => {
    return setToggle(!toggle)
  }

  return (
    <div
      className={` ${
        menuToggle ? 'w-[70px] overflow-x-hidden' : 'w-full'
      }  h-screen  p-4 bg-white border-r-[1px] transition-all duration-700 ease-in-out`}
    >
      <div className='w-full h-16 mt-2 mb-8 transition-all duration-700 ease-in-out'>
        <img
          className={` rounded-full bg-gray-500  mx-auto ${
            menuToggle ? 'w-8 h-8' : 'w-16 h-16'
          }`}
        />
      </div>
      <div>
        <ul className='space-y-3 font-medium '>
          <li className='h-10 overflow-hidden'>
            <Link
              to='user'
              className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-500 hover:text-white'
            >
              <img src={iconQuantri} alt='Icon Quản trị thành viên' />
              <span className='flex-1 ml-7 text-left whitespace-nowrap'>
                Quản trị thành viên
              </span>
            </Link>
          </li>
          <li
            className={`${toggleDanhMuc ? 'h-full' : 'h-10'} overflow-hidden`}
          >
            <button
              type='button'
              className='flex items-center w-full p-2 text-gray-900 rounded-lg group hover:bg-blue-500 hover:text-white'
              onClick={handleToggleDanhmuc}
            >
              <img src={iconDanhmuc} alt='Icon Danh mục' />

              <span className='flex-1 ml-7 text-left whitespace-nowrap'>
                Danh mục
              </span>
              <svg
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            {menuToggle ? (
              toggleDanhMuc && (
                <ModalToggle className='absolute top-[170px] left-[72px] z-50 w-28 bg-slate-50 shadow-2xl rounded-md'>
                  <ul className='space-y-2'>
                    <li>
                      <Link
                        to='field'
                        className='flex items-center w-full p-2 text-gray-900 transition duration-75 mx-auto group hover:bg-blue-500 hover:text-white'
                        onClick={() =>
                          handleAfterLinkActive(toggleDanhMuc, setToggleDanhMuc)
                        }
                      >
                        Ngành nghề
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='course'
                        className='flex items-center w-full p-2 text-gray-900 transition duration-75  group hover:bg-blue-500 hover:text-white border-t-2 border-b-2'
                        onClick={() =>
                          handleAfterLinkActive(toggleDanhMuc, setToggleDanhMuc)
                        }
                      >
                        Khóa
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='class'
                        className='flex items-center w-full p-2 text-gray-900 transition duration-75   group hover:bg-blue-500 hover:text-white'
                        onClick={() =>
                          handleAfterLinkActive(toggleDanhMuc, setToggleDanhMuc)
                        }
                      >
                        Lớp
                      </Link>
                    </li>
                  </ul>
                </ModalToggle>
              )
            ) : (
              <ul className='py-2 pl-3 space-y-2'>
                <li>
                  <Link
                    to='field'
                    className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-500 hover:text-white'
                  >
                    Ngành nghề
                  </Link>
                </li>
                <li>
                  <Link
                    to='course'
                    className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-500 hover:text-white'
                  >
                    Khóa
                  </Link>
                </li>
                <li>
                  <Link
                    to='class'
                    className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-500 hover:text-white'
                  >
                    Lớp
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className={`${toggleDoAn ? 'h-full' : 'h-10'} overflow-hidden`}>
            <button
              type='button'
              className='flex items-center w-full p-2 text-gray-900 rounded-lg group hover:bg-blue-500 hover:text-white '
              onClick={handleToggleDoAn}
            >
              <img src={iconDoan} alt='Icon Đồ án' />

              <span className='flex-1 ml-7 text-left whitespace-nowrap'>
                Đồ án
              </span>
              <svg
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            {menuToggle ? (
              toggleDoAn && (
                <ModalToggle className='absolute top-[228px] left-[72px] z-50 w-28 bg-slate-50 shadow-2xl rounded-md'>
                  <ul className='space-y-2'>
                    <li>
                      <Link
                        to='field'
                        className='flex items-center w-full p-2 text-gray-900 transition duration-75 mx-auto group hover:bg-blue-500 hover:text-white'
                      >
                        Quản lý đợt
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='course'
                        className='flex items-center w-full p-2 text-gray-900 transition duration-75  group hover:bg-blue-500 hover:text-white border-t-2 border-b-2'
                      >
                        Kho đề tài
                      </Link>
                    </li>
                  </ul>
                </ModalToggle>
              )
            ) : (
              <ul className='py-2 pl-3 space-y-2'>
                <li>
                  <Link
                    to='quanlydot'
                    className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-500 hover:text-white'
                  >
                    Quản lý đợt
                  </Link>
                </li>
                <li>
                  <Link
                    to='khodetai'
                    className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-500 hover:text-white'
                  >
                    Kho đề tài
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              to='tochuc'
              className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-500 hover:text-white'
            >
              <img src={iconTochuc} alt='Icon Tổ chức' />
              <span className='flex-1 ml-7 whitespace-nowrap'>Tổ chức</span>
            </Link>
          </li>
        </ul>
      </div>
      <button
        className={`absolute bottom-5 bg-orange-300 transition-all duration-700 ease-in-out ${
          menuToggle
            ? 'left-0 w-[70px] pl-[25px]'
            : 'left-0 w-[240px] pl-[210px]'
        } border w-4 h-10`}
        onClick={handleToggleMenu}
      >
        {menuToggle ? <IoIosArrowForward /> : <IoIosArrowBack />}
      </button>
    </div>
  )
}

export default Sidebar
