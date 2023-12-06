package com.smallbear.studs.dao;

public class Managers {

    private String manager_id;
    private String manager_username;
    private String manager_password_hash;
    private String manager_salt;
    private String create_time;

    public Managers() {
    }

    public Managers(String manager_id, String manager_username, String manager_password_hash, String manager_salt, String create_time) {

        this.manager_id = manager_id;
        this.manager_username = manager_username;
        this.manager_password_hash = manager_password_hash;
        this.manager_salt = manager_salt;
        this.create_time = create_time;
    }

    public String getManager_id() {
        return manager_id;
    }

    public void setManager_id(String manager_id) {
        this.manager_id = manager_id;
    }

    public String getManager_username() {
        return manager_username;
    }

    public void setManager_username(String manager_username) {
        this.manager_username = manager_username;
    }

    public String getManager_password_hash() {
        return manager_password_hash;
    }

    public void setManager_password_hash(String manager_password_hash) {
        this.manager_password_hash = manager_password_hash;
    }

    public String getManager_salt() {
        return manager_salt;
    }

    public void setManager_salt(String manager_salt) {
        this.manager_salt = manager_salt;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }
}
