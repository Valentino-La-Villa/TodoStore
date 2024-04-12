import { ChangeEvent, ReactElement } from "react"
import { Item, availableSizesList } from "../../../data/generalDatabase"

type Props = {
    currentProduct: Item,
    selectedSize: keyof typeof availableSizesList | 'non-applicable' | 'unselected',
    setSelectedSize: React.Dispatch<React.SetStateAction<"XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | "non-applicable" | "unselected">>,
    availableSizesDropdownMenu: ReactElement | ReactElement[] | undefined
}

export default function AvailableSizesInterface(props: Props) {

    const handleSizeSelection=(event: ChangeEvent)=>{
        props.setSelectedSize((event.target as HTMLSelectElement).value as keyof typeof availableSizesList | 'unselected') // Using a type assertion because all values corresponding to the optionElements that will trigger this function will only contain values corresponding to the type provided
    }

    return <>
    {props.currentProduct.availableSizes === 'non-applicable' ? // Available sizes interface

        <>{props.selectedSize == 'non-applicable' ? false : props.setSelectedSize('non-applicable')}</> // If the item rendered doesn't need a size selection, instead of rendering the size selection interface, we directly set selectedSize to 'non-applicable' (it needs to be a ternary in order not to cause an infinite loop)

        :
        
        <>
            <select onChange={handleSizeSelection} className="form-select d-flex py-0" style={{width: '150px', height: '30px'}} name="" id="">
                <option value={'unselected'} defaultValue={'unselected'}>Choose a size</option>
                {props.availableSizesDropdownMenu}
            </select>

            <span className="individualProductPage__availableSizes mb-2">Currently available size/s for this clothing: {props.currentProduct.availableSizes.map(size => <span key={size} className="me-1">{size}</span>)}</span>
        </>
    }
    </>
}