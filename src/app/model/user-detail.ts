export class UserDetail {
    user: User;
    listOfFavouritedPatients: any[];
    listOfNonFavouritedPatients: any[];
    lastLoginDateTime: Number;
    isLastOrCurrent: string;
}
export class User {
    id: Number;
    username: string;
    userId: string;
    name: string;
    contactNumber: string;
    email: string;
    enabled: boolean;
    masked: boolean;
    authorities: [{ name: string }];
    onlineStatus: boolean;
}
