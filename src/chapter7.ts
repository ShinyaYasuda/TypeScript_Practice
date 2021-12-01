type UserID = string
type UserData = {
    ID: UserID,
    FriendIDs: UserID[] | null,
    UserName: string 
}
class API {
    private userdata: UserData[]
    private loginUser: UserData
    constructor() {
        this.userdata = [
            {ID: "123456", FriendIDs: ["111111"], UserName: "Tanaka Taro"},
            {ID: "111111", FriendIDs: ["111111","222222"], UserName: "Yamada Hanako"},
            {ID: "222222", FriendIDs: ["111111"], UserName: "John Tylor"},
            {ID: "333333", FriendIDs: null, UserName: "Nicola"}
        ]
        this.loginUser = this.userdata[1]
    }
    getLoggedInUserID(): UserID{
        return this.loginUser.ID
    }
    getFriendIDs(userID: UserID): UserID[] | null {
        let finddata = this.userdata.find( ({ ID }) => ID === userID)
        if (!finddata){
            throw new EvalError("No Data Exists")
        }
        return finddata.FriendIDs
    }
    getUserName(userID: UserID): string {
        let finddata = this.userdata.find( ({ ID }) => ID === userID)
        if (!finddata){
            throw new EvalError("No Data Exists")
        }
        return finddata.UserName
    }
}

let clsAPI = new API
try{
    clsAPI.getFriendIDs("111111")
}catch(e){
    if (e instanceof EvalError) {
        console.info(e.message)
    }else{
        throw e
    }
}