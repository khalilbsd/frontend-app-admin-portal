import { Hyperlink, Image } from '@edx/paragon'
import React from 'react'
import { getConfig } from '@edx/frontend-platform';
import { breakpoints, useWindowSize } from '@edx/paragon';
import messages from './messages'
import { injectIntl } from '@edx/frontend-platform/i18n';
import './Footer.scss';

const Footer = ({intl}) => {

  const windowWidth = useWindowSize().width;
  const wideScreen = windowWidth >= breakpoints.large.minWidth;

  const locations = [
    { label: intl.formatMessage(messages.tunisia), location: 'L’immeuble sis au 3, rue Ibn Nafis, zone industrielle khereddine LAC 3, La goulette', phone: '+216 26 641 620', email: 'pro@groupado.com' },
    { label: intl.formatMessage(messages.dubai), location: 'Business Bay, The Oberai; Office No, 904 Dubai, UAE', phone: '+971 551911059', email: 'pro@groupado.com' },
    { label: intl.formatMessage(messages.ivoryCost), location: 'Abidjan', phone: '+2250546256408', email: 'pro@groupado.com' },
  ]
  const pages = [
    { label: intl.formatMessage(messages.home), path: '/' },
    { label: intl.formatMessage(messages.courses), path: '/courses' },
    { label: intl.formatMessage(messages.about), path: '/about' },
    { label: intl.formatMessage(messages.contact), path: '/contactus' }
  ]
  const policy = [
    { label: intl.formatMessage(messages.privacy), path: '/privacy' },
    { label: intl.formatMessage(messages.tos), path: '/tos' },
    { label: intl.formatMessage(messages.cookies), path: '/cookies' }
  ]
  return (
    <footer className={"footer"}>
      <div className={"logoContainer"}>
        <Hyperlink destination={getConfig().MARKETING_SITE_BASE_URL}>
          <Image className="logo " alt={getConfig().SITE_NAME} src={getConfig().LOGO_URL} />
        </Hyperlink>
      </div>
      <div className={"footerContent"}>
        {locations.map((location, index) => (
          <div key={index} className={`section ${!wideScreen ? 'small' : 'large'}`}>
            <h2 className={"sectionHeading"}>{location.label}</h2>
            <p className={"sectionSubHeadingLocation"}>{location.location}</p>
            <p className={"sectionSubHeadingPhone"}>{location.phone}</p>
            <p className={"sectionSubHeadingPhone"}>{location.email}</p>
          </div>

        ))}

        <div className={`section ${!wideScreen ? 'small' : 'large'}`}>
          <h2 className={"sectionHeading"}>Pages</h2>
          <ol className={"list"}>
            {pages.map((page, index) => (
              <li >
                <a className={"link"} key={index} href={page.path}>
                  {page.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
        <div className={`section ${!wideScreen ? 'small' : 'large'}`}>
          <h2 className="sectionHeading">Policy and terms</h2>
          <ol className="list">
            {policy.map((policy, index) => (
              <li >
                <a className="link" key={index} href={policy.path}>
                  {policy.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </footer>
  )
}

export default injectIntl(Footer)