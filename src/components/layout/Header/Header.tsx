function Header() {
  return (
    <div className="fixed z-30 w-full bg-white h-20 flex flex-col drop-shadow-[0_0px_15px_rgba(0,0,0,0.10)]">
      {/* top */}
      <div className="flex-1 flex justify-end px-5 items-center">
        <div>
          <button className="default-button bg-main-yellow text-white font-semibold mr-2">
            Preview
          </button>
          <button className="default-button bg-main-blue text-white font-semibold">Publish</button>
        </div>
      </div>

      {/* bottom */}
      <div className="w-full bg-main-gray-300 h-7 relative"></div>
    </div>
  )
}

export default Header
