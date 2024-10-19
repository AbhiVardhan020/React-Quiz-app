import React from 'react'
import {nanoid} from 'nanoid'


export default function Questions(props){

    const [options, setOptions] = React.useState({})

    React.useEffect(()=>{
        setOptions((prev)=>{
            if(prev[props.order])   return prev;
            var arr = []
            let k=0;
            const num = Math.floor(Math.random()*4)
            for(let i=0; i<4; i++){
                if(i===num) arr.push(props.ans)
                else    arr.push(props.opt[k++])
            }
            return {...prev, [props.order]:arr}
        })
    },[props.order, props.ans, props.opt])

    function change(c){
        props.change(props.order, c)
    }

    function prev(){
        props.next(n=>n-1)
    }

    function next(){
        props.next(n=>n+1)
    }

    function clear1(){
        props.change(props.order, '')
    }

    const style = {backgroundColor:'#e98534'};

    const style1 = {pointerEvents:'none'};


    function Options(){

        return(
            <form className='form'>
                <div className='optionBox'>
                    {options[props.order]?.map(c=>{
                        return(
                            <div key={nanoid()} className={
                                `${props.select===c ? 'option selected':'option' } 
                                ${props.finish===1 ? 
                                    props.select===c ? c===props.ans ? 'correct' : 'wrong' : '' : ''}
                                ${props.finish===1 ? c===props.ans ? 'correct' : '' : ''}
                                `
                                } 
                                onClick={()=>change(c)}
                                style={props.finish===1 ? style1 : {}}
                                >
                                {c}
                            </div>
                        )
                    })}
                </div>
                <div className='buttonBox'>
                    <button onClick={()=>prev()} disabled={!props.order}>&lt; Prev</button>
                    <button onClick={()=>clear1()} style={style} disabled={props.finish}>clear</button>
                    <button onClick={()=>next()}>{props.order != 4 ? 'Next >' : 'Finish'}</button>
                </div>
            </form>
        )

    }


    return( 
            <div className='questionBox'>
                <div className='question'>{props.question}</div>
                 <br />
                <Options />
            </div>
    )
}