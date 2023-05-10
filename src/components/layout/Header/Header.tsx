import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()
  const isPreview = location.pathname === '/preview'

  return (
    <div className="fixed z-30 w-full bg-white h-20 flex flex-col basic-shadow">
      {/* top */}
      <div className="flex-1 flex justify-end px-5 items-center">
        <div>
          <Link to={isPreview ? '/' : '/preview'}>
            <button className="default-button bg-main-yellow text-white font-semibold mr-2">
              {isPreview ? 'Edit' : 'Preview'}
            </button>
          </Link>
          <button className="default-button bg-main-blue text-white font-semibold">Publish</button>
        </div>
      </div>

      {/* bottom */}
      <div className="w-full bg-main-gray-300 h-7 relative"></div>
    </div>
  )
}

export default Header
