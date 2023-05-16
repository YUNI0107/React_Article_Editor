import { Link } from 'react-router-dom'

function PublishPageHeader() {
  return (
    <>
      <div className="fixed z-30 w-full bg-white h-20 flex flex-col basic-shadow">
        {/* top */}
        <div className="flex-1 flex px-5 items-center">
          <Link to="/">
            <button className="default-button  text-white font-semibold mr-2 bg-main-blue flex items-center">
              <i className="text-xl ri-arrow-left-s-line mr-2"></i>
              Back to Edit Page
            </button>
          </Link>
        </div>

        {/* bottom */}
        <div className="w-full bg-main-gray-300 h-7 relative"></div>
      </div>
    </>
  )
}

export default PublishPageHeader
