// import { useContext } from "react";
// import { GlobalContext } from "../../context/GlobalContext";
// import styled from "styled-components";
// import { motion } from "framer-motion";
// import { formatNumber } from "../../util";

// //BUILD GENERIC TABLE COMPONENT
// const Table = ({ accumulatedSubTotals, data, allocated, total }) => {
//   const { currencySymbol } = useContext(GlobalContext);
//   console.log(data);
//   return (
//     <StyledTable>
//       <table>
//         <thead>
//           <tr>
//             <th>
//               <h5>Category</h5>
//             </th>
//             <th>
//               <h5>Category sub-total</h5>
//             </th>
//             <th>
//               <h5>% of allocated</h5>
//             </th>
//             <th>
//               <h5>% of total</h5>
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {accumulatedSubTotals.map((item, i) => (
//             <tr>
//               <td>
//                 <p className="tableItem">{item.category}</p>
//               </td>
//               <td>
//                 <p className="tableItem">
//                   <span className="symbol">{currencySymbol} </span>
//                   {formatNumber(data[i].toFixed(2))}
//                 </p>
//               </td>
//               <td>
//                 <p className="tableItem">
//                   {formatNumber((100 / allocated) * data[i])} %
//                   {/* {((100 / allocated) * data[i]).toFixed(2)} % */}
//                 </p>
//               </td>
//               <td>
//                 <p className="tableItem">
//                   {formatNumber((100 / total) * data[i])} %
//                   {/* {((100 / total) * data[i]).toFixed(2)}% */}
//                 </p>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </StyledTable>
//   );
// };

// export default Table;

// const StyledTable = styled(motion.div)`
//   width: 100%;

//   th {
//     text-align: center;
//     min-width: 30%;
//   }
//   td {
//     text-align: center;
//     //min-width: 30%;
//   }
// `;

import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import { formatNumber } from "../../util";

//BUILD GENERIC TABLE COMPONENT
const Table = ({ arrData, accumulatedSubTotals, data, allocated, total }) => {
  const { currencySymbol } = useContext(GlobalContext);

  const getRow = (row) => {
    let r = [];
    console.log({ row });
    for (let i = 0; i < row.length; i++) {
      r.push(<td>{typeof row[i] === number ? row[i] : row[i]}</td>);
    }
    return r;
  };
  const getBody = () => {
    let r = [];
    for (let i = 0; i < arrData[1].length; i++) {
      r.push(<tr>{getRow(arrData[1][i])}</tr>);
    }
    console.log(r);
    return r;
  };
  // arrData.map((row) => {
  //   (
  //     <td>
  //       <p className="tableItem">{row[0]}</p>
  //     </td>
  //   )
  // }
  /* {arrData.map((row) => (
      <tr>
        <td>
          <p className="tableItem">{row[0]}</p>
        </td>
      </tr>
    ))} */

  return (
    <StyledTable>
      <table>
        <thead>
          <tr>
            {arrData[0].map((header) => {
              return (
                <th>
                  <h5>{header}</h5>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{getBody()}</tbody>
      </table>
    </StyledTable>
  );
};

export default Table;

const StyledTable = styled(motion.div)`
  width: 100%;

  th {
    text-align: center;
    min-width: 30%;
  }
  td {
    text-align: center;
    //min-width: 30%;
  }
`;

// {
//   accumulatedSubTotals.map((item, i) => (
//     <tr>
//       <td>
//         <p className="tableItem">{item.category}</p>
//       </td>
//       <td>
//         <p className="tableItem">
//           <span className="symbol">{currencySymbol} </span>
//           {formatNumber(data[i].toFixed(2))}
//         </p>
//       </td>
//       <td>
//         <p className="tableItem">
//           {formatNumber((100 / allocated) * data[i])} %
//           {/* {((100 / allocated) * data[i]).toFixed(2)} % */}
//         </p>
//       </td>
//       <td>
//         <p className="tableItem">
//           {formatNumber((100 / total) * data[i])} %
//           {/* {((100 / total) * data[i]).toFixed(2)}% */}
//         </p>
//       </td>
//     </tr>
//   ));
// }
