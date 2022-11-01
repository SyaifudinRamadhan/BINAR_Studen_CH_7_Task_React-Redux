import axios from "axios";

export const GET_LIST_CAR = "GET_LIST_CAR";

export function getListCar(){

    return (dispatch) => {

        // Set data loading untuk dipassing ke reducers
        dispatch({
            type: GET_LIST_CAR,
            payloads: {
                loading: true,
                data: false,
                errMsg: false
            }
        });

        // Lakukan get data ke server dan ubah isi dispatchnya
        axios({
            method: "GET",
            url: "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json",
            timeout: 20000
        }).then(response => {
            // Jika berhasil / gagal, update data dispatch
            dispatch({
                type: GET_LIST_CAR,
                payloads: {
                    loading: false,
                    data: response.data,
                    errMsg: false
                }
            })
        }).catch(err => {
            dispatch({
                type: GET_LIST_CAR,
                payloads: {
                    loading: false,
                    data: false,
                    errMsg: err.message
                }
            })
        })
    }

}