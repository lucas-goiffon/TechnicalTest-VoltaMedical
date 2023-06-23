import { useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import toast from 'react-hot-toast';
import './AlarmModal.scss';
import { Alarm } from "@models/Alarm";

type AlarmModalProps = {
  alarm?: Alarm
}

const defaultAlarm: Alarm = {
  label: "",
  time: ":",
  isActive: true
}

const AlarmModal = NiceModal.create(({alarm}: AlarmModalProps) => {
  let currentAlarm: Alarm = alarm ? alarm : Object.assign({}, defaultAlarm);
  const [time, setTime] = useState(currentAlarm.time);
  const [label, setLabel] = useState(currentAlarm.label);
  const modal = useModal();
  const actionName = alarm ? "Edit" : "Create";

  const onValidateClick = () => {
    if (!/^\d\d:\d\d$/.exec(time)) { //There's only one very simple form so I didn't search for any FormBuilder etc...
      toast.error("Please enter a valid time.", {duration: 3000, style: {fontFamily: "Arial"}});
      return;
    }

    currentAlarm.label = label;
    currentAlarm.time = time;
    modal.resolve(currentAlarm);
    modal.remove();
  };

  const onCancelClick = () => {
    modal.remove();
  };

  const onDeleteClick = () => {
    modal.resolve(null);
    modal.remove();
  }

  return (
    <div className="background">
      <div className="modal">
        <h3>{actionName} Alarm</h3>
        <div className="modal__content">
          <span className="modal__field-label">Enter time:</span>
          <div className="modal__input">
            <input type="text" className="modal__hour-input" placeholder="12" value={time.split(':')[0]} onChange={(e) => { if (e.target.value.length <= 2) setTime(e.target.value + ':' + time.split(':')[1]); }} />
            <span className="modal__hour-separator">:</span>
            <input type="text" className="modal__minute-input" placeholder="00" value={time.split(':')[1]} onChange={(e) => { if (e.target.value.length <= 2) setTime(time.split(':')[0] + ':' + e.target.value); }} />
          </div>

          <span className="modal__field-label">Enter label:</span>
          <div className="modal__input">
            <input type="text" className="modal__label-input" placeholder="Example of label" value={label} onChange={(e) => { setLabel(e.target.value); }} />
          </div>
        </div>
        <div className="modal__footer">
          <button name={actionName} className="button-valid" onClick={onValidateClick}>{actionName}</button>
          <button name="Cancel" className="button-cancel" onClick={onCancelClick}>Cancel</button>
          { alarm &&
            <>
            <br />
            <a className="delete" onClick={onDeleteClick}>remove</a>
            </>
          }
        </div>
      </div>
    </div>
  );
});

export default AlarmModal;