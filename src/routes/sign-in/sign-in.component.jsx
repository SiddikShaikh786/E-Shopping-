// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import  SignUpForm  from "../../components/sign-up-form/sign-up-form.component";
import {
  // auth,
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
  // signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  // useEffect(() => {
  //   const usEffect = async () => {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   };
  //   usEffect();
  // }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <button onClick={logGoogleUser}>Sign-in with Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign-in with Google Redirect
      </button> */}
      <SignUpForm />
    </div>
  );
};

export default SignIn;
