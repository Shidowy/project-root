// import React, { useState, useEffect } from 'react';
// // import { userService, User } from '../../services/userService';

// const UserList: React.FC = () => {
//     const [users, setUsers] = useState<User[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [newUser, setNewUser] = useState({ name: '', email: '' });
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         loadUsers();
//     }, []);

//     const loadUsers = async () => {
//         try {
//             const data = await userService.getUsers();
//             setUsers(data);
//             setLoading(false);
//         } catch (err) {
//             setError('Failed to load users');
//             setLoading(false);
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const createdUser = await userService.createUser(newUser);
//             setUsers([...users, createdUser]);
//             setNewUser({ name: '', email: '' });
//         } catch (err) {
//             setError('Failed to create user');
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className="user-management">
//             <h2>Users</h2>
            
//             {/* Add User Form */}
//             <form onSubmit={handleSubmit} className="user-form">
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={newUser.name}
//                     onChange={(e) => setNewUser({...newUser, name: e.target.value})}
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={newUser.email}
//                     onChange={(e) => setNewUser({...newUser, email: e.target.value})}
//                 />
//                 <button type="submit">Add User</button>
//             </form>

//             {/* User List */}
//             <div className="user-list">
//                 {users.map(user => (
//                     <div key={user.id} className="user-item">
//                         <h3>{user.name}</h3>
//                         <p>{user.email}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default UserList;
