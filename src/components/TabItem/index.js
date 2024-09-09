import './index.css'

const TabItem = props => {
    const {details,onSelectTabItem,isActive} = props
    const {id,displayText} = details
    const onClickTabItem = () => {
        onSelectTabItem(id)
    }
    const activeTabClassName = isActive ? 'active-tab-btn' : ''
    return (
        <li className='tab-list-item'>
            <button className={`tab-btn ${activeTabClassName}`} type='button' onClick={onClickTabItem}>
                {displayText}
            </button>
        </li>
    )
}

export default TabItem