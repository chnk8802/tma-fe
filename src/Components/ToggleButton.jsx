import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

function ToggleCheckButton() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('isDarkTheme') === 'true');

  const handleDark = (e) => {
    const value = e.target.checked;
    localStorage.setItem('isDarkTheme', value);
    setIsDark(value);
  };

  useEffect(() => {
    const html = document.getElementById('htmlMain');
    if (isDark) {
      html.setAttribute('data-bs-theme', 'dark');
    } else {
      html.setAttribute('data-bs-theme', 'light')
    }
  })

  return (
    <Form>
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        defaultChecked={isDark}
        onClick={handleDark}
      />
    </Form>
  );
}

export default ToggleCheckButton;