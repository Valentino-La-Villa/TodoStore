import { CircularProgress, Skeleton } from "@mui/material"
import { nanoid } from "nanoid"

export default function LoadingScreenProducts() {

    const finalDisplay = [1, 2, 3, 4, 5, 6, 7, 8].map(()=>{ return (

        <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2 d-flex justify-content-center" // Column placement is handled up here
            key={nanoid()}>
                <div className="card" style={{width: "18rem", height: '32rem', position: "relative", // Position relative is needed for the grey filter on disabled items
                    pointerEvents: 'none'
                }}
                >
                    <div style={{height: '65%'}}>

                    <div className="card-img-top shadow object-fit-cover img-fluid h-100 d-flex justify-content-center align-items-center bg-secondary">
                        <CircularProgress className="text-white" /></div>
                    </div>

                    <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                        <h5 className="card-title"><Skeleton width='90%' className="bg-secondary"/></h5>

                            <p className="card-text text-success pb-3 fw-bold">
                                <Skeleton className="bg-success" width='40px' height='25px'/>
                            </p>
                        </div>



                        <div className="d-flex justify-content-end align-items-center">
                            <Skeleton className="bg-primary" width='35px' height='55px' />
                        </div>

                    </div>
                </div>

            </div>

    )})

    return (
        <>
        {finalDisplay}
        </>
    )
}