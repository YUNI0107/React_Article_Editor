import { useContext, useMemo, useState } from 'react'

// contexts
import { SchemaContext } from '../../contexts/SchemaContextSection'

// components
import ModalBackground from '../../components/common/ModalBackground'
import BasicImageModal from '../../components/common/BasicImageModal'
import EachContainer from '../../components/common/FocusElement/EachContainer'

// types
import classNames from 'classnames'
import { IBanner, IImages } from '../../types/editor'

const ImageModal = ({
  schema,
  popupChildrenIndex,
  handleModalClose,
}: {
  schema: IBanner | IImages
  popupChildrenIndex: number | null
  handleModalClose: () => void
}) => {
  const imgPath = useMemo(() => {
    if (popupChildrenIndex !== null && 'children' in schema) {
      return schema.children[popupChildrenIndex].props?.imgPath
    } else {
      return schema.props?.imgPath
    }
  }, [schema, popupChildrenIndex])

  return <BasicImageModal imgPath={imgPath} handleModalClose={handleModalClose} />
}

function PreviewPage() {
  const { schemas, title, author } = useContext(SchemaContext)
  const date = useMemo(() => new Date(Date.now()).toLocaleString(), [])

  const [isModalShow, setIsModalShow] = useState(false)
  const [popupChildrenIndex, setPopupChildrenIndex] = useState<number | null>(null)

  // operations
  const handleModalClose = () => {
    setIsModalShow(false)
  }

  const handleModalShow = (isShow: boolean, index?: number) => {
    setIsModalShow(isShow)
    setPopupChildrenIndex(index !== undefined ? index : null)
  }

  return (
    <div className="bg-white w-full px-8 md:px-12 lg:20">
      <div className="my-8 flex justify-between flex-col md:flex-row md:items-end">
        <div className="flex-1">
          <h1 className="font-bold text-4xl">{title}</h1>
          <p className="mt-2">
            <span className="mr-2 font-bold">作者</span>
            {author}
          </p>
        </div>

        <div>
          <span className="mr-2 font-bold">發布日期</span>
          {date}
        </div>
      </div>

      {schemas.map((schema, schemaIndex) => {
        if (!schema) return null

        return (
          <div
            key={schema.uuid}
            className={classNames({
              'mb-4': schemaIndex !== schemas.length - 1,
            })}
          >
            <EachContainer schema={schema} setIsModalShow={handleModalShow} />

            <ModalBackground isModalShow={isModalShow} setIsModalShow={setIsModalShow}>
              {(schema.groupType === 'banner' || schema.groupType === 'images') && (
                <ImageModal
                  schema={schema}
                  popupChildrenIndex={popupChildrenIndex}
                  handleModalClose={handleModalClose}
                />
              )}
            </ModalBackground>
          </div>
        )
      })}
    </div>
  )
}

export default PreviewPage
