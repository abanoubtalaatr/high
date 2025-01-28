import { useIntl } from 'react-intl';
import { PageTitle } from '../../../_metronic/layout/core';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import BanksPageToolbarWrapper from './BanksPageToolbarWrapper';
import BanksItemsTableWrapper from './BanksItemsTableWrapper';

function Banks() {
  const intl = useIntl();
  const breadCrumbs = [
    {
      title: intl.formatMessage({ id: 'MENU.DASHBOARD' }),
      path: '/dashboard',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
    {
      title: 'Banks',
      path: '/banks/list',
      isSeparator: false,
      isActive: true,
    },
  ];

  return (
    <>
      <PageTitle breadcrumbs={breadCrumbs}>Banks</PageTitle>
      <Routes>
        <Route element={<Outlet />}>
          <Route
            path='list'
            element={
              <>
                <BanksPageToolbarWrapper />
                <BanksItemsTableWrapper />
              </>
            }
          />
          <Route index element={<Navigate to='/banks/list' />} />
        </Route>
      </Routes>
    </>
  );
}

export default Banks;