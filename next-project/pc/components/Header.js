import Link from 'next/link';

export default () => (
  <header>
    header <Link href={'/about'}><a>About</a></Link>
    <style jsx>{`
      header {
        height: 5%;
      }
    `}</style>
  </header>
);
