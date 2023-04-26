function SummaryKey() {
   return (
      <div className="key">
         <div className="element">
            <div className="color background-income-color"></div>
            <h5 className="legend">Income</h5>
         </div>
         <div className="element">
            <div className="color background-allocated-color"></div>
            <h5 className="legend">Allocated</h5>
         </div>
         <div className="element">
            <div className="color background-unallocated-color"></div>
            <h5 className="legend">Unallocated</h5>
         </div>
         <div className="element">
            <div className="color background-expenditure-color"></div>
            <h5 className="legend">Expenditure</h5>
         </div>
         <div className="element">
            <div className="color background-balance-color"></div>
            <h5 className="legend">Balance</h5>
         </div>
      </div>
   );
}

//Styled globally

export default SummaryKey;
