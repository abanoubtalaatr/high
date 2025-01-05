import React, { useState } from 'react';
import { KTIcon } from '../../../../../_metronic/helpers';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import {useParams} from 'react-router-dom'

function BranchesTable({ branches }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const navigate = useNavigate();
  
  const {userId} = useParams()

  const mapCenter = { lat: 37.7749, lng: -122.4194 }; // Example coordinates
  const mapContainerStyle = { width: '100%', height: '300px' };

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleIconClick = (branchId) => {
    navigate(`/partners/profile/${userId}/branches/branch-details?branchId=${branchId}`);
  };

  return (
    <div className="table-responsive">
      <table className="table table-row-dashed table-row-gray-300 align-middle gy-4">
        <thead>
          <tr className="bg-light">
            <th>#</th>
            <th className="text-center">ID</th>
            <th className="text-center">Name / Tags</th>
            <th className="text-center">State, City</th>
            <th className="text-center">Approved</th>
            <th className="text-center">Not Approved</th>
            <th className="text-center">Pending</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {branches.map((branch, index) => (
            <React.Fragment key={branch.id}>
              <tr
                className="expand_row cursor-pointer"
                onClick={() => handleRowClick(index)}
              >
                <td className="px-0">
                  <KTIcon
                    iconName={expandedRow === index ? 'arrow-up' : 'arrow-down'}
                    className="fs-5 ms-2 cursor-pointer"
                  />
                  <span className="mx-4">{index + 1}</span>
                </td>
                <td className="text-center">{branch.id}</td>
                <td className="text-center">{branch.name}</td>
                <td className="text-center">{branch?.state?.name + " -  " + branch?.city?.name}</td>
                <td className="text-center">{branch.approved}</td>
                <td className="text-center">{branch.notApproved}</td>
                <td className="text-center">{branch.pending}</td>
                <td className="text-center">
                  <span
                    onClick={() => handleIconClick(branch.id)}
                    className="btn"
                  >
                    <KTIcon iconName="eye" className="fs-3" />
                  </span>
                </td>
              </tr>
              {expandedRow === index && (
                <tr>
                  <td colSpan={8}>
                    <div className="expanded-content">
                      <div className="row">
                        <div className="col-md-6">
                          <p>Description :</p>
                          <p className="fs-6">
                            {branch.description || 'No description available.'}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>Address :</p>
                          <p>{branch.address || 'No address available.'}</p>
                          <p>Location :</p>

                          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                            <GoogleMap
                              mapContainerStyle={mapContainerStyle}
                              center={{
                                lat: branch.latitude || mapCenter.lat,
                                lng: branch.longitude || mapCenter.lng,
                              }}
                              zoom={10}
                            />
                          </LoadScript>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BranchesTable;
