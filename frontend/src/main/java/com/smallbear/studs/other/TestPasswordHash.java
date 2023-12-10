package com.smallbear.studs.other;

import com.smallbear.studs.util.PwdSecureUtil;
import com.smallbear.studs.util.ServletUtil;

public class TestPasswordHash {
    public static void main(String[] args) {
        String salt = PwdSecureUtil.generateRandomSalt();
        String password = "123123123";
        String pwdHash = PwdSecureUtil.generateSecurePassword(password, salt);

        System.out.println("salt:" + salt);
        System.out.println("password:" + password);
        System.out.println("pwdHash:" + pwdHash);
    }
}
