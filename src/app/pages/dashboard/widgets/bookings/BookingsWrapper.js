
import { useEffect, useState } from 'react'
import BookingsChart from './BookingsChart'
import { getBookings } from '../../_requests'
import BookingsStatistics from './BookingsStatistics'
function BookingsWrapper(props) {
  const { countryIso, stateId, cityId } = props
  const [errorMessage, setErrorMessage] = useState('')
  const [allBookings, setAllBookings] = useState(0)
  const [comingBookings, setComingBookings] = useState([])
  const [endedBookings, setEndedBookings] = useState([])
  const [cancelledBookings, setCancelledBookings] = useState([])
  const getCurrentMonth = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`; // Format YYYY-MM
  };
  const [parms, setParms] = useState({
    country_iso: '',
    state_id: '',
    city_id: '',
    category_id: '',
    activity_id: '',
    filter_by: 'month',
    filter_value: getCurrentMonth(), // Set default to current month
  })

  const filterHandler = (category_id, activity_id, filter_by, filter_value) => {
    setParms({
      ...parms,
      category_id: category_id,
      activity_id: activity_id,
      filter_by: filter_by,
      filter_value: filter_value,
    })
  }
  // get items
  const getItemsHandler = () => {
    getBookings(parms)
      .then((res) => {
        const statistics = res.data.data
        setAllBookings(statistics.total)
        setComingBookings(statistics.coming)
        setEndedBookings(statistics.ended)
        setCancelledBookings(statistics.cancelled)
        setErrorMessage('')
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
      })
  }
  useEffect(() => {
    setParms({
      ...parms,
      country_iso: countryIso,
      state_id: stateId,
      city_id: cityId,
    })
  }, [props])
  useEffect(() => {
    getItemsHandler()
  }, [parms])
  return (
    <>
      <div className='col-xl-4'>
        <BookingsStatistics
          allBookings={allBookings}
          comingBookings={comingBookings}
          endedBookings={endedBookings}
          cancelledBookings={cancelledBookings}
          errorMessage={errorMessage}
        />
      </div>
      <div className='col-xl-8'>
        <BookingsChart
          comingBookings={comingBookings}
          endedBookings={endedBookings}
          cancelledBookings={cancelledBookings}
          errorMessage={errorMessage}
          filter={filterHandler}
        />
      </div>
    </>
  )
}
export default BookingsWrapper
