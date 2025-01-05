
import { getGender } from '../../_requests'
import { useEffect, useState } from 'react'
import UsersGenderChart from './UsersGenderChart'
import UsersAgeGroupsTable from './UsersAgeGroupsTable'
function UsersAgeGroupsWrapper(props) {
  const { countryIso, stateId, cityId } = props
  const [errorMessage, setErrorMessage] = useState('')
  const [allGender, setAllGender] = useState(0)
  const [maleGender, setMaleGender] = useState(0)
  const [femaleGender, setFemaleGender] = useState(0)
  const [otherGender, setOtherGender] = useState(0)
  const [ageGroups, setAgeGroups] = useState([])
  const [parms, setParms] = useState({
    country_iso: '',
  })
  // get items
  const getItemsHandler = () => {
    getGender(parms)
      .then((res) => {
        const statistics = res.data.data
        setAllGender(statistics.total)
        setMaleGender(statistics.males)
        setFemaleGender(statistics.females)
        setOtherGender(statistics.not_determined)
        setAgeGroups(statistics.age_groups)
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
        <UsersGenderChart
          allGender={allGender}
          maleGender={maleGender}
          femaleGender={femaleGender}
          otherGender={otherGender}
          errorMessage={errorMessage}
        />
      </div>
      <div className='col-xl-8'>
        <UsersAgeGroupsTable ageGroups={ageGroups} errorMessage={errorMessage} />
      </div>
    </>
  )
}
export default UsersAgeGroupsWrapper
