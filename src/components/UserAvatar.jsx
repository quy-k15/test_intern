import React from 'react';

const UserAvatar = ({ name }) => {
  const url = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;
  return <img src={url} alt={name} width={32} height={32} style={{ borderRadius: '50%' }} />;
};

export default UserAvatar;
