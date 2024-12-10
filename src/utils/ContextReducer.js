import { createContext, useMemo, useReducer} from "react";

export const CartContext = createContext()

const reducer =(state,action)=>{
    switch (action.case) {
        case 'ADD':
            
            return [...state,{
                id:action.id,
                tempId:action.tempId,
                name:action.name,
                price:action.price,
                qty:action.qty,
                size:action.sizelist,
                img:action.img  
            }]
        case 'UPDATE':
            let arr=[...state]
            arr.find((data,index)=>{
                if(data.tempId===action.tempId){
                  arr[index]={...data,qty:parseInt(action.qty)+parseInt(data.qty),price:action.price+data.price}  
                }
            })
            return arr;
        case 'INCREMENT':
            let arr2=[...state]
            arr2.find((data,index)=>{
                if(data.tempId===action.tempId){
                  arr2[index]={...data,qty:parseInt(data.qty)+1,price:data.price+action.unitPrice}  
                }
            })
            return arr2;
        case 'DECREMENT':
            let arr3=[...state]
            arr3.find((data,index)=>{
                if(data.tempId===action.tempId){
                  arr3[index]={...data,qty:parseInt(data.qty)-1,price:data.price-action.unitPrice}  
                }
            })
            return arr3;
        case 'DELETE':
            let arr1=[...state]
            arr1.splice(action.index,1)
            return arr1;
        case 'DROP':
            let arr4=[]
          
            return arr4;
        default:
            break
           
    }
}

export const CartProvider =({children})=>{
    const [state,dispatch] =  useReducer(reducer,[])
    const value = useMemo(()=>{
        return {state,dispatch}

    },[state,dispatch])

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}