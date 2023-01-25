import React, { useState, useRef } from 'react'
import oneProduct from '../interfaces/one-product'

const SearchBar = (props: Array<oneProduct>) => {
    const [filteredData, setFilteredData] = useState<oneProduct[]>(props);
    const [wordEntered, setWordEntered] = useState<string>("")
    // console.log(props)

    const inputRef: React.RefObject<HTMLInputElement> =
        useRef<HTMLInputElement>(null)
    window.addEventListener("load", () => inputRef.current?.focus())

    const handleFilter = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>): void => {
        const searchWord: string = target.value.toLowerCase()
        setWordEntered(searchWord)

        // const newFilter : oneProduct[] = props.filter(({ name }): boolean =>
        //     name.toLowerCase().includes(searchWord)
        // )
        const newFilter: oneProduct[] = filterItems(props, wordEntered)
        if (!searchWord) return setFilteredData([])
        setFilteredData(newFilter)
        console.log(filteredData)
    }

    function filterItems(arr: oneProduct[], query: string) {
        return arr.filter((el) => el.name.toLowerCase().includes(query.toLowerCase()));
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
            {/* {filteredData.length !== 0 && (
                <div>
                    {filteredData.map(({ link, title }, key) => (
              <a
                href={link}
                key={key}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </a>
            ))}
                </div>
            )} */}
        </div>
    )
}

export default SearchBar