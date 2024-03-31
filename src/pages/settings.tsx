// pages/settings.tsx
import React from 'react';
import Link from 'next/link';

const Settings = () => {
  return (
    <div>
      <h1>Settings</h1>
      {/* Settings content goes here */}
      <Link href="/">
        <p>Back to Playground</p>
      </Link>
    </div>
  );
};

export default Settings;
