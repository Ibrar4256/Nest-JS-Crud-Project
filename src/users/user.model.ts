export interface User{
    id: String;
    name: String;
    email: String;
    password: String;
    account_status: AccountStatus;
}

enum AccountStatus{
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    NOTAPPROVED = 'NOTAPPROVED'
}