import { ChangeEvent } from 'react'

function RadioButton<ValueType>({
  value,
  name,
  onValueChange,
  checked,
}: {
  value: ValueType
  name: string
  onValueChange: (value: ValueType) => void
  checked: boolean
}) {
  const inputValue = value as unknown as string

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputChangedValue = event.target.value as unknown as ValueType
    onValueChange(inputChangedValue)
  }

  return <input type="radio" value={inputValue} onChange={onChange} name={name} checked={checked} />
}

export default RadioButton
