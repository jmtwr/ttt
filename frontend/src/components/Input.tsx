type InputProps = {
  label: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

export const Input: React.FC<InputProps> = ({ label, placeholder, onChange, value }) => {
  return (
    <div className="form-control">
      <label className="input-group input-group-md">
        <span className="shrink-0">{label}</span>
        <input
          value={value}
          onChange={({ target: { value } }) => onChange?.(value)}
          type="text"
          placeholder={placeholder}
          className="input input-bordered input-md w-full"
        />
      </label>
    </div>
  )
}
