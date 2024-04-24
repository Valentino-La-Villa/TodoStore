import { ChangeEvent, Dispatch, MouseEvent, ReactElement, SetStateAction, useRef, useState } from "react"
import { ItemType } from "../../../data/generalDatabase"
import { ClickAwayListener, Popper } from "@mui/material"

export type TypeFilterForm = Record<ItemType, boolean>

export type ProductFilter = {
    searchbar: string,
    typeFilter: TypeFilterForm
}

type Props = {
    productFilter: ProductFilter
    setProductFilter: Dispatch<SetStateAction<ProductFilter>>
}

export default function ProductFiltering(props: Props) {
    
    const handleSearchBarText =(event: ChangeEvent<HTMLInputElement>)=> {
        props.setProductFilter(prev => { return (
            {...prev,
                searchbar: event.target.value
            }
        )})
    }

    const handleTypeFilterForm =(event: ChangeEvent<HTMLInputElement>)=> {
        const value: ItemType = event.target.value as ItemType
        props.setProductFilter(prev => ({
            ...prev,
            typeFilter: {
                ...prev.typeFilter,
                [value]: event.target.checked as boolean
            }
        }))
    }

    const [anchorElForPopper, setAnchorElForPopper] = useState<null | HTMLElement>(null);
    const popperButton = useRef(null)

    const handlePopper = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault()
        setAnchorElForPopper(anchorElForPopper ? null : popperButton.current);
    };
    
    const isPopperOpen = Boolean(anchorElForPopper);

    const typeFilter: ReactElement = 
    <div className="transitionForProductTypeFilter">
        <div className="border border-1 border-black p-2 bg-white rounded-1">
            <div className="d-flex flex-column align-items-end py-2 ps-3 fw-semibold text-secondary">

                <label className="getTargetPointer" htmlFor="productTypeShirts">
                    <span style={{fontFamily: "Montserrat"}}>Shirts</span>
                    <input className="getTargetPointer me-3 ms-1" checked={props.productFilter.typeFilter.shirt} onChange={handleTypeFilterForm} value={'shirt'} id="productTypeShirts" type="checkbox" />
                </label>

                <label className="getTargetPointer" htmlFor="productTypePants">
                    <span style={{fontFamily: "Montserrat"}}>Pants</span>
                    <input className="getTargetPointer me-3 ms-1" checked={props.productFilter.typeFilter.pants} onChange={handleTypeFilterForm} value={'pants'} id="productTypePants" type="checkbox" />
                </label>

                <label className="getTargetPointer" htmlFor="productTypeHoodies">
                    <span style={{fontFamily: "Montserrat"}}>Hoodies</span>
                    <input className="getTargetPointer me-3 ms-1" checked={props.productFilter.typeFilter.hoodie} onChange={handleTypeFilterForm} value={'hoodie'} id="productTypeHoodies" type="checkbox" />
                </label>

                <label className="getTargetPointer" htmlFor="productTypeWatches">
                    <span style={{fontFamily: "Montserrat"}}>Watches</span>
                    <input className="getTargetPointer me-3 ms-1" checked={props.productFilter.typeFilter.watch} onChange={handleTypeFilterForm} value={'watch'} id="productTypeWatches" type="checkbox" />
                </label>

                <label className="getTargetPointer" htmlFor="productTypeOther">
                    <span style={{fontFamily: "Montserrat"}}>Other</span>
                    <input className="getTargetPointer me-3 ms-1" checked={props.productFilter.typeFilter.other} onChange={handleTypeFilterForm} value={'other'} id="productTypeOther" type="checkbox" />
                </label>
            </div>
        </div>
    </div>

    return (
        <form className="container rounded-3 border border-1 border-primary p-4 my-3" style={{backgroundColor: '#d9e3f2'}}>
            <div className="row d-flex align-items-center row-gap-4">

                <div className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex align-items-center">
                    <input className="input-group-text w-100 text-start" type="text" value={props.productFilter.searchbar} onChange={handleSearchBarText} placeholder='Search for a particular item' />
                </div>

                <div className="col-12 col-md-6 col-lg-8 col-xl-9 h-100 justify-content-end d-flex">
                    
                    <button ref={popperButton} className="btn btn-primary" onClick={handlePopper}>Filter by product type ↓</button>

                    <Popper placement="bottom-end" open={isPopperOpen} anchorEl={anchorElForPopper}>
                        <ClickAwayListener onClickAway={()=>{setAnchorElForPopper(null)}}>
                                    {typeFilter}
                        </ClickAwayListener>
                    </Popper>
                </div>
            </div>
        </form>
    )
}