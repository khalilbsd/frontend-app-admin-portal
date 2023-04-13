import { Card } from '@edx/paragon'
import React from 'react'
import messages from '../messages'
import { injectIntl } from '@edx/frontend-platform/i18n'
import { Chart } from "react-google-charts";




const PieChart = (props) => {

    const { title, intl,data } = props
    const options = {
        title: intl.formatMessage(messages[title]),
        colors:['#2ce4b4','#1a46de'],

    };
    return (
        <Card>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />

        </Card>
    )
}

export default (injectIntl(PieChart))