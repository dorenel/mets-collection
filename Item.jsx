function Item({item}) {
    const {useState, useEffect} = React;
    const [isLoading, setIsLoading] = useState(true);
    const [detail, setDetail] = useState({});

    useEffect(() => {
        const fetchDetail = async () => {
            setIsLoading(true);
            console.log("in fetchDetail");
            if (item) {
                let data = await axios("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + item);
                console.log(data);
                setDetail(data.data);
            }
            setIsLoading(false);
        }

        fetchDetail();
    }, [item]);

    return (  
        <>
        {(isLoading) ? <tr><td>loading...</td></tr> : <tr><td><a href={detail.objectURL} target="_blank">{detail.objectID}</a></td><td>{(detail.objectWikidata_URL === "") ? <>{detail.title}</> : <a href={detail.objectWikidata_URL} target="_blank">{detail.title}</a>}</td><td>{(detail.artistWikidata_URL === "") ? <>{detail.artistDisplayName}</> : <a href={detail.artistWikidata_URL} target="_blank">{detail.artistDisplayName}</a>}</td><td>{(detail.primaryImageSmall === "") ? "N/A" : <a href={detail.primaryImage} target="_blank"><img className="image" src={detail.primaryImageSmall}/></a>}</td></tr>}
        </> 
    );
}