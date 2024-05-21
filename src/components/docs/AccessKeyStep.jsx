import { Link } from 'react-router-dom';

export default function AccessKeyStep() {
  return (
    <div>
      Navigate to the{' '}
      <Link
        className='text-brand-primary underline'
        to='https://app.solarmoonanalytics.com/profile'
      >
        user profile section
      </Link>
      &nbsp;and locate the access key underneath the API Information section.
      Copy this for usage later.
    </div>
  );
}
