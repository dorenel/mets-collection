function App() {
    const {useState, useEffect} = React;
    const [selected, setSelected] = useState("title")
    const [input, setInput] = useState("");
    const [url, setUrl] = useState("");
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [filtered, setFiltered] = useState([]);

    // fetch all data according to search url.
    useEffect(() => {
        const fetchData = async () => {
            //setIsLoading(true);
            console.log("in fetchData");
            if (url) {
                let results = await axios(url);
                setData(results.data.objectIDs);
                console.log(results.data.objectIDs);
            }
        };

        fetchData();

    }, [url]);

    // reset the items that need to be loaded according to search or page changes.
    useEffect(() => {
        if (data === null || data.length <= 0) {
            return;
        }

        let pagedData = data.slice((page-1)*10, page*10);
        setFiltered(pagedData);
    }, [data, page]);

    // change search area.
    const handleSelect = (e) => {
        setSelected(e.target.value);
    }

    // change input field.
    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    // redo search if search button is clicked.
    const handleButtonClick = () => {
        // need to use if/else since the API requires the selection first and then the query input.
        if (selected === "keyword") {
            setUrl("https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + input);
        } else {
            setUrl("https://collectionapi.metmuseum.org/public/collection/v1/search?" + selected + "=true&q=" + input);
        }
        // need to reset to page 1 whenever there is a new search.
        setPage(1);
    }

    // set the current page.
    const resetPage = (currentPage) => {
        setPage(currentPage);
    }

    return (
        <>
        <div className="banner">Metropolitan Museum of the Arts Collection</div>
        <div className="container">
            <div className="search">
                <select className="form-select" aria-label="Search In" onChange={handleSelect} defaultValue="title">
                    <option value="title">Title</option>
                    <option value="artistOrCulture">Artist</option>
                    <option value="keyword">Keyword</option>
                </select>
                <div className="input-group">
                    <input type="text" className="form-control" onChange={handleInputChange} placeholder="Search item..." aria-label="Search item..." aria-describedby="button-addon2"/>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleButtonClick}>Search</button>
                </div>
            </div>
            {(data === null || data.length === 0) ? <></> : (
                <table className="table table-striped">
                    <thead><tr><th>ID</th><th>Title</th><th>Artist</th><th>Image</th></tr></thead>
                    <tbody>
                    {filtered.map((item) => <Item item={item}/>)}
                    </tbody>
                </table>
            )}          
        </div>
        {(data === null) ? <div className="no-result">Sorry, no resulting entries found with the criteria.</div> : <Page dataLength={data.length} resetPage={resetPage} page={page}/>}
        </>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));