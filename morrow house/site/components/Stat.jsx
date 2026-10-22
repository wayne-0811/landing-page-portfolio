export function Stat({ value, label }) {
  return (
    <li className="stat">
      <p className="stat__value">{value}</p>
      <p className="stat__label">{label}</p>
    </li>
  );
}
