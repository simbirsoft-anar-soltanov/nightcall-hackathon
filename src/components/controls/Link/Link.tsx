import { Link } from 'react-router-dom';

const CustomLink = ({ children, to }: { children: any; to: string }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      {children}
    </Link>
  );
};

export default CustomLink;
