import './SearchBar.scss';

const SearchBar = () => {
    return (
        <div className='container-fluid searchbar-page'>
            <div className='row'>
                <div className='col'>
                    <div className='searchbar-page_container'>
                        <img src='../../Assests/Images/SearchIcon.png' alt='search-icon' className='search-icon' />
                        <input type="search" className='search-field' placeholder='Search Workshops' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar