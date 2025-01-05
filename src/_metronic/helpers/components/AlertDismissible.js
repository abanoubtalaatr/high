import {useState} from 'react'
import Alert from 'react-bootstrap/Alert'
import {KTIcon} from './KTIcon'

function AlertDismissible(props) {
  const [show, setShow] = useState(true)
  const {heading, description, time, icon, state} = props
  if (show) {
    return (
      <Alert variant={state} onClose={() => setShow(false)} dismissible>
        <div className='d-flex align-items-center'>
          <span className='svg-icon me-3'>
            <KTIcon iconName={icon} className='fs-2x text-success' />
          </span>
          <div className='d-flex flex-column'>
            {heading && <Alert.Heading className='m-0'>{heading}</Alert.Heading>}
            {description && <p className='m-0'>{description}</p>}
          </div>
        </div>
      </Alert>
    )
  }
}

export default AlertDismissible
