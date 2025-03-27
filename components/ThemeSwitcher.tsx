import { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Set the theme attribute on the document element
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="p-2 rounded border"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="custom">Custom</option>
    </select>
  );
};

export default ThemeSwitcher; 