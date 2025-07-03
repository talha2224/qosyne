import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import config from '../../../config';

const AdminTransactionPage = () => {
    const [data, setData] = useState([]);
    const [taxModel, setTaxModel] = useState(false);
    const [taxData, setTaxData] = useState({
        revenueStreamCost: '',
        qosneWalletFee: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

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

    useEffect(() => {
        fetchTransactions();
        fetchTaxSettings();
    }, []);

    const fetchTransactions = async () => {
        try {
            const res = await fetch(`${config.baseUrl}/payment/admin/transactions`);
            const json = await res.json();
            setData(json.data.transactions);
            setFilteredData(json.data.transactions);
        } catch (err) {
            toast.error('Failed to load transactions');
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`${config.baseUrl}/payment/change-status/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            const result = await res.json();
            if (res.ok) {
                toast.success(result.message);
                setData(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error('Update failed');
        }
    };

    const fetchTaxSettings = async () => {
        try {
            const res = await fetch(`${config.baseUrl}/tax-settings`);
            const json = await res.json();
            if (json.data) setTaxData(json.data);
        } catch (err) {
            toast.error('Failed to load tax settings');
        }
    };

    const saveTaxSettings = async () => {
        try {
            const res = await fetch(`${config.baseUrl}/tax-settings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taxData)
            });
            const result = await res.json();
            if (res.ok) toast.success('Tax settings saved');
            else toast.error(result.message);
        } catch (err) {
            toast.error('Save failed');
        } finally {
            setTaxModel(false);
        }
    };

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const results = data.filter(txn =>
            (txn.id?.toString().includes(term)) ||
            (txn.paymentId?.toLowerCase().includes(term)) ||
            (txn.sender?.name?.toLowerCase().includes(term)) ||
            (txn.sender?.email?.toLowerCase().includes(term)) ||
            (txn.sender?.designation?.toLowerCase().includes(term)) ||
            (txn.sender?.phoneNumber?.toLowerCase().includes(term)) ||
            (txn.connectedWallet?.fullName?.toLowerCase().includes(term)) ||
            (txn.connectedWallet?.accountEmail?.toLowerCase().includes(term)) ||
            (txn.connectedWallet?.provider?.toLowerCase().includes(term)) ||
            (txn.transactionRecipient?.recipientName?.toLowerCase().includes(term)) ||
            (txn.amount?.toString().includes(term)) ||
            (txn.currency?.toLowerCase().includes(term)) ||
            (txn.provider?.toLowerCase().includes(term)) ||
            (txn.type?.toLowerCase().includes(term)) ||
            (txn.status?.toLowerCase().includes(term))
        );
        setFilteredData(results);
    }, [searchTerm, data]);

    return (
        <div>
            <div className="flex justify-between items-center mb-4 bg-white p-2 rounded-md">
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search..." className="rounded-md bg-[#F9F9F9] px-3 w-[15rem] py-2 outline-none border" />
                <button onClick={() => setTaxModel(true)} className="bg-gray-200 px-4 py-2 rounded-md text-sm">Tax Model</button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-md font-medium">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Transaction ID</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Date</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Sender</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Sender Email</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Designation</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Phone</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Payment ID</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Wallet Provider</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Receiver Name</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Receiver Email</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Recipient Name</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Amount</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Currency</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Provider</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Type</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Status</th>
                            <th className="py-2 px-4 border-b text-left text-sm font-medium text-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(txn => (
                            <tr key={txn.id}>
                                <td className="py-2 px-4 border-b text-sm text-nowrap">{txn.id}</td>
                                <td className="py-2 px-4 border-b text-sm text-nowrap">{new Date(txn.createdAt).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b text-sm text-nowrap">{txn.sender?.name || '—'}</td>
                                <td className="py-2 px-4 border-b text-sm text-nowrap">{txn.sender?.email || '—'}</td>
                                <td className="py-2 px-4 border-b text-sm text-nowrap">{txn.sender?.designation || '—'}</td>
                                <td className="py-2 px-4 border-b text-sm text-nowrap">{txn.sender?.phoneNumber || '—'}</td>
                                <td className="py-2 px-4 border-b text-sm text-nowrap">{txn.paymentId}</td>
                                <td className="py-2 px-4 border-b text-sm text-nowrap">{txn.connectedWallet?.provider || '—'}</td>
                                <td className="py-2 px-4 border-b text-sm text-nowrap">{txn.connectedWallet?.fullName || '—'}</td>
                                <td className="py-2 px-4 border-b text-sm text-nowrap">{txn.connectedWallet?.accountEmail || '—'}</td>
                                <td className="py-2 px-4 border-b text-sm text-nowrap">{txn.transactionRecipient?.recipientName || '—'}</td>
                                <td className="py-2 px-4 border-b text-sm text-nowrap">${txn.amount}</td>
                                <td className="py-2 px-4 border-b text-sm text-nowrap">{txn.currency}</td>
                                <td className="py-2 px-4 border-b text-sm text-nowrap">{txn.provider}</td>
                                <td className="py-2 px-4 border-b text-sm text-nowrap">{txn.type}</td>
                                <td className="py-2 px-4 border-b text-sm text-nowrap">
                                    <span className={`px-2 py-1 rounded-md text-xs ${txn.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : txn.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {txn.status}
                                    </span>
                                </td>
                                <td className="py-2 px-4 border-b text-sm space-x-2 flex flex-nowrap">
                                    <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded" onClick={() => downloadData(txn, txn.id)}>Download</button>
                                    {txn.status === 'PENDING' && (
                                        <>
                                            <button onClick={() => updateStatus(txn.id, 'COMPLETED')} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Approve</button>
                                            <button onClick={() => updateStatus(txn.id, 'FAILED')} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Decline</button>
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

                        <div className="flex space-x-2">
                            <button className="flex-1 bg-gray-200 px-4 py-2 rounded" onClick={() => setTaxModel(false)}>Cancel</button>
                            <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded" onClick={saveTaxSettings}>Save</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminTransactionPage;
