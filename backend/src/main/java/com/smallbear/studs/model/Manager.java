package com.smallbear.studs.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Manager {
    private String id;
    private String username;
    private String passwordHash;
    private String salt;
    private Date createTime;
    private Date updateTime;
}
