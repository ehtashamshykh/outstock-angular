import { Injectable } from "@angular/core";
import { environment } from "src/envirornments/environment";
import { Amplify } from 'aws-amplify';
import { signIn, signOut, signUp, confirmSignUp, getCurrentUser, updatePassword, deleteUser, resetPassword, confirmResetPassword, fetchAuthSession } from 'aws-amplify/auth';
import { BehaviorSubject } from "rxjs";

interface ICognitoUserPoolData { UserPoolId: string; ClientId: string }

@Injectable({
  providedIn: "root",
})

export class AuthenticateService {
  userPool: ICognitoUserPoolData;

  readonly _isUserSignedIn = new BehaviorSubject(false);
  readonly isUserSignedIn = this._isUserSignedIn.asObservable();

  constructor() {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: environment.awsCognito.userPoolId,
          userPoolClientId: environment.awsCognito.userPoolClientId,
          signUpVerificationMethod: 'code',
          loginWith: { username: true, email: true }
        }
      }
    });

    const poolData: ICognitoUserPoolData = {
      UserPoolId: environment.awsCognito.userPoolId,
      ClientId: environment.awsCognito.userPoolClientId,
    };

    this.userPool = poolData;
  }

  signUp(username: string, password: string): Promise<any> {
    return signUp({ username, password})
  }

  confirmSignUp(username: string, confirmationCode: string): Promise<any> {
    return confirmSignUp({username, confirmationCode});
  }

  signIn(username: string, password: string): Promise<any> {
    return signIn({username, password});
  }

  signOut(): Promise<any> {
    return signOut();
  }

  getCurrentUser(): Promise<any> {
    return getCurrentUser();
  }

  changePassword(oldPassword: any, newPassword: any): Promise<any>{
    return updatePassword({ oldPassword, newPassword });
  }

  deleteUser(): Promise<any> {
    return deleteUser();
  }

  resetPassword(username: string): Promise<any> {
    return resetPassword({username});
  }

  confirmPassword(username: string, newPassword: any, confirmationCode: string): Promise<any> {
    return confirmResetPassword({username, newPassword, confirmationCode});
  }

  fetchAuthSession(){
    return fetchAuthSession({
      forceRefresh: true
    });
  }
}