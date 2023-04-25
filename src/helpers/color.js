import { createTheme,colors,styled,TextField} from "@mui/material";


export const costomizingTeme=createTheme({
    palette:{
        primary:{
            main:'#CE2619'
        }
    }
})

export const StylishInput=styled(TextField)({
    '& label.Mui-focused': {
      color: 'red',
    },
    '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':{
      color:"white" 
    },
    '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':{
       color:"white"
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'red',
    },
    '& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root':{
      color:"red"
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#CE2619',
      },
      '&:hover fieldset': {
        borderColor: 'red',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'red',
      },
    },
  });