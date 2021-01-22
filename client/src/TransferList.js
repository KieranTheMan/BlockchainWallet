import React from 'react';

function Transferlist ({transfer}) {
return (
    <div>
        <h2>Transfer</h2>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Amount</th>
                    <th>To</th>
                    <th>Approvals</th>
                    <th>Sent</th>
                </tr>
            </thead>
            <tbody>
                {Transferlist.map(transfer => (
                    <tr key = {transfer.id}>
                        <td>{transfer.id}</td>
                        <td>{transfer.amount}</td>
                        <td>{transfer.to}</td>
                        <td>{transfer.approvals}</td>
                        <td>{transfer.sent} ? 'yes' : 'no'</td>
                    </tr>
                ))};
            </tbody>
        </table>
    </div>
);
}

export default Transferlist;