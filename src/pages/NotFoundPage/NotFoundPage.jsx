import { Link } from 'react-router';

export default function NotFoundPage() {
    return (
        <div>
            <p>
                404 Not Found this page! Please follow this {''}
                <Link to="/movies">link</Link>
            </p>
        </div>
    );
}