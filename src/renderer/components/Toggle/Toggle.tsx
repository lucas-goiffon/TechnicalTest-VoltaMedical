import './Toggle.css';

type ToggleProps = {
  checked?: boolean;
  handler?: () => void;
}

const Toggle = ({checked, handler}: ToggleProps) => {
  return (
    <label className="toggle">
      <input type="checkbox" onChange={handler} defaultChecked={checked} />
      <span className="slider"></span>
    </label>
  );
}

export default Toggle;