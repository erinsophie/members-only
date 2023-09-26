import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="text-lg p-10">
      <p>Error: Page cannot be found</p>
      <Link to="/" className="underline">
        Go back
      </Link>
    </div>
  );
}

export default Error;