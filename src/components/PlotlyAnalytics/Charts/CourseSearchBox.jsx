import React from 'react'
import { Form } from '@edx/paragon';
import messages from '../../Admin/messages';
import { injectIntl } from '@edx/frontend-platform/i18n';



const CourseSearchBox = ({handleChange,initialValue,intl,courses}) => {





  return (
    <Form.Group>
    <Form.Label className="search-label mb-2">{intl.formatMessage(messages['tab.progress.report.data.filter'])}</Form.Label>
    <Form.Control
      className="w-100"
      as="select"
      value={initialValue}
      onChange={handleChange}
    >
      <option value="">{intl.formatMessage(messages['tab.progress.report.data.filter.all.courses'])}</option>
      {courses.map(course => (
        <option
          value={course.courseKey}
          key={course.courseKey}
        >
          {course.courseTitle}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
  )
}

export default (injectIntl(CourseSearchBox))