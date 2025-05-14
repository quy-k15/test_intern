import React from 'react';

// Hàm để tạo màu hex từ tên
const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - color.length) + color;
};

const UserAvatar = ({ name }) => {
  const backgroundColor = stringToColor(name);
  const textColor = '#FFFFFF';

  const url = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=${backgroundColor.slice(1)}&color=${textColor.slice(1)}`;

  return (
    <img
      src={url}
      alt={name}
      width={32}
      height={32}
      style={{ borderRadius: '50%' }}
    />
  );
};

export default UserAvatar;
