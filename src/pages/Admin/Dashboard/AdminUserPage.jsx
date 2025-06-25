import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line, Tooltip } from 'recharts';
import toast from 'react-hot-toast';

const genderData = [
    { name: 'Male', value: 55, color: '#9370DB' },
    { name: 'Female', value: 45, color: '#E91E63' },
];

const ageData = [
    { age: '17-20', male: 70, female: 95 },
    { age: '21-25', male: 45, female: 60 },
    { age: '26-30', male: 30, female: 35 },
    { age: '31-35', male: 25, female: 30 },
    { age: '36-40', male: 18, female: 22 },
    { age: '41-45', male: 65, female: 70 },
    { age: '50+', male: 50, female: 55 },
];

const newUsersData = [
    { name: 'Jan', users: 120 },
    { name: 'Feb', users: 150 },
    { name: 'Mar', users: 100 },
    { name: 'Apr', users: 180 },
    { name: 'May', users: 160 },
    { name: 'Jun', users: 200 },
];

const activeUsersData = [
    { name: 'Male', value: 123456, color: '#9370DB' },
    { name: 'Female', value: 100789, color: '#E91E63' },
    { name: 'Inactive', value: 75789, color: '#FFCE56' },
];

const staticUsers = [
    {
        _id: '1',
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        phone: '+1-234-567-890',
        dob: '1992-08-15',
        designation: 'UI Designer',
        connectedWallet: 'PayPal',
        accountBlocked: false,
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        createdAt: '2024-12-01'
    },
    {
        _id: '2',
        firstName: 'Mark',
        lastName: 'Smith',
        email: 'mark.smith@example.com',
        phone: '+1-987-654-321',
        dob: '1988-04-22',
        designation: 'Backend Developer',
        connectedWallet: 'Zelle',
        accountBlocked: true,
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        createdAt: '2025-01-10'
    },
    {
        _id: '3',
        firstName: 'Sofia',
        lastName: 'Lopez',
        email: 'sofia.lopez@example.com',
        phone: '+1-456-789-012',
        dob: '1995-11-02',
        designation: 'Marketing Manager',
        connectedWallet: 'Venmo',
        accountBlocked: false,
        image: 'https://randomuser.me/api/portraits/women/3.jpg',
        createdAt: '2025-02-18'
    },
    {
        _id: '4',
        firstName: 'David',
        lastName: 'Nguyen',
        email: 'david.nguyen@example.com',
        phone: '+1-321-654-987',
        dob: '1990-03-30',
        designation: 'Product Manager',
        connectedWallet: 'Apple Pay',
        accountBlocked: false,
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
        createdAt: '2025-03-10'
    },
    {
        _id: '5',
        firstName: 'Emma',
        lastName: 'Brown',
        email: 'emma.brown@example.com',
        phone: '+1-222-333-4444',
        dob: '1993-07-19',
        designation: 'Frontend Developer',
        connectedWallet: 'Payoneer',
        accountBlocked: false,
        image: 'https://randomuser.me/api/portraits/women/5.jpg',
        createdAt: '2025-04-05'
    },
    {
        _id: '6',
        firstName: 'James',
        lastName: 'Wilson',
        email: 'james.wilson@example.com',
        phone: '+1-555-666-7777',
        dob: '1985-09-12',
        designation: 'DevOps Engineer',
        connectedWallet: 'CashApp',
        accountBlocked: false,
        image: 'https://randomuser.me/api/portraits/men/6.jpg',
        createdAt: '2025-04-10'
    },
    {
        _id: '7',
        firstName: 'Olivia',
        lastName: 'Martinez',
        email: 'olivia.martinez@example.com',
        phone: '+1-444-555-6666',
        dob: '1991-05-21',
        designation: 'HR Specialist',
        connectedWallet: 'Venmo',
        accountBlocked: true,
        image: 'https://randomuser.me/api/portraits/women/7.jpg',
        createdAt: '2025-04-12'
    },
    {
        _id: '8',
        firstName: 'Liam',
        lastName: 'Garcia',
        email: 'liam.garcia@example.com',
        phone: '+1-777-888-9999',
        dob: '1987-03-14',
        designation: 'QA Engineer',
        connectedWallet: 'Zelle',
        accountBlocked: false,
        image: 'https://randomuser.me/api/portraits/men/8.jpg',
        createdAt: '2025-04-15'
    },
    {
        _id: '9',
        firstName: 'Ava',
        lastName: 'Davis',
        email: 'ava.davis@example.com',
        phone: '+1-888-999-0000',
        dob: '1994-10-10',
        designation: 'Content Strategist',
        connectedWallet: 'Apple Pay',
        accountBlocked: false,
        image: 'https://randomuser.me/api/portraits/women/9.jpg',
        createdAt: '2025-04-17'
    },
    {
        _id: '10',
        firstName: 'Noah',
        lastName: 'Lee',
        email: 'noah.lee@example.com',
        phone: '+1-666-777-8888',
        dob: '1990-06-08',
        designation: 'UI/UX Designer',
        connectedWallet: 'PayPal',
        accountBlocked: true,
        image: 'https://randomuser.me/api/portraits/men/10.jpg',
        createdAt: '2025-04-20'
    },
    {
        _id: '11',
        firstName: 'Mia',
        lastName: 'Clark',
        email: 'mia.clark@example.com',
        phone: '+1-333-444-5555',
        dob: '1996-01-02',
        designation: 'Support Engineer',
        connectedWallet: 'Payoneer',
        accountBlocked: false,
        image: 'https://randomuser.me/api/portraits/women/11.jpg',
        createdAt: '2025-04-22'
    },
    {
        _id: '12',
        firstName: 'William',
        lastName: 'Walker',
        email: 'william.walker@example.com',
        phone: '+1-999-000-1111',
        dob: '1989-11-11',
        designation: 'Data Analyst',
        connectedWallet: 'Zelle',
        accountBlocked: true,
        image: 'https://randomuser.me/api/portraits/men/12.jpg',
        createdAt: '2025-04-24'
    },
    {
        _id: '13',
        firstName: 'Isabella',
        lastName: 'Hall',
        email: 'isabella.hall@example.com',
        phone: '+1-101-202-3030',
        dob: '1992-04-18',
        designation: 'Graphic Designer',
        connectedWallet: 'CashApp',
        accountBlocked: false,
        image: 'https://randomuser.me/api/portraits/women/13.jpg',
        createdAt: '2025-04-26'
    },
    {
        _id: '14',
        firstName: 'Benjamin',
        lastName: 'Allen',
        email: 'benjamin.allen@example.com',
        phone: '+1-303-404-5050',
        dob: '1986-02-20',
        designation: 'Cloud Architect',
        connectedWallet: 'PayPal',
        accountBlocked: false,
        image: 'https://randomuser.me/api/portraits/men/14.jpg',
        createdAt: '2025-04-28'
    },
    {
        _id: '15',
        firstName: 'Emily',
        lastName: 'Young',
        email: 'emily.young@example.com',
        phone: '+1-606-707-8080',
        dob: '1997-12-07',
        designation: 'Research Analyst',
        connectedWallet: 'Venmo',
        accountBlocked: false,
        image: 'https://randomuser.me/api/portraits/women/15.jpg',
        createdAt: '2025-04-30'
    },
    {
        _id: '16',
        firstName: 'Henry',
        lastName: 'King',
        email: 'henry.king@example.com',
        phone: '+1-909-808-7070',
        dob: '1983-08-25',
        designation: 'Security Engineer',
        connectedWallet: 'Zelle',
        accountBlocked: true,
        image: 'https://randomuser.me/api/portraits/men/16.jpg',
        createdAt: '2025-05-01'
    },
    {
        _id: '17',
        firstName: 'Charlotte',
        lastName: 'Scott',
        email: 'charlotte.scott@example.com',
        phone: '+1-505-606-7070',
        dob: '1991-11-09',
        designation: 'Social Media Manager',
        connectedWallet: 'Apple Pay',
        accountBlocked: false,
        image: 'https://randomuser.me/api/portraits/women/17.jpg',
        createdAt: '2025-05-02'
    },
    {
        _id: '18',
        firstName: 'Daniel',
        lastName: 'Green',
        email: 'daniel.green@example.com',
        phone: '+1-707-808-9090',
        dob: '1984-05-15',
        designation: 'Business Analyst',
        connectedWallet: 'Payoneer',
        accountBlocked: false,
        image: 'https://randomuser.me/api/portraits/men/18.jpg',
        createdAt: '2025-05-04'
    },
    {
        _id: '19',
        firstName: 'Amelia',
        lastName: 'Baker',
        email: 'amelia.baker@example.com',
        phone: '+1-808-909-1010',
        dob: '1998-02-03',
        designation: 'Sales Executive',
        connectedWallet: 'CashApp',
        accountBlocked: false,
        image: 'https://randomuser.me/api/portraits/women/19.jpg',
        createdAt: '2025-05-06'
    },
    {
        _id: '20',
        firstName: 'Logan',
        lastName: 'Adams',
        email: 'logan.adams@example.com',
        phone: '+1-101-111-1212',
        dob: '1982-07-29',
        designation: 'Technical Lead',
        connectedWallet: 'Venmo',
        accountBlocked: true,
        image: 'https://randomuser.me/api/portraits/men/20.jpg',
        createdAt: '2025-05-08'
    }
];


const AdminUserPage = () => {
    const [data, setData] = useState(staticUsers);
    const [currentView, setCurrentView] = useState("table");

    const handleAccountSuspend = (userId) => {
        toast.success("Account Suspended");
        setData(prev =>
            prev.map(user =>
                user._id === userId ? { ...user, accountBlocked: true } : user
            )
        );
    };

    const handleReactivateAccount = (userId) => {
        toast.success("Account Reactivated");
        setData(prev =>
            prev.map(user =>
                user._id === userId ? { ...user, accountBlocked: false } : user
            )
        );
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4 bg-white p-2 rounded-md">
                <div className="flex items-center space-x-2">
                    <button className="bg-[#F2F2F2] rounded-md px-5 py-2 text-sm">Filter</button>
                    <input type="text" placeholder="Search..." className="rounded-md bg-[#F9F9F9] px-3 w-[15rem] py-2 outline-none border" />
                </div>
                <div className="flex items-center space-x-2">
                    <div className='flex items-center gap-x-3 bg-[#FBFBFB] rounded-full p-2'>
                        <button onClick={() => setCurrentView("table")} className={`${currentView === "table" ? "bg-white border" : "text-[#616161]"} py-1 px-6 rounded-full text-sm`}>Table</button>
                        <button onClick={() => setCurrentView("charts")} className={`${currentView === "charts" ? "bg-white border" : "text-[#616161]"} py-1 px-6 rounded-full text-sm`}>Charts</button>
                    </div>
                    <button className="bg-[#F2F2F2] rounded-md px-5 py-2 text-sm">Sort</button>
                </div>
            </div>

            {currentView === "table" ? (
                <div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border rounded-md">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-start text-sm font-medium">User</th>
                                    <th className="py-2 px-4 border-b text-start text-sm font-medium">Contact Info</th>
                                    <th className="py-2 px-4 border-b text-start text-sm font-medium">DOB</th>
                                    <th className="py-2 px-4 border-b text-start text-sm font-medium">Designation</th>
                                    <th className="py-2 px-4 border-b text-start text-sm font-medium">Wallet</th>
                                    <th className="py-2 px-4 border-b text-start text-sm font-medium">Status</th>
                                    <th className="py-2 px-4 border-b text-start text-sm font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(user => (
                                    <tr key={user._id}>
                                        <td className="py-2 px-4 border-b flex items-center space-x-2">
                                            <img src={user.image} className="w-10 h-10 rounded-full object-cover" />
                                            <div>
                                                <div className="text-sm font-semibold">{`${user.firstName} ${user.lastName}`}</div>
                                                <div className="text-xs text-gray-500">{user.email}</div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b text-sm">{user.phone}</td>
                                        <td className="py-2 px-4 border-b text-sm">{user.dob}</td>
                                        <td className="py-2 px-4 border-b text-sm">{user.designation}</td>
                                        <td className="py-2 px-4 border-b text-sm">{user.connectedWallet}</td>
                                        <td className="py-2 px-4 border-b text-sm">
                                            <span className={`px-2 py-1 rounded-md text-xs ${user.accountBlocked ? 'bg-red-200 text-red-700' : 'bg-[#DCEDFF] text-[#007AFF]'}`}>
                                                {user.accountBlocked ? 'Suspended' : 'Active'}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b text-sm">
                                            {!user.accountBlocked ? (
                                                <button onClick={() => handleAccountSuspend(user._id)} className="bg-red-200 text-red-700 px-2 py-1 rounded text-xs">
                                                    Suspend Account
                                                </button>
                                            ) : (
                                                <button onClick={() => handleReactivateAccount(user._id)} className="bg-[#DCEDFF] text-[#007AFF] px-2 py-1 rounded text-xs">
                                                    Reactivate Account
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-gray-600">Showing 1-{data.length} of {data.length}</p>
                        <div className="flex space-x-2">
                            <button className="border rounded p-2">1</button>
                            <button className="border rounded p-2">2</button>
                            <button className="border rounded p-2">3</button>
                        </div>
                    </div>
                </div>
            ) :

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-md p-4">
                        <h2 className="text-lg font-semibold mb-4">User Gender</h2>
                        <div className='flex justify-center items-center'>
                            <PieChart width={300} height={250}>
                                <Pie data={genderData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${(percent * 100).toFixed(0)}% ${name}`} outerRadius={80} fill="#8884d8" dataKey="value">
                                    {genderData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </div>
                    </div>

                    <div className="bg-white rounded-md p-4">
                        <h2 className="text-lg font-semibold mb-4">Ages</h2>
                        <BarChart width={670} height={250} data={ageData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="age" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="male" fill="#9370DB" />
                            <Bar dataKey="female" fill="#E91E63" />
                        </BarChart>
                    </div>

                    <div className="bg-white rounded-md p-4">
                        <h2 className="text-lg font-semibold mb-4">New Users</h2>
                        <LineChart width={670} height={250} data={newUsersData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="users" stroke="#9370DB" strokeWidth={2} />
                        </LineChart>
                        <div className="flex justify-around mt-4">
                            <div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-[#9370DB] mr-2"></div>
                                    <span>New Users</span>
                                </div>
                                <span className="font-semibold">123,656</span>
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-[#E91E63] mr-2"></div>
                                    <span>Returning User</span>
                                </div>
                                <span className="font-semibold">100,987</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-md p-4">
                        <h2 className="text-lg font-semibold mb-4">Active Users</h2>

                        <div className='flex justify-between items-center mt-4'>
                            <div className='flex justify-center items-center'>
                                <PieChart width={300} height={250}>
                                    <Pie data={activeUsersData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${(percent * 100).toFixed(0)}% ${name}`} outerRadius={80} fill="#8884d8" dataKey="value">
                                        {activeUsersData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </div>
                            <div className="">

                                <div className='flex items-center gap-x-8'>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-[#9370DB] mr-2"></div>
                                        <span className='text-[#616161]'>Male</span>
                                    </div>
                                    <span className="">123,456</span>
                                </div>

                                <div className='flex items-center gap-x-8'>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-[#E91E63] mr-2"></div>
                                        <span className='text-[#616161]'>Female</span>
                                    </div>
                                    <span className="">100,789</span>
                                </div>

                                <div className='flex items-center gap-x-8'>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-[#FFCE56] mr-2"></div>
                                        <span className='text-[#616161]'>Inactive</span>
                                    </div>
                                    <span className="">75,789</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }



        </div>
    );
};

export default AdminUserPage;