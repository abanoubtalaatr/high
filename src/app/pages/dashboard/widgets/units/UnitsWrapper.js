import UnitsChart from './UnitsChart'
import UnitsStatistics from './UnitsStatistics'
import { getUnits } from '../../_requests'
import { useEffect, useState } from 'react'
function UnitsWrapper(props) {
  const { countryIso, stateId, cityId } = props
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [allUnits, setAllUnits] = useState(0)
  const [pendingUnits, setPendingUnits] = useState(0)
  const [approvedUnits, setApprovedUnits] = useState(0)
  const [notApprovedUnits, setNotApproveUnits] = useState(0)
  const [parms, setParms] = useState({
    country_iso: '',
    state_id: '',
    city_id: '',
    category_id: '',
    activity_id: '',
  })
  const filterHandler = (category_id, activity_id) => {
    setParms({
      ...parms,
      category_id: category_id,
      activity_id: activity_id,
    })
  }
  // get items
  const getItemsHandler = () => {
    getUnits(parms)
      .then((res) => {
        const statistics = res.data.data
        setAllUnits(statistics.total)
        setPendingUnits(statistics.pending)
        setApprovedUnits(statistics.active)
        setNotApproveUnits(statistics.inactive)
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
        <UnitsStatistics
          allUnits={allUnits}
          pendingUnits={pendingUnits}
          approvedUnits={approvedUnits}
          notApprovedUnits={notApprovedUnits}
          errorMessage={errorMessage}
        />
      </div>
      <div className='col-xl-8'>
        <UnitsChart
          allUnits={allUnits}
          pendingUnits={pendingUnits}
          approvedUnits={approvedUnits}
          notApprovedUnits={notApprovedUnits}
          errorMessage={errorMessage}
          filter={filterHandler}
        />
      </div>
    </>
  )
}
export default UnitsWrapper
