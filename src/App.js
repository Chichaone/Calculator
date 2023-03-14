import './App.css';
import {Box, Button, Text} from '@chakra-ui/react'
import {useState} from "react";

// function Numbers(props) {
//     const nums = Array.from(Array(10).keys()).map(
//         number => {
//             return <Button
//                 onClick={(e) => {
//                     if(props.data != '0')
//                     props.onClick(props.data + e.target.)
//                     else props.onClick(e.target.value)
//                 }
//                 }
//                 key={number} w={"40px"} h={"40px"} margin={"4px"}>
//                 {number}
//             </Button>
//         }
//     )
//     return (
//         <Box display={"flex"} flexWrap={"wrap"} w={"150px"}> {nums} </Box>
//     )


function App() {
    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");

    const ops = ['/', '*', '+', '-', '.'];

    const updateCalc = value => {
        if(
            ops.includes(value) && calc === '' ||
            ops.includes(value) && ops.includes(calc.slice(-1))
        )
        {
            return;
        }
        setCalc(calc + value);

        if(!ops.includes(value)){
            setResult(eval(calc + value).toString());
        }
    }

    const creatDigits = () => {
        const N = 9
        const nums = Array.from(Array(N + 1).keys()).slice(1).map(
            number => {
                return <Button onClick = { () => updateCalc(number.toString())} key={number}>
                    {number}
                </Button>
            }
        )
        return nums.reverse()
    }

    const calculate = () => {
        setCalc(eval(calc).toString());
    }

    const deleteLast = () => {
        if (calc == '') {
            return;
        }
        const value = calc.slice(0, -1)

        setCalc(value);
    }

    const deleteAll = () => {
        if (calc == '') {
            return;
        }
        const value = ''

        setCalc(value);
    }

    return (
        <div className={"App"}>
            <div className={"calculator"}>
                <div className={"display"}>
                    {result ? <span> ({result}) </span> : ''}&nbsp;
                    {calc || "0"}
                </div>

                <div className={"operators"}>
                    <Button onClick = { () => updateCalc('/')}>/</Button>
                    <Button onClick = { () => updateCalc('*')}>*</Button>
                    <Button onClick = { () => updateCalc('+')}>+</Button>
                    <Button onClick = { () => updateCalc('-')}>-</Button>
                    <Button onClick = {deleteLast}>DEL</Button>
                    <Button onClick = {deleteAll}>C</Button>
                </div>

                <div className={"digits"}>
                    {creatDigits()}
                    <Button onClick = { () => updateCalc('0')}>0</Button>
                    <Button onClick = { () => updateCalc('.')}>.</Button>
                    <Button onClick = {calculate} >=</Button>
                </div>

            </div>
        </div>
    )
}

export default App;
