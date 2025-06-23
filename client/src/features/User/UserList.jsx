import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../services/userService";

export default function UserList({ setSelected, reloadTrigger }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res.data.responseObject || []);
    });
  }, [reloadTrigger]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá?")) {
      await deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">ID</th>
          <th className="border p-2">Họ tên</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Vai trò</th>
          <th className="border p-2">SĐT</th>
          <th className="border p-2">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td className="border p-2">{user.id}</td>
            <td className="border p-2">{user.full_name}</td>
            <td className="border p-2">{user.email}</td>
            <td className="border p-2">{user.role}</td>
            <td className="border p-2">{user.phone}</td>
            <td className="border p-2 space-x-2">
              <button onClick={() => setSelected(user)} className="bg-yellow-400 px-2 py-1 text-white rounded">Sửa</button>
              <button onClick={() => handleDelete(user.id)} className="bg-red-500 px-2 py-1 text-white rounded">Xoá</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
