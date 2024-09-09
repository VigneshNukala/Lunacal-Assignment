import './index.css'

const DataCard = props => {
    const {text} = props
    return (
        <p className='para'>{text}</p>
    )
}

export default DataCard