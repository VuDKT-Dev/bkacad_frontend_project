const Toast = ({ loginToast, isSuccess }) => {
  return (
    <div
      className={`fixed ${
        isSuccess ? 'top-4 opacity-100' : '-top-full opacity-0'
      } left-1/2 -translate-x-1/2`}
    >
      <div
        className='flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800'
        role='alert'
      >
        <div
          className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${
            loginToast
              ? 'text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200'
              : 'text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200'
          }`}
        >
          <svg
            aria-hidden='true'
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
        </div>
        <div className='ml-3 text-sm font-normal'>
          {loginToast ? 'Đăng nhập thành công !!!' : 'Đăng nhập thất bại !!!'}
        </div>
      </div>
    </div>
  )
}

export default Toast
