import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Hero from '../Hero';
import StatusAlert from '../StatusAlert';
import PlotlyAnalyticsCharts from './PlotlyAnalyticsCharts';
import { Col, Container, Row } from '@edx/paragon';
import PieChart from './Charts/PieChart';
import LineChart from './Charts/LineChart';
import LearnerStatusInCourses from './Charts/LearnerStatusInCourses';
import EnterpriseDataApiService from '../../data/services/EnterpriseDataApiService';
import { fetchDashboardAnalytics } from '../../data/actions/dashboardAnalytics';
import { clearDashboardAnalytics } from '../../data/actions/dashboardAnalytics';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import messages from './messages';
import LearnerCertificate from './Charts/LearnerCertificate';
import { useSubscriptionData } from '../subscriptions/data/hooks';
import AllCoursesProgress from './Charts/AllCoursesProgress';
import LicenseManagerApiService from '../../data/services/LicenseManagerAPIService';




const PlotlyAnalyticsPage = ({ enterpriseId, fetchDashboardAnalytics, analyticsData, enrollments, intl, subscriptionUUID }) => {
  const [status, setStatus] = useState({
    visible: false, alertType: '', message: '',
  });
  const [enrollmentsList, setenrollmentsList] = useState(undefined)
  const [licenseUsersDetails, setLicenseUsersDetails] = useState(undefined)
  const [learnerStatus, setlearnerStatus] = useState(undefined)
  const PAGE_TITLE = intl.formatMessage(messages['tab.anayltics.page.title']);
  // const enrollmentsList = enrollments.then(enrollment => enrollments.data);

  const {
    subscriptions,
    errors,
    setErrors,
    forceRefresh,
    loading,
  } = useSubscriptionData({ enterpriseId });


  async function getLicenseData() {
    try {
      const { data:results } = await LicenseManagerApiService.fetchSubscriptionUsers(subscriptionUUID)
      setLicenseUsersDetails(results)

    } catch (error) {
      console.log(error.message);
    }
  }



  async function getEnrollmentsData() {
    try {
      const { data } = await enrollments;

      setenrollmentsList(data.results)
    } catch (error) {
      console.log(error.message);
    }
  }



  function getLearnerStatus() {
    setlearnerStatus(
      [
        [intl.formatMessage(messages['tab.analytics.chart.learner.enrollment.status']), intl.formatMessage(messages['tab.analytics.chart.learner.enrollment.status.message'])],
        [intl.formatMessage(messages['tab.analytics.chart.learner.enrollment.status.enrolled']), Math.abs(analyticsData.number_of_users - analyticsData.enrolled_learners)],
        [intl.formatMessage(messages['tab.analytics.chart.learner.enrollment.status.not.enrolled']), analyticsData.enrolled_learners],
      ]
    )
  }

  useEffect(() => {
    fetchDashboardAnalytics(enterpriseId)
    getEnrollmentsData()
    if (subscriptionUUID){
      getLicenseData()
    }

  }, [enterpriseId,subscriptionUUID])


  useEffect(() => {
    getLearnerStatus()
  }, [analyticsData])


  // const setSuccessStatus = ({ visible, message = '' }) => {
  //   setStatus({
  //     visible,
  //     alertType: 'success',
  //     message,
  //   });
  // };


  // const renderStatusMessage = () => (
  //   status && status.visible && (
  //     <StatusAlert
  //       alertType={status.alertType}
  //       iconClassName={status.iconClassName || `fa ${status.alertType === 'success' ? 'fa-check' : 'fa-times-circle'}`}
  //       title={status.title}
  //       message={status.message}
  //       onClose={() => setSuccessStatus({ visible: false })}
  //       dismissible
  //     />
  //   )
  // );


  return (
    <main className='analytics-page'>
      <Helmet title={PAGE_TITLE} />
      <Hero title={PAGE_TITLE} />
      {/* <div className="col-12 col-lg-9">
        {renderStatusMessage()}
      </div> */}
      <Container gap={2} className='tab-content'>
        <Row style={{ rowGap: 10 }}>
          <Col lg={6} md={6} sm={12} xs={12} className='d-flex'  >
            <PieChart data={learnerStatus} title="tab.anayltics.chart.title.daily.activities" totalNumberOfUsers={analyticsData.number_of_users} />
          </Col>
          <Col lg={6} md={6} sm={12} xs={12} className='d-flex'    >
            <AllCoursesProgress licenses={subscriptions.results} enrollments={enrollmentsList} />
          </Col>
        </Row>
        <Row className='mt-3' style={{ rowGap: 10 }}>
          <Col lg={12} md={12} sm={12} xs={12} >
            {
              !errors.length &&
              <LearnerStatusInCourses rawData={enrollmentsList} licenseData={subscriptions} licenseUsersDetails={licenseUsersDetails?.results} />
            }
          </Col>
        </Row>
        <Row className='mt-3' style={{ rowGap: 10 }}>
          <Col lg={12} md={12} sm={12} xs={12} >
            <LearnerCertificate rawData={enrollmentsList} />
          </Col>
          {/* <Col lg={6} md={6} sm={12} xs={12} >
          <LineChart licenses={subscriptions.results} enrollments={enrollments} />
          </Col> */}
        </Row>
      </Container>
    </main>
  );
};

PlotlyAnalyticsPage.propTypes = {
  enterpriseId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  enterpriseId: state.portalConfiguration.enterpriseId,
  // learnerStatus: [
  //   ['tab.analytics.chart.learner.enrollment.status', 'tab.analytics.chart.learner.enrollment.status.message'],
  //   ['tab.analytics.chart.learner.enrollment.status.enrolled', Math.abs(state.dashboardAnalytics.number_of_users - state.dashboardAnalytics.enrolled_learners)],
  //   ['tab.analytics.chart.learner.enrollment.status.not.enrolled', state.dashboardAnalytics.enrolled_learners],
  // ],
  analyticsData: state.dashboardAnalytics,
  enrollments: EnterpriseDataApiService.fetchCourseEnrollments(state.portalConfiguration.enterpriseId),

});


const mapDispatchToProps = dispatch => ({
  fetchDashboardAnalytics: (enterpriseId) => {
    dispatch(fetchDashboardAnalytics(enterpriseId));
  },
  clearDashboardAnalytics: () => {
    dispatch(clearDashboardAnalytics());
  },

});


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PlotlyAnalyticsPage));
