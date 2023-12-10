package com.smallbear.studs.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DataResponse {
    private int code;
    private String message;
    private Object data;

    public DataResponse() {
        code = -1;
    }
}
