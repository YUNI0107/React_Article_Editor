function AddDrawer({ setIsShow }: { setIsShow: (isShow: boolean) => void }) {
  return (
    <>
      <button onClick={() => setIsShow(false)}>Toogle</button>
    </>
  )
}

export default AddDrawer
