import { Link, useParams } from "react-router-dom"

function CategoriesTable(props) {
  const {items} = props
  const {userId} = useParams()
  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table className='table table-row-dashed table-row-gray-300 align-middle gy-4'>
        {/* begin::Table head */}
        <thead>
          <tr className='bg-light'>
            <th className='min-w-100px'>name</th>
            <th className='min-w-100px text-center'>units</th>
          </tr>
        </thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody>
          {items.map((e) => {
            return (
              <tr key={e.id}>
                <td className='min-w-100px'>{e.name || '---'}</td>
                <td className='min-w-100px text-center'>
                <Link
                    className='text-dark fw-bold text-hover-primary'
                    to={`/partners/profile/${userId}/memberships/categories/${e.id}/membership-category-units`}
                    state={{titleName: e.name}}
                  >
                    {e.units || '0'} units
                  </Link></td>
              </tr>
            )
          })}
        </tbody>
        {/* end::Table body */}
      </table>
      {/* end::Table */}
    </div>
  )
}

export default CategoriesTable
