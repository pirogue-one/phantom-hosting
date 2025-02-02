export default function NumericInput({ value, onChange, min, max, placeholder }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number.parseInt(e.target.value, 10))}
      min={min}
      max={max}
      placeholder={placeholder}
      className="p-2 border rounded"
    />
  )
}

