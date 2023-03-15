import { toast } from "react-toastify";

class ApiUserServices {
  BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
  static getInstance() {
    return new ApiUserServices();
  }

  UserSignUp = async (credentials) => {
    console.log(
      "3, getting userdata(credentials) through asyncAuthReducer",
      credentials
    );
    const response = await fetch(
      this.BASE_URL + "signUp?key=AIzaSyDkvXNNEN-uFtQCbnesaM1VpiBnannPs4k",
      {
        method: "POST",
        body: JSON.stringify({
          email: credentials.data.email,
          password: credentials.data.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const userData = await response.json();
      toast.success("SignUp SuccessFully, Go to Login")
      return userData;
    } else {
      const userData = await response.json();
      let errorMessage = "SignUp-Failed";
      if (userData && userData.error && userData.error.message) {
        errorMessage = userData.error.message;
        toast.error(errorMessage);
      }
    }
  };

  UserLogin = async (credentials) => {
    console.log(
      "3, getting userdata(credentials) through asyncAuthReducer",
      credentials
    );
    const response = await fetch(
      this.BASE_URL +
        "signInWithPassword?key=AIzaSyDkvXNNEN-uFtQCbnesaM1VpiBnannPs4k",
      {
        method: "POST",
        body: JSON.stringify({
          email: credentials.data.email,
          password: credentials.data.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const userData = await response.json();
      toast.success("Login SuccessFully")
      return userData;
    } else {
      const userData = await response.json();
      let errorMessage = "Login Failed";
      if (userData && userData.error && userData.error.message) {
        errorMessage = userData.error.message;
        toast.error(errorMessage);
      }
    }
  };

  forgottPassword = async (email) => {
    const response = await fetch(
      this.BASE_URL + "sendOobCode?key=AIzaSyDkvXNNEN-uFtQCbnesaM1VpiBnannPs4k",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const userForgotData = await response.json();
      return userForgotData;
    }
  };

  getUserData = async () => {
    const idToken = localStorage.getItem("idToken");
    const response = await fetch(
      this.BASE_URL + "lookup?key=AIzaSyDkvXNNEN-uFtQCbnesaM1VpiBnannPs4k",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const getData = await response.json();
      console.log("4, api service get data", getData);
      return getData;
    }
  };

  updateUserProfile = async (profileData) => {
    console.log("3, profileData at apiService", profileData);
    const idToken = localStorage.getItem("idToken");
    const response = await fetch(
      this.BASE_URL + "update?key=AIzaSyDkvXNNEN-uFtQCbnesaM1VpiBnannPs4k",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
          displayName: profileData.displayName,
          photoUrl: profileData.photoUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
         console.log("44", response)
    if (response.ok) {
      const userprofileData = await response.json();
     toast.success("Profile Updated")
      return userprofileData;
    }
  };
}

export const apiUserService = ApiUserServices.getInstance();
