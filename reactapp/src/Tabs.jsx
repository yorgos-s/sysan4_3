export default function Tabs({ tabNames, onTabSelectSplit, tabSelectedSplit }) {

    const handleClick = (tabName) => {
        onTabSelectSplit(tabName);
        console.log("inner", tabSelectedSplit);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            {/*tabNames is an object*/}
            {Object.keys(tabNames).map((t, idx) =>
                <div key={idx}
                    onClick={() => handleClick(t)}
                    style={{
                        padding: '10px',
                        cursor: 'pointer',
                        backgroundColor: t === tabSelectedSplit ? 'red' : 'black',
                        color: 'white',
                        margin: '5px'
                    }}>
                    {t}
                </div>)
            }
        </div>
    )
}
