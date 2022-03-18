import { Fragment, ReactNode } from 'react'

function ImagesControlSection({ controls }: { controls?: Array<ReactNode> }) {
  return (
    <div>
      {controls?.map((control, index) => {
        return <Fragment key={index}>{control}</Fragment>
      })}
    </div>
  )
}

export default ImagesControlSection
