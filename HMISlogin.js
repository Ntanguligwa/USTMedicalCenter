// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Get the login form
  const loginForm = document.querySelector('.login-form');
  
  // Remove the old form action (prevent page reload)
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
});

// Handle login
async function handleLogin(event) {
  // Prevent the form from submitting normally
  event.preventDefault();
  
  // Get username and password
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Show loading state (optional)
  const loginButton = document.querySelector('.button');
  const originalText = loginButton.textContent;
  loginButton.textContent = 'Logging in...';
  loginButton.disabled = true;
  
  try {
    // Check if it's an email (contains @) or just username
    let email = username;
    if (!username.includes('@')) {
      // Convert username to email format
      email = username + '@ustclinic.com';
    }
    
    // Sign in with Firebase
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    
    // Get the user
    const user = userCredential.user;
    
    // Get user role from Firestore
    const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
    
    if (userDoc.exists) {
      const userData = userDoc.data();
      
      // Store user info in session
      sessionStorage.setItem('userId', user.uid);
      sessionStorage.setItem('userRole', userData.role);
      sessionStorage.setItem('userEmail', user.email);
      
      // Redirect based on role
      switch(userData.role) {
        case 'admin':
          window.location.href = 'clinichomepage.html';
          break;
        case 'doctor':
          window.location.href = 'clinichomepage.html';
          break;
        case 'reception':
          window.location.href = 'clinichomepage.html';
          break;
        default:
          window.location.href = 'clinichomepage.html';
      }
    } else {
      // If no role document, still go to homepage
      window.location.href = 'clinichomepage.html';
    }
    
  } catch (error) {
    // Handle errors
    console.error('Login error:', error);
    
    let errorMessage = 'Login failed. ';
    switch(error.code) {
      case 'auth/user-not-found':
        errorMessage += 'User not found.';
        break;
      case 'auth/wrong-password':
        errorMessage += 'Wrong password.';
        break;
      case 'auth/invalid-email':
        errorMessage += 'Invalid email format.';
        break;
      default:
        errorMessage += error.message;
    }
    
    alert(errorMessage);
    
    // Reset button
    loginButton.textContent = originalText;
    loginButton.disabled = false;
  }
}

// Check if user is already logged in
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in, but we're on login page - maybe redirect?
    // Only redirect if we're on the login page
    if (window.location.pathname.includes('HMISlogin')) {
      window.location.href = 'clinichomepage.html';
    }
  }
});


