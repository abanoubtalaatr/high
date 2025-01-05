import BookingTable from './tables/BookingTable'
import PaymentTable from './tables/PaymentTable'
import CollectionHistoryTable from './tables/CollectionHistoryTable'
import InformationTable from './tables/InformationTable'
import {useEffect, useState} from 'react'
import {getSessionBookings} from './_requests'
import GeneralInformationTable from './tables/GeneralInformationTable'

function SessionBookingView(props) {
  const {sessionId} = props
  const [responseState, setResponseState] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [itemDetails, setItemDetails] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const getItemsHandler = () => {
    getSessionBookings(sessionId)
      .then((res) => {
        setItemDetails(res.data.data)
        setIsLoaded(false)
        setResponseState(true)
      })
      .catch((err) => {
        setErrorMessage(err.message)
        setIsLoaded(false)
        setResponseState(false)
      })
  }
  useEffect(() => {
    setIsLoaded(true)
    getItemsHandler()
  }, [])

  return (
    <>
      {isLoaded ? (
        'loading ...'
      ) : !responseState ? (
        <div className={`alert alert-danger d-flex align-items-center p-5 mb-0`}>
          <div className='d-flex flex-column'>{errorMessage}</div>
        </div>
      ) : itemDetails.length === 0 ? (
        'no data'
      ) : (
        <>
          {/* general Information */}
          <GeneralInformationTable title='general Information' itemDetails={itemDetails} />
          {/* Session Information */}
          <InformationTable title='Session Information' itemDetails={itemDetails} />
          {/* Booking */}
          <BookingTable title='Booking' itemDetails={itemDetails} />
          {/* Payment */}
          <PaymentTable title='Payment' itemDetails={itemDetails} />
          {/* Payment History */}
          <CollectionHistoryTable title='Collection History' itemDetails={itemDetails} />
        </>
      )}
    </>
  )
}

export default SessionBookingView
