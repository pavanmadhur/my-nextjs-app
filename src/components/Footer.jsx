import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 My Website. All Rights Reserved.</p>
    </footer>
  );
}

const footerStyle = {
  textAlign: 'center',
  padding: '1rem',
  backgroundColor: '#333',
  color: 'white',
};

export default Footer;
