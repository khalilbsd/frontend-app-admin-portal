import React from 'react';
import PropTypes from 'prop-types';

import NumberCard from '../NumberCard';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

class AdminCards extends React.Component {
  constructor(props) {
    super(props);

    this.cards = {
      numberOfUsers: {
        ref: React.createRef(),
        description: 'tab.progress.report.cards.numberOfUsers.description',
        iconClassName: 'fa fa-users',
        actions: [{
          label: 'tab.progress.report.cards.numberOfUsers.actions.label',
          slug: 'registered-unenrolled-learners',
        }],
      },
      enrolledLearners: {
        ref: React.createRef(),
        description: 'tab.progress.report.cards.enrolledLearners.description',
        iconClassName: 'fa fa-check',
        actions: [{
          label: 'tab.progress.report.cards.enrolledLearners.label.enrolled.learners',
          slug: 'enrolled-learners',
        }, {
          label: 'tab.progress.report.cards.enrolledLearners.label.enrolled.learners.inactive.course',
          slug: 'enrolled-learners-inactive-courses',
        }],
      },
      activeLearners: {
        ref: React.createRef(),
        description: 'tab.progress.report.cards.activeLearners.description',
        iconClassName: 'fa fa-eye',
        actions: [{
          label: 'tab.progress.report.cards.activeLearners.label.learners.active.week',
          slug: 'learners-active-week',
        }, {
          label: 'tab.progress.report.cards.activeLearners.label.learners.inactive.week',
          slug: 'learners-inactive-week',
        }, {
          label: 'tab.progress.report.cards.activeLearners.label.learners.inactive.month',
          slug: 'learners-inactive-month',
        }],
      },
      courseCompletions: {
        ref: React.createRef(),
        description: 'tab.progress.report.cards.courseCompletions.description',
        iconClassName: 'fa fa-trophy',
        actions: [{
          label: 'tab.progress.report.cards.courseCompletions.label.completed.courses',
          slug: 'completed-learners',
        }, {
          label: 'tab.progress.report.cards.courseCompletions.label.completed.courses.week',
          slug: 'completed-learners-week',
        }],
      },
    };
  }

  renderCard({ title, cardKey,intl }) {
    const card = this.cards[cardKey];

    return (
      <div
        className="col-xs-12 col-md-6 col-xl-3 mb-3 d-flex"
        key={cardKey}
      >
        <NumberCard
          id={cardKey}
          title={title}
          description={intl.formatMessage(messages[card.description])}
          iconClassName={card.iconClassName}
          detailActions={card.actions}
        />
      </div>
    );
  }

  render() {
    const {
      activeLearners,
      numberOfUsers,
      courseCompletions,
      enrolledLearners,
      intl
    } = this.props;

    const data = {
      activeLearners: activeLearners.past_week,
      numberOfUsers,
      courseCompletions,
      enrolledLearners,
    };

    return Object.keys(this.cards).map(cardKey => (
      this.renderCard({
        title: data[cardKey],
        cardKey,
        intl
      })
    ));
  }
}

AdminCards.propTypes = {
  activeLearners: PropTypes.shape({
    past_week: PropTypes.number.isRequired,
    past_month: PropTypes.number.isRequired,
  }).isRequired,
  numberOfUsers: PropTypes.number.isRequired,
  courseCompletions: PropTypes.number.isRequired,
  enrolledLearners: PropTypes.number.isRequired,
};

export default (injectIntl(AdminCards));
