import { ChangeEvent } from 'react'

function RadioButton<ValueType>({
  value,
  name,
  onValueChange,
  checked,
  id,
}: {
  value: ValueType
  name: string
  onValueChange: (value: ValueType) => void
  checked: boolean
  id: string
}) {
  const inputValue = value as unknown as string

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputChangedValue = event.target.value as unknown as ValueType
    onValueChange(inputChangedValue)
  }

  return (
    <input
      type="radio"
      value={inputValue}
      onChange={onChange}
      name={name}
      checked={checked}
      id={id}
      className="custom-radio-button"
    />
  )
}

export default RadioButton
