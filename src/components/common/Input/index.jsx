const Input = ({
  id,
  label,
  type,
  placeholder,
  name,
  marginTopZero,
  require,
  value,
  defaultValue,
  onChange,
  onMouseOver,
  disabled,
  checked,
}) => {
  return (
    <div
      className={`${
        marginTopZero ? 'mt-[25px] mb-[20px]' : 'my-[20px]'
      } flex gap-1 flex-col`}
    >
      <label htmlFor={id} className='text-sm font-medium'>
        {require ? (
          <>
            <span className='text-red-600'>*</span>
            <span>{label}</span>
          </>
        ) : (
          label
        )}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        checked={checked}
        defaultValue={defaultValue}
        onMouseOver={onMouseOver}
        onChange={onChange}
        className={'w-full border rounded text-sm py-1 px-3'}
        disabled={disabled}
      />
    </div>
  )
}

export default Input
