package com.smallbear.studs.model;

public class Manager {

    private String managerId;
    private String managerUsername;
    private String managerPasswordHash;
    private String managerSalt;
    private String createTime;

    public Manager() {
    }

    public Manager(String manager_id, String manager_username, String manager_password_hash, String manager_salt, String create_time) {

        this.managerId = manager_id;
        this.managerUsername = manager_username;
        this.managerPasswordHash = manager_password_hash;
        this.managerSalt = manager_salt;
        this.createTime = create_time;
    }

    public String getManagerId() {
        return managerId;
    }

    public void setManagerId(String managerId) {
        this.managerId = managerId;
    }

    public String getManagerUsername() {
        return managerUsername;
    }

    public void setManagerUsername(String managerUsername) {
        this.managerUsername = managerUsername;
    }

    public String getManagerPasswordHash() {
        return managerPasswordHash;
    }

    public void setManagerPasswordHash(String managerPasswordHash) {
        this.managerPasswordHash = managerPasswordHash;
    }

    public String getManagerSalt() {
        return managerSalt;
    }

    public void setManagerSalt(String managerSalt) {
        this.managerSalt = managerSalt;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
}
