function Page({dataLength, resetPage, page}) {

    // calculate the number of pages according to the data length.
    // the item per page is 10. The API requires less than 80 queries per minute.
    let numPage = Math.ceil(dataLength/10);
    
    // create an array of numbers of the pages.
    let pageArray = [];
    for (let i = 1; i < numPage+1; i++) {
        pageArray.push(i);
    }

    // set the current page to the button being clicked.
    const handleClick = (currentPage) => {
        resetPage(currentPage);
    }

    return (
        <div className="text-center page">
            <div className="btn-group" role="group" aria-label="pages">
                {pageArray.map((item) => <button className={(item === page) ? "btn btn-secondary active button" : "btn btn-secondary button"} onClick={() => handleClick(item)} autoFocus={(item === page)}>{item}</button>)}
            </div>
        </div>
    );
}