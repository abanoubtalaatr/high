import PlayersComponent from './tables/PlayersComponent'
import InformationTable from './tables/InformationTable'
import PublicEventTable from './tables/PublicEventTable'
import PaymentTable from './tables/PaymentTable'
import PaymentHistoryTable from './tables/PaymentHistoryTable'
import { getSessionPublicEvents } from './_requests'
import { useEffect, useState } from 'react'
import GeneralInformationTable from './tables/GeneralInformationTable'

function SessionPublicEventView(props) {
  const { sessionId } = props
  const [responseState, setResponseState] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [itemDetails, setItemDetails] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const getItemsHandler = () => {
    getSessionPublicEvents(sessionId)
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
          {/* Public Event */}
          <PublicEventTable title='Public Event' itemDetails={itemDetails} />
          {/* end::Table */}
          {/* Joined Players */}
          <h5 className='card-title mt-5'>
            <span className='mb-3 fw-bolder'>{`Joined Players (${itemDetails.joined_players_count}/${itemDetails.player_numbers})`}</span>
          </h5>
          {itemDetails.joined_players_count > 0 && (
            <PlayersComponent itemDetails={itemDetails.joined_players} />
          )}
          <h5 className='card-title mt-5'>
            <span className='mb-3 fw-bolder'>{`Left Players (Early) (${itemDetails.early_left_players_count})`}</span>
          </h5>
          {/* Joined Players */}
          {itemDetails.early_left_players_count > 0 && (
            <PlayersComponent title={`Left Players (Early) (${itemDetails.early_left_players_count})`} itemDetails={itemDetails.early_left_players} />
          )}
          <h5 className='card-title mt-5'>
            <span className='mb-3 fw-bolder'>{`Left Players (Late) (${itemDetails.late_left_players_count})`}</span>
          </h5>
          {/* Joined Players */}
          {itemDetails.late_left_players_count > 0 && (
            <PlayersComponent title={`Left Players (Late) (${itemDetails.late_left_players_count})`} itemDetails={itemDetails.late_left_players} />
          )}
          <h5 className='card-title mt-5'>
            <span className='mb-3 fw-bolder'>{`Removed Players (${itemDetails.removed_players_count})`}</span>
          </h5>
          {/* Joined Players */}
          {itemDetails.removed_players_count > 0 && (
            <PlayersComponent itemDetails={itemDetails.removed_players} />
          )}
          {/* Payment */}
          <PaymentTable title='Payment' itemDetails={itemDetails} />
          {/* Payment History */}
          <PaymentHistoryTable title='Payment History' itemDetails={itemDetails} />
          {/* end::Table container */}
        </>
      )}
    </>
  )
}

export default SessionPublicEventView
