import { getPartners } from '../../_requests'
import { useEffect, useState } from 'react'
import PartnersStatistics from './PartnersStatistics'
import PartnersChart from './PartnersChart'
function PartnersWrapper(props) {
  const { countryIso, stateId, cityId } = props
  const [errorMessage, setErrorMessage] = useState('')
  const [allPartners, setAllPartners] = useState(0)
  const [pendingPartners, setPendingPartners] = useState(0)
  const [activePartners, setActivePartners] = useState(0)
  const [inactivePartners, setInactivePartners] = useState(0)
  const [statistics, setStatistics] = useState({})
  const [parms, setParms] = useState({
    country_iso: '',
    state_id: '',
    city_id: '',
    filter_by: 'all',
    filter_value: '',
  })
  const filterHandler = (filter_by, filter_value) => {
    setParms({
      ...parms,
      filter_by: filter_by,
      filter_value: filter_value,
    })
  }

  // get items
  const getItemsHandler = () => {
    getPartners(parms)
      .then((res) => {
        const statisticsData = res.data.data
        setAllPartners(statisticsData.total)
        setPendingPartners(statisticsData.pending)
        setActivePartners(statisticsData.active)
        setInactivePartners(statisticsData.inactive)
        setStatistics(statisticsData.statistics)
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
        <PartnersStatistics
          allPartners={allPartners}
          pendingPartners={pendingPartners}
          activePartners={activePartners}
          inactivePartners={inactivePartners}
          errorMessage={errorMessage}
        />
      </div>
      <div className='col-xl-8'>
        <PartnersChart
          partnersStatistics={statistics}
          errorMessage={errorMessage}
          filter={filterHandler}
        />
      </div>
    </>
  )
}
export default PartnersWrapper
