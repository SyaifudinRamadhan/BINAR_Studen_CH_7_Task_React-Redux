import { GET_LIST_CAR } from "../../actions/CarAction";

const initialState = {
    getListCarData: false,
    getListCarLoading: false,
    getListCarErr: false
}

const car = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_CAR:
            return{
                ...state,
                getListCarData: action.payloads.data,
                getListCarLoading: action.payloads.loading,
                getListCarErr: action.payloads.errMsg
            }
        default:
            return state;
    }
}

export default car;