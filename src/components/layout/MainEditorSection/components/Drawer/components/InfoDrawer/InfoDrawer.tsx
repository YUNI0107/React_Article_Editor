function InfoDrawer({ setIsShow }: { setIsShow: (isShow: boolean) => void }) {
  return (
    <>
      <button onClick={() => setIsShow(false)}>Toogle</button>
    </>
  )
}

export default InfoDrawer
