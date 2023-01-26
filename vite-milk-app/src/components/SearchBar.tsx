import React, { useState, useRef, useEffect } from 'react'
import oneProduct from '../interfaces/one-product'

const SearchBar = (props: Array<oneProduct>) => {
    const [allData, setAllData] = useState<oneProduct[]>([]);
    const [filteredData, setFilteredData] = useState<oneProduct[]>([]);
    const [wordEntered, setWordEntered] = useState<string>("")

    // console.log(!!Object.values(props).length, '1')
    // console.log(Object.values(props), '2')

    useEffect(() => {
        if (!allData.length) {
            setAllData(Object.values(props));
            console.log('first')
        }
        console.log(allData, 'allData')
    }, [allData])

    useEffect(() => {
        if (!!allData) {
            setFilteredData(allData);
        }
        console.log(filteredData, 'filterdDATA')
    }, [])


    const inputRef: React.RefObject<HTMLInputElement> =
        useRef<HTMLInputElement>(null)
    window.addEventListener("load", () => inputRef.current?.focus())

    function filterItems(arr: oneProduct[], query: string) {
        return arr.filter((el) => el.name.toLowerCase().includes(query.toLowerCase()));
    }

    const handleFilter = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>): void => {
        const searchWord: string = target.value.toLowerCase()
        setWordEntered(searchWord)
        if (!searchWord) return setFilteredData(allData)

        const newFilter: oneProduct[] = filterItems(allData, wordEntered)
        setFilteredData(newFilter)
        console.log(filteredData, 'filtered')
    }



    const clearInput = (): void => {
        setFilteredData([])
        setWordEntered("")
        inputRef.current?.focus()
    }



    return (
        <div>
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder="Enter a milk name..."
                    value={wordEntered}
                    onChange={handleFilter}
                    ref={inputRef}
                />
                <div className="searchIcon">
                    {wordEntered.length !== 0 && (
                        <div id="clearBtn" onClick={clearInput} />
                    )}
                </div>
            </div>
            {filteredData.length !== 0 && (
                <div>
                    {filteredData.map(({ name, type }, key) => (
                        <p key={key} >
                            {name + ' ' + type}
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchBar