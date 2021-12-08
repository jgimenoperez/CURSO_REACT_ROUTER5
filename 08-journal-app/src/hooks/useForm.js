import {useState} from "react"


export const useForm = (intialState = {}) => {

    const [values, setvalues] = useState(intialState)

    const reset=( newFormState=intialState)=>{

        setvalues(newFormState)

    }
    
    const handelImputChange = ({ target } )=>{

        setvalues(

            {
               ...values,
               [ target.name ] : target.value

            }

      )
    }

    return [values, handelImputChange,reset ]

}