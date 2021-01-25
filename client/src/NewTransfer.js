import React, { useState } from 'react';

function NewTransfer ({createTransfer}) {
    const [transfer, setTransfer] = useState(undefined);
    const submit = e => {
        e.preventDefault();
        createTransfer(transfer);
    }
    //we whant to prevent the default action of the form wich is a full page reload
    const updateTransfer = (e, field) => {
        const value = e.target.value;
        setTransfer({...transfer, [field]: value })
    }

    return (
        <>
            <h2>Create Transfer</h2>
            <form  onSubmit={(e) => submit(e)}>
                <label htmlFor='amount'>Amount</label>
                <input
                    id='amount'
                    type= 'text'
                    onChange={e => updateTransfer(e,'amount')}
                />
                <label htmlFor='to'>To</label>
                <input
                    id='to'
                    type= 'text'
                    onChange={e => updateTransfer(e,'to')}
                />
                <button>Submit</button>

            </form>
        </>
    );
}

export default NewTransfer;