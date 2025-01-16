export default function getToken() {
    const user = localStorage.getItem("userId");
    if (!user) return null;
  
    try {
      const userObj = JSON.parse(user);
      return userObj.token; // Return token if it exists
    } catch (error) {
      console.error("Error parsing user token:", error);
      return null;
    }
  }
  