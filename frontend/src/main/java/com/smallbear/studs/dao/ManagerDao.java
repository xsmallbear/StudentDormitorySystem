package com.smallbear.studs.dao;

import com.smallbear.studs.model.Manager;
import com.smallbear.studs.util.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
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
                String id = resultSet.getString("manager_id");
                String username = resultSet.getString("manager_username");
                String managerPasswordHash = resultSet.getString("manager_password_hash");
                String managerSalt = resultSet.getString("manager_salt");
                Date createTime = resultSet.getDate("create_time");
                Date updateTime = resultSet.getDate("update_time");
                managersList.add(new Manager(id, username, managerPasswordHash, managerSalt, createTime, updateTime));
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
                String id = resultSet.getString("manager_id");
                String username = resultSet.getString("manager_username");
                String managerPasswordHash = resultSet.getString("manager_password_hash");
                String managerSalt = resultSet.getString("manager_salt");
                Date createTime = resultSet.getDate("create_time");
                Date updateTime = resultSet.getDate("update_time");
                return (new Manager(id, username, managerPasswordHash, managerSalt, createTime, updateTime));
            }
        } catch (SQLException e) {
            e.fillInStackTrace();
        } finally {
            DBUtil.closeResource(resultSet, preparedStatement, connection);
        }
        return null;
    }
}
