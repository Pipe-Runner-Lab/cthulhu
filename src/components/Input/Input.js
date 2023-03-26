export default function Input({ value, onChange, placeholder }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    ></input>
  );
}
