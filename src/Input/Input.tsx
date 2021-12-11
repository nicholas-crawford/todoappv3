import React, {ChangeEvent} from 'react';
import './Input.css';
import Checkbox from '@mui/material/Checkbox';
interface InputProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    onEnterPressed: () => void,
    value: string,
    onCheckboxClick: () => void,
}

const Input = (props: InputProps) => {
    const {
      onChange,
      onEnterPressed,
      onCheckboxClick,
      value,
    } = props;

    const checkForEnter = (key: string) => {
        if (key === 'Enter') {
            onEnterPressed()
        }
    }

    const boxStyle = {display: 'flex'}

 return (
     <div style={boxStyle}>
         {/*TODO: Indeterminate state/styles and fix checked value bug*/}
         <Checkbox onChange={onCheckboxClick}/>
         <input className='Input'
             onChange={onChange}
             placeholder='What needs to be done?'
             value={value}
             onKeyDown={(event) => checkForEnter(event.key)}
         />
     </div>
    )
}

export default Input;