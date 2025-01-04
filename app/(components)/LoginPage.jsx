import React, { useEffect } from 'react';

const GoogleLogin = () => {
  // Handle Google OAuth credential response
  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token:", response.credential);
    // Send the token to your backend for verification
    fetch("https://yourdomain.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: response.credential }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Redirect to the dashboard or another page on successful login
        window.location.href = "/dashboard";
      } else {
        alert("Login failed. Please try again.");
      }
    });
  };

  useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
      // Initialize Google Sign-In client
      window.google.accounts.id.initialize({
        client_id: '{YOUR_CLIENT_ID}',
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.prompt(); // Show the One Tap prompt automatically
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script after the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.logo}>Ticketify</div>
      <div
        id="g_id_onload"
        data-client_id="{YOUR_CLIENT_ID}"
        data-login_uri="https://yourdomain.com/oauth2callback"
        data-auto_prompt="false"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      ></div>
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
};

export default GoogleLogin;
