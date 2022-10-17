import { ChangeEvent, useContext } from 'react'

// utils
import ControlHandler from '../../../utils/controlHandler'
import getBase64 from '../../../utils/getBase64'

// validator
import imageTypeValidate from '../../../validator/imageTypeValidate'

// contexts
import { SchemaContext } from '../../../contexts/SchemaContextSection'

function ImgPathControl({ uuid, childUuid }: { uuid: string; childUuid?: string }) {
  const { schemas, handleSchema } = useContext(SchemaContext)
  const controlHandler = new ControlHandler('imgPath', schemas, handleSchema)

  const changeInputValue = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0] || !imageTypeValidate(event.target.files?.[0])) {
      console.log('Not Correct Type')
      return
    }

    const imageBase64 = await getBase64(event.target.files[0])
    if (typeof imageBase64 === 'string') {
      controlHandler.changeValue(imageBase64, uuid, childUuid)
    }
  }

  return (
    <div>
      <h1>ControlControlControl</h1>
      <input
        type="file"
        onChange={changeInputValue}
        accept="image/png, image/jpeg, image/jpg, image/gif, image/svg "
      />
    </div>
  )
}

export default ImgPathControl
