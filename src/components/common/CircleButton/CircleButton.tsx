import classNames from 'classnames'

function CircleButton({
  iconTag,
  customClassNames,
  customIconClassNames,
  onClick,
  isPreviewSmMode,
  dataType,
}: {
  iconTag: string
  customClassNames?: string
  customIconClassNames?: string
  onClick: () => void
  isPreviewSmMode?: boolean
  dataType?: string
}) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'p-2 min-w-[52px] flex justify-center items-center text-main-gray-500 bg-white rounded-full drop-shadow-lg hover:brightness-90',
        customClassNames
      )}
      data-type={dataType}
    >
      <i
        className={classNames(
          iconTag,
          { 'text-3xl': !customClassNames, 'text-2xl': isPreviewSmMode && !customClassNames },
          customIconClassNames
        )}
      ></i>
    </button>
  )
}

export default CircleButton
