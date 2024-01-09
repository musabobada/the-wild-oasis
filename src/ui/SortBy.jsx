import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentSortBy = searchParams.get("sortBy") || ""
    function handleChange(value) {
        searchParams.set("sortBy", value)
        setSearchParams(searchParams)
    }
    return <Select
        value={currentSortBy}
        options={options}
        type="white"
        onChange={(e) => handleChange(e.target.value)} />
}