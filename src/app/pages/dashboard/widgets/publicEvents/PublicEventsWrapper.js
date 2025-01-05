
import { useEffect, useState } from 'react'
import PublicEventsChart from './PublicEventsChart'
import PublicEventsStatistics from './PublicEventsStatistics'
import { getPublicEvents } from '../../_requests'
function PublicEventsWrapper(props) {
  const { countryIso, stateId, cityId } = props
  const [errorMessage, setErrorMessage] = useState('')
  const [allPublicEvents, setAllPublicEvents] = useState(0)
  const [comingPublicEvents, setComingPublicEvents] = useState(0)
  const [endedPublicEvents, setEndedPublicEvents] = useState(0)
  const [cancelledPublicEvents, setCancelledPublicEvents] = useState(0)
  const [statusPublicEvents, setStatusPublicEvents] = useState([])
  const [playersPublicEvents, setPlayersPublicEvents] = useState([])
  const [parms, setParms] = useState({
    country_iso: '',
    state_id: '',
    city_id: '',
    category_id: '',
    activity_id: '',
    filter_by: 'all',
    filter_value: '',
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
    getPublicEvents(parms)
      .then((res) => {
        const statistics = res.data.data
        setAllPublicEvents(statistics.total)
        setComingPublicEvents(statistics.coming)
        setEndedPublicEvents(statistics.ended)
        setCancelledPublicEvents(statistics.cancelled)
        setStatusPublicEvents(statistics.public_events_status)
        setPlayersPublicEvents(statistics.public_events_players)
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
        <PublicEventsStatistics
          allPublicEvents={allPublicEvents}
          comingPublicEvents={comingPublicEvents}
          endedPublicEvents={endedPublicEvents}
          cancelledPublicEvents={cancelledPublicEvents}
          statusPublicEvents={statusPublicEvents}
          playersPublicEvents={playersPublicEvents}
          errorMessage={errorMessage}
        />
      </div>
      <div className='col-xl-8'>
        <PublicEventsChart
          allPublicEvents={allPublicEvents}
          comingPublicEvents={comingPublicEvents}
          endedPublicEvents={endedPublicEvents}
          cancelledPublicEvents={cancelledPublicEvents}
          statusPublicEvents={statusPublicEvents}
          playersPublicEvents={playersPublicEvents}
          filter={filterHandler}
        />
      </div>
    </>
  )
}
export default PublicEventsWrapper
