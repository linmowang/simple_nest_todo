import { FC, useEffect, useState } from "react";
import http from "../../http";
import { User } from "../../types/User";

const Admin: FC = () => {
  const [userList, setUserList] = useState<User[]>([]);

  const fetchUserList = async () => {
    const { data } = await http.get("/user");
    setUserList(data);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div>
      <h1>管理员页面</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th style={{ width: "100px" }}>用户名</th>
            <th style={{ width: "200px" }}>邮箱</th>
            <th style={{ width: "100px" }}>是否管理员</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user: User) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td style={{ textAlign: "center" }}>{user.username}</td>
              <td style={{ textAlign: "center" }}>{user.email}</td>
              <td style={{ textAlign: "center" }}>
                {user.is_admin === 1 ? "是" : "否"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
