function CheckBoxButton({
  value,
  name,
  id,
  onValueChange,
  checked,
}: {
  value: string
  name: string
  id: string
  onValueChange: (value: boolean) => void
  checked: boolean
}) {
  const onChange = () => {
    onValueChange(!checked)
  }

  return (
    <input
      type="checkbox"
      value={value}
      name={name}
      id={id}
      onChange={onChange}
      checked={checked}
      className="custom-check-button"
    />
  )
}

export default CheckBoxButton
