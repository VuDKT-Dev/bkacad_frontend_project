import { useState } from 'react'
import CategoriesModal from '../Modal/CategoriesModal'
import UsersModal from '../Modal/UsersModal'
import { BsPlus } from 'react-icons/bs'

const Toolbar = ({ length, getData, apiString, userParam, setUserParam }) => {
  const [modalToggle, setModalToggle] = useState(false)

  return (
    <>
      <div className='w-full flex items-center justify-between px-6 py-1 my-1 border'>
        <p>Khóa {`(${length})`}</p>
        <button
          type='button'
          className=' text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 my-1 text-center py-2 flex gap-3 items-center'
          onClick={() => setModalToggle(!modalToggle)}
        >
          <BsPlus />
          Thêm mới
        </button>
      </div>
      {modalToggle
        ? (apiString !== 'user' && (
            <CategoriesModal
              setModalToggle={setModalToggle}
              apiString={apiString}
              getData={getData}
            />
          )) ||
          (apiString === 'user' && (
            <UsersModal
              apiString={apiString}
              setModalToggle={setModalToggle}
              getData={getData}
            />
          ))
        : null}
    </>
  )
}

export default Toolbar
