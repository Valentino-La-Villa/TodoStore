import { ChangeEvent, ReactElement } from "react"
import { ClothingSize } from "../../../data/generalDatabase"

type Props = {
    availableSizes: ClothingSize[],
    setSelectedSize: React.Dispatch<React.SetStateAction<ClothingSize | "non-applicable" | "unselected">>,
    availableSizesDropdownMenu: ReactElement | ReactElement[] | undefined
}

export default function AvailableSizesInterface(props: Props) {

    const handleSizeSelection=(event: ChangeEvent)=>{
        props.setSelectedSize((event.target as HTMLSelectElement).value as ClothingSize | 'unselected') // Using a type assertion because all values corresponding to the optionElements that will trigger this function will only contain values corresponding to the type provided
    }

    return (
        <section>
            <select onChange={handleSizeSelection} className="form-select d-flex py-0" style={{width: '150px', height: '30px'}} name="" id="">
                <option value={'unselected'} defaultValue={'unselected'}>Choose a size</option>
                {props.availableSizesDropdownMenu}
            </select>

            <span className="individualProductPage__availableSizes mb-2">Currently available size/s for this clothing: {props.availableSizes.map(size => <span key={size} className="me-1">{size}</span>)}</span>
        </section>
    )
}