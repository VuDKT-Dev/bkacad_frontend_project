import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img1 from '../assets/images/1.png'
import img2 from '../assets/images/2.png'

import Toast from '../components/common/Toast'

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [loginToast, setLoginToast] = useState(false)

  const navigate = useNavigate()

  const handleLoginToggle = () => {
    setIsLogin(!isLogin)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `https://training.bks.center/api/auth/login?password=${password}&username=${username}`
      )
      if (res) {
        const { token, status } = res.data
        localStorage.setItem('accessToken', token)
        if (status !== 200) {
          setIsSuccess(true)
          setLoginToast(false)
          setTimeout(() => {
            setIsSuccess(false)
          }, 2000)
        } else {
          setIsSuccess(true)
          setLoginToast(true)
          setTimeout(() => {
            navigate('/admin')
          }, 1000)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      {isSuccess && <Toast loginToast={loginToast} isSuccess={isSuccess} />}
      <div className='flex h-screen'>
        <div className='basis-2/12 px-10 pt-10'>Quản lý đồ án</div>
        <div className='basis-5/12 flex flex-col items-center justify-center'>
          {isLogin ? (
            <div className='flex flex-col gap-4'>
              <h1 className='text-4xl text-center font-semibold uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-300'>
                Đồ án
              </h1>
              <h2 className='mb-4 text-2xl uppercase font-extrabold leading-none tracking-tight text-gray-900 '>
                Quản lý trường Cao đẳng, Đại học
              </h2>
              <button
                type='button'
                className='text-white mx-auto bg-blue-700 hover:bg-blue-300 font-medium rounded-lg text-sm w-2/3 py-3 text-center inline-flex items-center justify-center'
                onClick={handleLoginToggle}
              >
                Bắt đầu
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 ml-2 -mr-1'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
            </div>
          ) : (
            <form className='w-1/2'>
              <div className='mb-6'>
                <label
                  htmlFor='username'
                  className='block mb-2 text-md font-medium text-gray-900'
                >
                  Tài khoản
                </label>
                <input
                  type='text'
                  id='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                  placeholder=' Tài khoản'
                  required
                />
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='password'
                  className='block mb-2 text-md font-medium text-gray-900'
                >
                  Mật khẩu
                </label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  `}
                  placeholder='Mật khẩu'
                  required
                />
              </div>

              <button
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-300 font-medium rounded-lg text-sm w-full py-3 text-center inline-flex items-center justify-center'
                onClick={handleLogin}
              >
                Đăng nhập
              </button>
            </form>
          )}
        </div>
        <div className='basis-5/12 relative'>
          <img src={img1} alt='Anh 1' className='absolute top-0 right-0' />
          <img src={img2} alt='Anh 2' className='absolute bottom-0 left-0' />
        </div>
      </div>
    </>
  )
}

export default HomePage
