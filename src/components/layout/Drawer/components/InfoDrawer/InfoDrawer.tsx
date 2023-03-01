import { useContext } from 'react'

// components
import BasicInput from '../../../../common/BasicInput'

import { SchemaContext } from '../../../../../contexts/SchemaContextSection'

function InfoDrawer({ setIsShow }: { setIsShow: (isShow: boolean) => void }) {
  const { title, setTitle, author, setAuthor } = useContext(SchemaContext)
  return (
    <>
      <div className="mb-5">
        <div className="flex justify-between items-center mb-[10px]">
          <div className="flex justify-center items-center">
            <i className="ri-settings-4-fill text-[32px] text-main-blue mr-[2px]"></i>
            <h1 className="font-extrabold">文章設定</h1>
          </div>
          <button onClick={() => setIsShow(false)}>
            <i className="ri-close-fill text-[32px] text-main-gray-400 hover:text-main-blue"></i>
          </button>
        </div>
      </div>

      <div className="mb-5">
        <p className="mb-2">
          文章標題<span className="text-main-blue ml-2">必填</span>
        </p>
        <BasicInput value={title} setValue={setTitle} customInputClassNames="h-8" />
      </div>

      <div className="mb-5">
        <p className="mb-2">
          作者<span className="text-main-blue ml-2">必填</span>
        </p>
        <BasicInput value={author} setValue={setAuthor} customInputClassNames="h-8" />
      </div>
    </>
  )
}

export default InfoDrawer
