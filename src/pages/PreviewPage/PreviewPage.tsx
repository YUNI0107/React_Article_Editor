import { useContext, useMemo, useState } from 'react'

// contexts
import { SchemaContext } from '../../contexts/SchemaContextSection'

// components
import ModalBackground from '../../components/common/ModalBackground'
import BasicImageModal from '../../components/common/BasicImageModal'
import EachContainer from '../../components/common/FocusElement/EachContainer'
import classNames from 'classnames'

function PreviewPage() {
  const { schemas, title, author } = useContext(SchemaContext)
  const date = useMemo(() => new Date(Date.now()).toLocaleString(), [])

  const [isModalShow, setIsModalShow] = useState(false)
  const [popupChildrenIndex, setPopupChildrenIndex] = useState<number | null>(null)

  const imgPath = useMemo(() => {
    // if (popupChildrenIndex !== null && 'children' in schema) {
    //   return schema.children[popupChildrenIndex].props?.imgPath
    // } else {
    //   return schema.props?.imgPath
    // }
    console.log(popupChildrenIndex)
    return ''
    // }, [schema, popupChildrenIndex])
  }, [])

  // operations
  const handleModalClose = () => {
    setIsModalShow(false)
  }

  const handleModalShow = (isShow: boolean, index?: number) => {
    setIsModalShow(isShow)
    setPopupChildrenIndex(index !== undefined ? index : null)
  }

  const popupShowHandler = (index: number | null) => {
    console.log(index)
  }

  handleModalShow

  return (
    <div className="px-8 bg-white">
      <div className="my-8 flex justify-between items-end">
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

        console.log(schemaIndex)

        return (
          <div
            key={schema.uuid}
            className={classNames({
              'mb-2': schemaIndex !== schemas.length - 1 && schemaIndex === 0,
            })}
          >
            <EachContainer
              schema={schema}
              popupShowHandler={popupShowHandler}
              setIsModalShow={setIsModalShow}
            />

            <ModalBackground isModalShow={isModalShow} setIsModalShow={setIsModalShow}>
              {(schema.groupType === 'banner' || schema.groupType === 'images') && (
                <BasicImageModal imgPath={imgPath} handleModalClose={handleModalClose} />
              )}
            </ModalBackground>
          </div>
        )
      })}
    </div>
  )
}

export default PreviewPage
