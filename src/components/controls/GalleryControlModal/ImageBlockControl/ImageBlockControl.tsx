import { useState, useEffect } from 'react'

// components
import IconRectangleButton from '../../../common/IconRectangleButton'
import ControllerTitle from '../../components/ControllerTitle'
import RadioButton from '../../../common/RadioButton'
import BasicInput from '../../../common/BasicInput'
import ImgPathControl from '../../ImgPathControl'

// types
import { IGalleryImage } from '../../../../types/editor'
import { GalleryDescriptionType } from '../../../../types/control'

function ImageBlockControl({
  selectImage,
  handleImageUpdate,
}: {
  selectImage: IGalleryImage
  handleImageUpdate: (image: string) => void
}) {
  const [descriptionEvent, setDescriptionEvent] = useState<GalleryDescriptionType>(
    selectImage.description ? 'description' : 'none'
  )
  const [description, setDescription] = useState(selectImage.description)
  const [isLoading, setIsLoading] = useState(false)

  const changeDescriptionValue = (value: GalleryDescriptionType) => {
    setDescriptionEvent(value)
  }

  const handleOnBlur = () => {
    selectImage.description = description
  }

  const onImgPathChange = (image: string) => {
    handleImageUpdate(image)
  }

  useEffect(() => {
    // Update selectImage
    setDescriptionEvent(selectImage.description ? 'description' : 'none')
    setDescription(selectImage.description)
  }, [selectImage])

  return (
    <>
      <div className="relative w-full h-56 group">
        <img className="w-full h-full object-cover" src={selectImage.imgPath} />

        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-30 hidden justify-center items-center group-hover:flex">
          <IconRectangleButton
            icon="ri-image-add-fill"
            text={isLoading ? 'Uploading...' : '變更圖片'}
            customClassNames="mr-2"
            disabled={isLoading}
          >
            <ImgPathControl onImgPathChange={onImgPathChange} setIsLoading={setIsLoading} />
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
              value="none"
              name="description-event"
              id="description-none"
              onValueChange={changeDescriptionValue}
              checked={descriptionEvent === 'none'}
            />
            <label className="text-[10px] ml-2 -translate-y-[2px]" htmlFor="description-none">
              無
            </label>
          </div>
        </div>

        {descriptionEvent === 'description' && (
          <BasicInput value={description} setValue={setDescription} handleOnBlur={handleOnBlur} />
        )}
      </div>
    </>
  )
}

export default ImageBlockControl
