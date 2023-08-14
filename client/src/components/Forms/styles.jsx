const myPaper = {
  padding:(theme) => theme.spacing(2),
};
const myForm = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}
const myfileInput = {
  width: '97%',
  marginTop:"10px",
  marginBottom:"10px"
}
const buttonSubmit = {
  marginBottom: '10px',
}
const root =  {
  '& .MuiTextField-root': {
    margin:(theme) => theme.spacing(1),
  }
}

export { root, myPaper , myForm , myfileInput , buttonSubmit};