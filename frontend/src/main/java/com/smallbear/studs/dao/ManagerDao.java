package com.smallbear.studs.dao;

import com.smallbear.studs.model.Managers;
import com.smallbear.studs.util.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ManagersDao {
    public List<Managers> getAllManagers() {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            connection = DBUtil.getConnection();
            String sql = "SELECT * FROM manager";
            preparedStatement = connection.prepareStatement(sql);
            resultSet = preparedStatement.executeQuery();
            List<Managers> managersList = new ArrayList<>();
            while (resultSet.next()) {
                String managerId = resultSet.getNString("manager_id");
                String managerUsername = resultSet.getNString("manager_username");
                String managerPasswordHash = resultSet.getNString("manager_password_hash");
                String managerSalt = resultSet.getNString("manager_salt");
                String createTime = resultSet.getNString("create_time");
                managersList.add(new Managers(managerId, managerUsername, managerPasswordHash, managerSalt, createTime));
            }
            return managersList;
        } catch (SQLException e) {
            e.fillInStackTrace();
        } finally {
            try {
                if (resultSet != null) {
                    resultSet.close();
                }
                if (preparedStatement != null) {
                    preparedStatement.close();
                }
            } catch (SQLException e) {
                e.fillInStackTrace();
            }
            DBUtil.releaseConnection(connection);
        }
        return null;
    }
}
