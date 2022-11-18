function ControllerTitle({ title, description }: { title?: string; description?: string }) {
  return (
    <div className="flex items-baseline pb-1 mb-3 border-b border-main-gray-300 font-medium \">
      {title && <h3 className="text-sm">{title}</h3>}
      {description && <p className="text-xs text-main-gray-500 ml-1">{description}</p>}
    </div>
  )
}

export default ControllerTitle
