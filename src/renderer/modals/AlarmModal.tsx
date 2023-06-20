import { useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import './AlarmModal.scss';
import Alarm from "@models/Alarm";

type AlarmModalProps = {
  alarm?: Alarm
}

const defaultAlarm: Alarm = {
  label: "",
  time: "12:00",
  isActive: true
}

const AlarmModal = NiceModal.create(({alarm}: AlarmModalProps) => {
  let currentAlarm: Alarm = alarm ? alarm : Object.assign({}, defaultAlarm);
  const [time, setTime] = useState(currentAlarm.time);
  const [label, setLabel] = useState(currentAlarm.label);
  const modal = useModal();
  const actionName = alarm ? "Edit" : "Create";

  return (
    <div className="background">
      <div className="modal">
        <h3>{actionName} Alarm</h3>
        <div className="modal__content">
          <input type="text" className="modal__hour-input" value={time.split(':')[0]} onChange={(e) => setTime(e.target.value + ':' + time.split(':')[1])} />
          <span className="modal__hour-separator">:</span>
          <input type="text" className="modal__minute-input" value={time.split(':')[1]} onChange={(e) => setTime(time.split(':')[0] + ':' + e.target.value)} />
        </div>
        <div className="modal__footer">
          <button
            name={actionName}
            onClick={() => {
              currentAlarm.label = label;
              currentAlarm.time = time;
              modal.resolve(currentAlarm);
              modal.remove();
            }}
          >{actionName}</button>
          <button
            name="Cancel"
            onClick={() => {
              modal.remove();
            }}
          >Cancel</button>
        </div>
      </div>
    </div>
  );
});

export default AlarmModal;