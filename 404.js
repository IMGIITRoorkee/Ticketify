import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '3em', marginBottom: '20px' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.5em', marginBottom: '20px' }}>
        Oops! The page you’re looking for does not exist or might have been moved.
      </p>
      <Link href="/">
        <a style={{ fontSize: '1.2em', color: '#0070f3', textDecoration: 'none' }}>
          Go back to Home
        </a>
      </Link>
    </div>
  );
}
