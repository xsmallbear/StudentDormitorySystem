package com.smallbear.studs.dao;


import com.smallbear.studs.model.Building;
import com.smallbear.studs.util.DBUtil;
import com.smallbear.studs.util.UUIDUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BuildingDao {
    public List<Building> gets() {
        int defaultLimit = 1000;
        int defaultOffSet = 0;
        return this.gets(defaultLimit, defaultOffSet);
    }

    public List<Building> gets(int limit, int offset) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "SELECT * FROM `Building` ORDER BY name ASC LIMIT ? OFFSET ?";
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, limit);
            preparedStatement.setInt(2, offset);
            resultSet = preparedStatement.executeQuery();
            List<Building> buildingsList = new ArrayList<>();
            while (resultSet.next()) {
                String id = resultSet.getString("id");
                String name = resultSet.getString("name");
                String createTime = resultSet.getString("createTime");
                String updateTime = resultSet.getString("updateTime");
                Building dataBuildings = new Building(id, name, createTime, updateTime);
                buildingsList.add(dataBuildings);
            }
            return buildingsList;
        } catch (SQLException e) {
            e.fillInStackTrace();
        } finally {
            DBUtil.closeResource(resultSet, preparedStatement, connection);
        }
        return null;
    }

    public Integer getCount() {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "SELECT COUNT(1) as `count` FROM `Building`";
            preparedStatement = connection.prepareStatement(sql);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getInt("count");
            }
        } catch (SQLException e) {
            e.fillInStackTrace();
        } finally {
            DBUtil.closeResource(resultSet, preparedStatement, connection);
        }
        return null;
    }

    public Building getByBuildingName(String name) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "SELECT * FROM `Building` WHERE `name` = ?";
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, name);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                String id = resultSet.getString("id");
                String buildingName = resultSet.getString("name");
                String createTime = resultSet.getString("createTime");
                String updateTime = resultSet.getString("updateTime");
                return new Building(id, buildingName, createTime, updateTime);
            }
        } catch (SQLException e) {
            e.fillInStackTrace();
        } finally {
            DBUtil.closeResource(resultSet, preparedStatement, connection);
        }
        return null;
    }

    public Building getBuildingById(String id) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "SELECT * FROM `Building` WHERE `id` = ?";
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, id);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                String buildingId = resultSet.getString("id");
                String name = resultSet.getString("name");
                String createTime = resultSet.getString("createTime");
                String updateTime = resultSet.getString("updateTime");
                return new Building(buildingId, name, createTime, updateTime);
            }
        } catch (SQLException e) {
            e.fillInStackTrace();
        } finally {
            DBUtil.closeResource(resultSet, preparedStatement, connection);
        }
        return null;
    }

    public boolean addBuilding(String newName) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "INSERT INTO `Building` (`id`,`name`) VALUES (?,?)";
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, UUIDUtil.generateUUID());
            preparedStatement.setString(2, newName);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("Inserting building failed, no rows affected.");
            }
        } catch (SQLException e) {
            e.fillInStackTrace();
            return false;
        } finally {
            DBUtil.closeResource(preparedStatement, connection);
        }
        return true;
    }

    public boolean updateBuilding(String id, String newName) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "UPDATE `Building` SET `name` = ? WHERE `id` = ?";
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, newName);
            preparedStatement.setString(2, id);
            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("Updating building failed, no rows affected.");
            }
        } catch (SQLException e) {
            e.fillInStackTrace();
            return false;
        } finally {
            DBUtil.closeResource(preparedStatement, connection);
        }
        return true;
    }
}
