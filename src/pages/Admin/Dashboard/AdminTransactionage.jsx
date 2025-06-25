import React, { useState } from 'react';

const staticTransactions = [
    {
        _id: 'txn_001',
        createdAt: '2025-06-20T12:00:00Z',
        senderName: 'Alice Johnson',
        senderEmail: 'alice.johnson@example.com',
        receiverName: 'Mark Smith',
        receiverEmail: 'mark.smith@example.com',
        amount: 150.00,
        paymentType: 'Deposit',
        status: 'Pending',
    },
    {
        _id: 'txn_002',
        createdAt: '2025-06-21T09:30:00Z',
        senderName: 'Sofia Lopez',
        senderEmail: 'sofia.lopez@example.com',
        receiverName: 'David Nguyen',
        receiverEmail: 'david.nguyen@example.com',
        amount: 250.00,
        paymentType: 'Withdraw',
        status: 'Approved',
    },
    {
        _id: 'txn_003',
        createdAt: '2025-06-22T15:45:00Z',
        senderName: 'Emma Brown',
        senderEmail: 'emma.brown@example.com',
        receiverName: 'James Wilson',
        receiverEmail: 'james.wilson@example.com',
        amount: 75.00,
        paymentType: 'Transfer',
        status: 'Declined',
    }
];

const taxModelData = [
    { name: 'Revenue Stream Cost', rate: '1%' },
    { name: 'Operational Cost', rate: '2%' },
    { name: 'QoSNE Wallet Monthly Fee', rate: '0.25%' }
];

const AdminTransactionPage = () => {
    const [data, setData] = useState(staticTransactions);
    const [taxModel, setTaxModel] = useState(false);
    const [taxData, setTaxData] = useState({
        revenueStreamCost: '1%',
        qosneWalletFee: '0.25%'
    });
    const updateStatus = (id, status) => {
        setData(prev => prev.map(t => t._id === id ? { ...t, status } : t));
    };

    const downloadData = (logData, id) => {
        const fileData = JSON.stringify(logData, null, 2);
        const blob = new Blob([fileData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `transaction-${id}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    const handleTaxChange = (e) => {
        const { name, value } = e.target;
        setTaxData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4 bg-white p-2 rounded-md">
                <h2 className="text-lg">Admin Transactions</h2>
                <button onClick={() => setTaxModel(true)} className="bg-gray-200 px-4 py-2 rounded-md text-sm">Tax Model</button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-md">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">Transaction ID</th>
                            <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">Date</th>
                            <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">Sender</th>
                            <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">Sender Email</th>
                            <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">Receiver</th>
                            <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">Receiver Email</th>
                            <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">Amount</th>
                            <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">Payment Type</th>
                            <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">Status</th>
                            <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(txn => (
                            <tr key={txn._id}>
                                <td className="py-2 px-4 border-b text-sm">{txn._id}</td>
                                <td className="py-2 px-4 border-b text-sm">{new Date(txn.createdAt).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b text-sm">{txn.senderName}</td>
                                <td className="py-2 px-4 border-b text-sm">{txn.senderEmail}</td>
                                <td className="py-2 px-4 border-b text-sm">{txn.receiverName}</td>
                                <td className="py-2 px-4 border-b text-sm">{txn.receiverEmail}</td>

                                <td className="py-2 px-4 border-b text-blue-600">${txn.amount.toFixed(2)}</td>
                                <td className="py-2 px-4 border-b text-sm">{txn.paymentType}</td>
                                <td className="py-2 px-4 border-b text-sm">
                                    <span className={`px-2 py-1 rounded-md text-xs ${txn.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : txn.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{txn.status}</span>
                                </td>
                                <td className="py-2 px-4 border-b space-x-2 flex flex-nowrap">
                                    <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded" onClick={() => downloadData(txn, txn._id)}>Download</button>
                                    {txn.status === 'Pending' && (
                                        <>
                                            <button onClick={() => updateStatus(txn._id, 'Approved')} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Approve</button>
                                            <button onClick={() => updateStatus(txn._id, 'Declined')} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Decline</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {taxModel && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 w-[22rem] rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Update Tax Model</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Revenue Stream Cost (%)</label>
                            <input type="text" name="revenueStreamCost" value={taxData.revenueStreamCost} onChange={handleTaxChange} className="w-full border rounded px-3 py-2 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">QoSNE Wallet Monthly Fee (%)</label>
                            <input type="text" name="qosneWalletFee" value={taxData.qosneWalletFee} onChange={handleTaxChange} className="w-full border rounded px-3 py-2 text-sm" />
                        </div>

                        <button className="mt-2 w-full bg-gray-200 px-4 py-2 rounded" onClick={() => setTaxModel(false)}>Save</button>
                    </div>
                </div>
            )}


        </div>
    );
};

export default AdminTransactionPage;
