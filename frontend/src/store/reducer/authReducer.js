import { toast } from "react-toastify";
import jwtDecode, { JwtDecode } from "jwt-decode";

const initialState = {
    token : localStorage.getItem("token"),
    name : "",
    email : "",
    _id : ""
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case "USER_LOADED" :  
        case "SIGN_IN" :
        case "SIGN_UP" :
            toast("Welcome...", {
                position : toast.POSITION.BOTTOM_CENTER
            });
            const user = jwtDecode(action.token);
            return {
                ...state,
                token : action.token,
                name : user.name,
                email : user.email,
                _id : user._id,
            }
        case "SIGN_OUT" :
            localStorage.removeItem("token");
            toast("Bye...", {
                position : toast.POSITION.BOTTOM_CENTER
            });
            return {
                token : "",
                name : "",
                email : "",
                _id : "",
            }
        default : 
            return state;
    }
};

export default authReducer;