import './Home.css';
import Toggle from './components/Toggle/Toggle';

type Alarm = {
  label: string;
  message: string;
  time: string;
}

function Home() {
  const mockAlarms = [ //TODO: Get data from Database
    {
      label: 'Alarm',
      message: 'Some text message!',
      time: '10:50',
    },
    {
      label: 'Alarm 2',
      message: 'Some text message!',
      time: '07:50',
    },
    {
      label: 'Alarm 3',
      message: 'Some text message!',
      time: '18:50',
    },
  ];

  return (
    <div className="main-page">
      <div className="main-page__header">
        <h3> Alarms </h3>
        <button> + </button>
      </div>
      <ul className="alarms-holder">
          {
            mockAlarms.map((alarm: Alarm) => (
              <li className="alarm-item">
                <div>
                  <p className="alarm-item__time"> { alarm.time} </p>
                  <p className="alarm-item__label"> { alarm.label} </p>
                </div>
                
                <div className="alarm-item__toggle">
                  <Toggle/>
                </div>
              </li>
            ))
          }
        </ul>
    </div>
  );
}

export default Home;