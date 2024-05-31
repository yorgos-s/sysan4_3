

export default function DropDown({ selectedValue, onChange, dropDownOptionsValues }) {
    //const OptionsValues = { 1: "day", 2: "week", 3: "month" }/*["day", "week", "month"]*/
    //console.log("INNNNEEEEER", dropDownOptionsValues)
    return (
        <select className="dropdown" value={selectedValue} onChange={onChange} >
            {Object.entries(dropDownOptionsValues).map(([v, i]) =>
                <option key={v} value={v}>{i}</option>)}
        </select >
   )  
}



