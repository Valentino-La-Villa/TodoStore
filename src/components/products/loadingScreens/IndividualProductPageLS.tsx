import { CircularProgress, Skeleton } from "@mui/material";

export default function LoadingScreenIndividualProductPage() {
    return (
        <div className="p-2 p-sm-0">

            <Skeleton className="ms-4 mt-4 bg-dark" width='200px' height='70px'/>

            <div className="container mt-5 border border-2 border-secondary rounded-3 p-4">
                <div className="row">

                    <div className="col-12 col-md-4 d-flex justify-content-center">
                        <div className="w-100 d-flex align-items-center justify-content-center border border-primary border-4 rounded-1 bg-primary"
                            style={{height: '350px'}}>
                            <CircularProgress className="text-white" />
                        </div>
                    </div>

                    <div className="col-12 col-md-8 mt-4 mt-md-0">

                        <div className="d-flex flex-column justify-content-between h-100">
                            
                            <div>
                                <h1 className="individualProductPage__title"><Skeleton width='40%' height='70px' className="bg-dark"/></h1>


                                <p className="mb-4"><Skeleton className="bg-success" width='50px' height='30px'/></p>

                                <p className="individualProductPage__descriptionText mb-3 text-secondary"><Skeleton /><Skeleton /><Skeleton /></p>
                            </div>
                            
                            <h1 className="individualProductPage__title"><Skeleton width='20%' height='70px' className="bg-primary"/></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}