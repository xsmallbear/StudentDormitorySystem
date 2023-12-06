package com.smallbear.studs.dao;

import com.smallbear.studs.model.Manager;
import com.smallbear.studs.util.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ManagerDao {
    public List<Manager> getAllManagers() {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "SELECT * FROM manager";
            preparedStatement = connection.prepareStatement(sql);
            resultSet = preparedStatement.executeQuery();
            List<Manager> managersList = new ArrayList<>();
            while (resultSet.next()) {
                int managerId = resultSet.getInt("manager_id");
                String managerUsername = resultSet.getString("manager_username");
                String managerPasswordHash = resultSet.getString("manager_password_hash");
                String managerSalt = resultSet.getString("manager_salt");
                String createTime = resultSet.getString("create_time");
                managersList.add(new Manager(managerId + "", managerUsername, managerPasswordHash, managerSalt, createTime));
            }
            return managersList;
        } catch (SQLException e) {
            e.fillInStackTrace();
        } finally {
            DBUtil.closeResource(resultSet, preparedStatement, connection);
        }
        return null;
    }

    public Manager getManagerByName(String name) {

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "SELECT * FROM manager WHERE manager_username = ?";
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, name);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                int managerId = resultSet.getInt("manager_id");
                String managerUsername = resultSet.getString("manager_username");
                String managerPasswordHash = resultSet.getString("manager_password_hash");
                String managerSalt = resultSet.getString("manager_salt");
                String createTime = resultSet.getString("create_time");
                return new Manager(managerId + "", managerUsername, managerPasswordHash, managerSalt, createTime);
            }
        } catch (SQLException e) {
            e.fillInStackTrace();
        } finally {
            DBUtil.closeResource(resultSet, preparedStatement, connection);
        }
        return null;
    }
}
