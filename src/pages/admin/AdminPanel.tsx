// Update the handleLogin function in AdminPanel.tsx
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoginError('');
  const success = await login();
  if (!success) {
    setLoginError('Invalid credentials');
  }
};

export default handleLogin