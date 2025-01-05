import { getUsers, getUsersEngagement } from '../../_requests'
import { useEffect, useState } from 'react'
import UsersStatistics from './UsersStatistics'
import UsersChart from './UsersChart'
function UsersWrapper(props) {
  const { countryIso, stateId, cityId } = props
  const [errorMessage, setErrorMessage] = useState('')
  const [allUsers, setAllUsers] = useState(0)
  const [veryActiveUsers, setVeryActiveUsers] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)
  const [inactiveUsers, setInactiveUsers] = useState(0)
  const [statistics, setStatistics] = useState(0)
  const [engagement, setEngagement] = useState([])
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
    getUsers(parms)
      .then((res) => {
        const statistics = res.data.data
        setAllUsers(statistics.total)
        setVeryActiveUsers(statistics.very_active)
        setActiveUsers(statistics.active)
        setInactiveUsers(statistics.inactive)
        setStatistics(statistics.statistics)
        setErrorMessage('')
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
      })
    getUsersEngagement({ country_iso: '' })
      .then((res) => {
        const data = res.data.data
        setEngagement(data)
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
        <UsersStatistics
          allUsers={allUsers}
          veryActiveUsers={veryActiveUsers}
          activeUsers={activeUsers}
          inactiveUsers={inactiveUsers}
          engagement={engagement}
          errorMessage={errorMessage}
        />
      </div>
      <div className='col-xl-8'>
        <UsersChart
          statistics={statistics}
          errorMessage={errorMessage}
          filter={filterHandler}
        />
      </div>
    </>
  )
}
export default UsersWrapper
