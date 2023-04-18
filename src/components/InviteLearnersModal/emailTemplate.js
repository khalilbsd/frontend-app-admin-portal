import { getSubscriptionContactText } from '../../utils';

const emailTemplate = {
  greeting: 'invite.learners.modal.add.users.email.template.greetings.text',
  body: `invite.learners.modal.add.users.email.template.body.text`,
  closing: getSubscriptionContactText,
};

export default emailTemplate;
