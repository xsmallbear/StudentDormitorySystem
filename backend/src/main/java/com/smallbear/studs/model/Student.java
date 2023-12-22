package com.smallbear.studs.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private String id;
    private String name;
    private String sex;
    private String departmentId;
    private String createTime;
    private String updateTime;
}
