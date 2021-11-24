import { memo } from 'react'
import './Background.css'

interface Props {
    jpg?: string,
    webp?: string
}

const Background: React.FC<Props> = (props) => {
    return (
        <div className="background-image">
            {/*<picture>
                <source srcSet={props.webp} />
                <img className="b-image" src={props.jpg} alt="" />
            </picture>*/}
        </div>
    )
}

export default memo(Background)