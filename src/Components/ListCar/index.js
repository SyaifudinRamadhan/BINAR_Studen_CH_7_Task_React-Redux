import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListCar } from '../../actions/CarAction';


function ListCar() {

    const { getListCarData, getListCarLoading, getListCarErr } = useSelector(state => state.carReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListCar())
    }, [dispatch])

    return (
        <div className='container mt-5'>
            <div className='row'>
                {
                    getListCarData ? getListCarData.map(car => {
                        return (
                            <div key={car.id} className='col-md-4'>
                                <div className="card" style={{ width: "18rem" }}>
                                    <img src={`https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/public/images/${car.image.split('/')[2]}`} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{car.manufacture}</h5>
                                        <p className="card-text">{car.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : getListCarLoading ? (
                        <p>Loading data ....</p>
                    ) : (
                        <p>{getListCarErr ? getListCarErr : 'Data Kosong'}</p>
                    )
                }
            </div>
        </div>
    );
}

export default ListCar;