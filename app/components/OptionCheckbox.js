export default function OptionCheckbox({ label, checked, onChange, children }) {
  return (
    <div>
      <label className="flex items-center space-x-2">
        <input type="checkbox" checked={checked} onChange={onChange} className="form-checkbox" />
        <span>{label}</span>
      </label>
      {checked && children}
    </div>
  )
}

