import React, { useState } from 'react';

function NewTransfer () {
    const [Transfer, setTransfer] = useState(undefined);

    return (
        <>
            <h2>Create Transfer</h2>
            <form>
                <label htmlFor='amounte'>Amount</label>
                <input
                    id='amount'
                    type= 'text'
                    onChange={e => updateTransfer(e,'amount')}
                />
                
            </form>
        </>
    );
}