import React,{ useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import  { UserContext } from '../../App'

const options = [
  'delete',
];


export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const {state, dispatch} = useContext(UserContext)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    
    console.log("dlt clicked")
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 40*4.5,
            width: '20ch',
          },
        }}
      >

      <MenuItem key={1} selected={options[0] === 'delete'} onClick={()=>{
        if(props.postedBy._id === state._id){
          handleClose()
        }
      }}>
          {options[0]}
      </MenuItem>
      </Menu>
    </div>
  );
}
