import React, { useState, useRef, useEffect } from 'react'
import oneProduct from '../interfaces/one-product'
import paginationInterface from '../interfaces/pagination-interface';
import Pagination from './Pagination';
import ProductCard from './ProductCard';

const SearchBarAndProducts = (props: Array<oneProduct>) => {
    const [allData, setAllData] = useState<oneProduct[]>([]);
    const [filteredData, setFilteredData] = useState<oneProduct[]>([]);
    const [wordEntered, setWordEntered] = useState<string>("");
    const [isRendered, setIsRendered] = useState<boolean>(false);
    
    const [currentPage, setCurrentPage] = useState<paginationInterface["currentPage"]>(1);
    const [recordsPerPage] = useState(8);
    const [nPages, setNPages] = useState<paginationInterface["nPages"]>(0);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    useEffect(() => {
        setNPages(Math.ceil((filteredData.length / recordsPerPage)));
    }, [])

    const currentPageData = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);


    const paginationProps = {
    currentPage: currentPage,
    nPages: nPages,
    setCurrentPage: setCurrentPage
}

    useEffect(() => {
        if (!allData.length) {
            setIsRendered(false)
            setAllData(Object.values(props));
            setIsRendered(true)
        }
    }, [allData])

    useEffect(() => {
        if (!!allData) {
            setIsRendered(false)
            setFilteredData(allData);
            setIsRendered(true)
        }
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
        setIsRendered(false)
        setFilteredData(newFilter)
        setIsRendered(true)
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
            
            {isRendered && (
                    <div className='product-gallery'>
                    {currentPageData && currentPageData.map((oneProduct, i) => <ProductCard key={i} name={oneProduct.name} type={oneProduct.type} storage={oneProduct.storage} id={oneProduct.id}></ProductCard>)}
                    <Pagination {...paginationProps} />
                </div>
            )}
        </div>
    )
}

export default SearchBarAndProducts