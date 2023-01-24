import React from 'react';
import paginationInterface from '../interfaces/pagination-interface';

export default function Pagination(props: paginationInterface) {

    const nPages = props.nPages;
    const currentPage = props.currentPage;
    const setCurrentPage = props.setCurrentPage;
    const nextPage = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <div className="page-link pointer"
                        onClick={prevPage} >
                        Previous
                    </div>
                </li>
                <li className="page-item">{currentPage}</li>
                <li className="page-item pointer">
                    <div className="page-link"
                        onClick={nextPage}>
                        Next</div>
                </li>
            </ul>
        </nav>
    )
}
