function InfoDrawer({ setIsShow }: { setIsShow: (isShow: boolean) => void }) {
  return (
    <>
      <button onClick={() => setIsShow(false)}>
        <i className="ri-close-fill text-[32px] text-main-gray-400 hover:text-main-blue"></i>
      </button>
    </>
  )
}

export default InfoDrawer
