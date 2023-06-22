import React, { useContext, useEffect, useState } from 'react'
import PlotlyAnalyticsPage from './PlotlyAnalyticsPage'
import { useSubscriptionFromParams } from '../subscriptions/data/contextHooks';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useSubscriptionData } from '../subscriptions/data/hooks';
import { SubscriptionContext } from '../subscriptions/SubscriptionData';


const AnalyticsPage = ({ enterpriseId, enterpriseSlug }) => {
    const [subscriptionUUID, setSubscriptionUUID] = useState(undefined)
    const {
        subscriptions,
        errors,
        setErrors,
        forceRefresh,

    } = useSubscriptionData({ enterpriseId });



    useEffect(() => {
        setSubscriptionUUID(subscriptions?.results[0]?.uuid);
    }, [subscriptions])


    return (
        // <h1>khalil</h1>
        // <SubscriptionDetailContextProvider subscription={subscription}>
            <PlotlyAnalyticsPage subscriptionUUID={subscriptionUUID}/>
        // </SubscriptionDetailContextProvider>
    )
}


AnalyticsPage.propTypes = {
    // match: PropTypes.shape({
    //   params: PropTypes.shape({
    //     subscriptionUUID: PropTypes.string.isRequired,
    //   }).isRequired,
    // }).isRequired,
    enterpriseSlug: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    enterpriseSlug: state.portalConfiguration.enterpriseSlug,
    enterpriseId: state.portalConfiguration.enterpriseId,
});

export default connect(mapStateToProps)(AnalyticsPage)