import { useContext, useState } from 'react'

// components
import IconRectangleButton from '../../../common/IconRectangleButton'
import ControllerTitle from '../../components/ControllerTitle'
import RadioButton from '../../../common/RadioButton'
import BasicInput from '../../../common/BasicInput'

// context
import { EditorInfoContext } from '../../../../contexts/EditorInfoContextSection'

function ImageBlockControl() {
  const { previewMode } = useContext(EditorInfoContext)
  const [descriptionEvent, setDescriptionEvent] = useState('description')
  const [description, setDescription] = useState('')

  const changeDescriptionValue = (value: string) => {
    setDescriptionEvent(value)
  }

  return (
    <>
      <div className="relative w-full h-56 group">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1679678691006-3afa56204979?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
          alt=""
        />

        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-30 hidden justify-center items-center group-hover:flex">
          <IconRectangleButton
            icon="ri-image-add-fill"
            text="變更圖片"
            customClassNames="mr-2"
            isPreviewSmMode={previewMode === 'sm'}
          >
            {/* <ImgPathControl uuid={uuid} /> */}
          </IconRectangleButton>
        </div>
      </div>

      <div className="mt-4">
        <ControllerTitle title="敘述文字" description="建議20字以內" />

        <div className="flex items-center">
          <div className="flex items-start mr-3">
            <RadioButton
              value="description"
              name="description-event"
              id="description"
              onValueChange={changeDescriptionValue}
              checked={descriptionEvent === 'description'}
            />
            <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="description">
              新增敘述文字
            </label>
          </div>

          <div className="flex items-start">
            <RadioButton
              value="description-none"
              name="description-event"
              id="description-none"
              onValueChange={changeDescriptionValue}
              checked={descriptionEvent === 'description-none'}
            />
            <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="description-none">
              無
            </label>
          </div>
        </div>

        {descriptionEvent === 'description' && (
          <BasicInput value={description} setValue={setDescription} />
        )}
      </div>
    </>
  )
}

export default ImageBlockControl
